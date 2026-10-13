#!/usr/bin/env python3
"""Generate or edit images with the OpenAI Images API.

Examples:
  python3 tools/imagegen.py "a warm cartoon stethoscope, flat cut-paper style"
  python3 tools/imagegen.py "same character, waving" --ref assets/ref/characters.png --size 1536x1024
  python3 tools/imagegen.py "replace the sky with dawn light" --ref shot.png --mask sky_mask.png

API key: $OPENAI_API_KEY, else (macOS) the Keychain item "openai-api-key".
Model: --model, else $IMAGE_MODEL, else gpt-image-1. $OPENAI_BASE_URL overrides the API endpoint.
Each image is written with a .json sidecar recording prompt, params and usage.
Stdlib only (no SDK) so it runs on any python3 without installs.
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
import uuid
from datetime import datetime
from pathlib import Path

KEYCHAIN_SERVICE = "openai-api-key"
DEFAULT_MODEL = os.environ.get("IMAGE_MODEL", "gpt-image-1")
API_BASE = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")


def multipart(fields: dict, files: list[tuple[str, Path]]) -> tuple[bytes, str]:
    boundary = uuid.uuid4().hex
    parts: list[bytes] = []
    for name, value in fields.items():
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode())
    for name, path in files:
        ctype = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        parts.append(
            f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"; filename="{path.name}"\r\n'
            f"Content-Type: {ctype}\r\n\r\n".encode() + path.read_bytes() + b"\r\n"
        )
    parts.append(f"--{boundary}--\r\n".encode())
    return b"".join(parts), f"multipart/form-data; boundary={boundary}"


def call_api(endpoint: str, key: str, body: bytes, ctype: str, timeout: float, retries: int = 2) -> dict:
    req = urllib.request.Request(
        f"{API_BASE}/{endpoint}", data=body, method="POST",
        headers={"Authorization": f"Bearer {key}", "Content-Type": ctype},
    )
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")
            try:
                detail = json.loads(detail)["error"]["message"]
            except (ValueError, KeyError, TypeError):
                pass
            if e.code in (429, 500, 502, 503, 504) and attempt < retries:
                time.sleep(2 ** (attempt + 2))
                continue
            sys.exit(f"API error {e.code} (request-id {e.headers.get('x-request-id')}): {detail}")
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < retries:
                time.sleep(2 ** (attempt + 2))
                continue
            sys.exit(f"Network error: {e}")
    raise AssertionError("unreachable")


def load_api_key() -> str:
    key = os.environ.get("OPENAI_API_KEY")
    if key:
        return key
    try:
        key = subprocess.run(
            ["security", "find-generic-password", "-s", KEYCHAIN_SERVICE, "-w"],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        key = ""
    if not key:
        sys.exit(
            "No API key found. Copy the key to the clipboard, then run:\n"
            f'  security add-generic-password -U -a "$USER" -s {KEYCHAIN_SERVICE} -w "$(pbpaste)" && pbcopy </dev/null\n'
            "(the interactive -w prompt truncates at 128 chars), or export OPENAI_API_KEY."
        )
    return key


def slugify(text: str, limit: int = 40) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:limit].rstrip("-") or "image"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("prompt", help="Text prompt (use @file.txt to read from a file)")
    p.add_argument("--ref", action="append", default=[], type=Path,
                   help="Reference/input image (repeatable). Switches to the edits endpoint.")
    p.add_argument("--mask", type=Path, help="PNG mask with alpha; transparent areas are regenerated (needs --ref)")
    p.add_argument("--model", default=DEFAULT_MODEL, help=f"Image model (default: $IMAGE_MODEL or {DEFAULT_MODEL})")
    p.add_argument("--size", default="auto", help="auto | 1024x1024 | 1536x1024 | 1024x1536 | WxH (multiples of 16)")
    p.add_argument("--quality", default="auto", help="auto | low | medium | high")
    p.add_argument("--background", default="auto", choices=["auto", "opaque", "transparent"])
    p.add_argument("--format", default="png", choices=["png", "jpeg", "webp"], dest="output_format")
    p.add_argument("--compression", type=int, help="0-100, jpeg/webp only")
    p.add_argument("-n", type=int, default=1, help="Number of images")
    p.add_argument("-o", "--out", type=Path, help="Output file (n=1) or directory. Default: ./generated/")
    p.add_argument("--timeout", type=float, default=300.0, help="Request timeout seconds")
    p.add_argument("--dry-run", action="store_true", help="Print the request without calling the API")
    return p.parse_args()


def output_paths(args: argparse.Namespace, prompt: str) -> list[Path]:
    ext = "jpg" if args.output_format == "jpeg" else args.output_format
    if args.out and args.out.suffix and args.n == 1:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        return [args.out]
    out_dir = args.out or Path("generated")
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = f"{datetime.now():%Y%m%d-%H%M%S}-{slugify(prompt)}"
    if args.n == 1:
        return [out_dir / f"{stem}.{ext}"]
    return [out_dir / f"{stem}-{i + 1}.{ext}" for i in range(args.n)]


def main() -> None:
    args = parse_args()
    prompt = Path(args.prompt[1:]).read_text().strip() if args.prompt.startswith("@") else args.prompt
    if args.mask and not args.ref:
        sys.exit("--mask requires at least one --ref image")
    for f in [*args.ref, *([args.mask] if args.mask else [])]:
        if not f.is_file() or f.stat().st_size == 0:
            sys.exit(f"Input image missing or empty: {f}")

    editing = bool(args.ref)
    model = args.model
    params: dict = {
        "model": model,
        "prompt": prompt,
        "n": args.n,
        "size": args.size,
        "quality": args.quality,
        "background": args.background,
        "output_format": args.output_format,
    }
    if args.compression is not None:
        params["output_compression"] = args.compression

    record = {
        "endpoint": "images.edit" if editing else "images.generate",
        **params,
        "refs": [str(r.resolve()) for r in args.ref],
        "mask": str(args.mask.resolve()) if args.mask else None,
    }
    if args.dry_run:
        print(json.dumps(record, indent=2))
        return

    key = load_api_key()
    started = time.time()
    if editing:
        img_field = "image[]" if len(args.ref) > 1 else "image"
        files = [(img_field, r) for r in args.ref] + ([("mask", args.mask)] if args.mask else [])
        body, ctype = multipart(params, files)
        result = call_api("images/edits", key, body, ctype, args.timeout)
    else:
        result = call_api("images/generations", key, json.dumps(params).encode(), "application/json", args.timeout)
    elapsed = round(time.time() - started, 1)

    usage = result.get("usage")
    paths = output_paths(args, prompt)
    for path, item in zip(paths, result.get("data", [])):
        path.write_bytes(base64.b64decode(item["b64_json"]))
        meta = {
            **record,
            "created": datetime.now().isoformat(timespec="seconds"),
            "elapsed_s": elapsed,
            "revised_prompt": item.get("revised_prompt"),
            "usage": usage,
        }
        path.with_suffix(".json").write_text(json.dumps(meta, indent=2))
        print(path.resolve())
    print(f"[{model}, {elapsed}s, usage={usage}]", file=sys.stderr)


if __name__ == "__main__":
    main()
