#!/usr/bin/env python3
"""Fetch JSON data from an HTTP API and save it as a clean CSV or JSON file.

Assumptions made to resolve the vague request
("récupère les données de l'API et les met dans un fichier propre"):
  - "l'API"     -> any JSON API given by --url (default: public demo API
                   JSONPlaceholder /users, no auth needed).
  - "propre"    -> nested objects flattened (address.city), consistent
                   columns, trimmed strings, duplicates removed, stable
                   column order, UTF-8.
  - "fichier"   -> CSV by default, JSON with --format json.
  - auth        -> optional Bearer token read from the API_TOKEN env var
                   (never passed on the command line).

Only the Python standard library is used.

Usage:
    ./fetch_api.py
    ./fetch_api.py --url https://jsonplaceholder.typicode.com/posts -o posts.csv
    ./fetch_api.py --format json -o users.json
"""

import argparse
import csv
import json
import os
import sys
import time
import urllib.error
import urllib.request

DEFAULT_URL = "https://jsonplaceholder.typicode.com/users"


def fetch_json(url, timeout=10, retries=3):
    """GET a URL and return the decoded JSON, retrying on transient errors."""
    headers = {"Accept": "application/json", "User-Agent": "fetch-api-script/1.0"}
    token = os.environ.get("API_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)

    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as err:
            # Client errors (except 429) will not fix themselves: stop now.
            if 400 <= err.code < 500 and err.code != 429:
                raise
            last_error = err
        except (urllib.error.URLError, TimeoutError) as err:
            last_error = err
        if attempt < retries:
            time.sleep(2 ** attempt)
    raise RuntimeError(f"Failed after {retries} attempts: {last_error}")


def extract_records(payload):
    """Return a list of records whether the API sends a list or a wrapper."""
    if isinstance(payload, list):
        return payload
    if isinstance(payload, dict):
        for key in ("data", "results", "items", "records"):
            if isinstance(payload.get(key), list):
                return payload[key]
        return [payload]
    raise ValueError("Unexpected JSON payload: expected an object or a list")


def flatten(record, parent_key="", sep="."):
    """Flatten nested dicts: {"a": {"b": 1}} -> {"a.b": 1}."""
    flat = {}
    for key, value in record.items():
        new_key = f"{parent_key}{sep}{key}" if parent_key else str(key)
        if isinstance(value, dict):
            flat.update(flatten(value, new_key, sep))
        elif isinstance(value, list):
            flat[new_key] = json.dumps(value, ensure_ascii=False)
        elif isinstance(value, str):
            flat[new_key] = value.strip()
        else:
            flat[new_key] = value
    return flat


def clean(records):
    """Flatten, deduplicate and give every row the same columns."""
    rows, seen = [], set()
    for record in records:
        if not isinstance(record, dict):
            record = {"value": record}
        row = flatten(record)
        fingerprint = json.dumps(row, sort_keys=True, default=str)
        if fingerprint in seen:
            continue
        seen.add(fingerprint)
        rows.append(row)

    columns = []
    for row in rows:
        for key in row:
            if key not in columns:
                columns.append(key)
    return [{col: row.get(col, "") for col in columns} for row in rows], columns


def write_output(rows, columns, path, fmt):
    if fmt == "csv":
        with open(path, "w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=columns)
            writer.writeheader()
            writer.writerows(rows)
    else:
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(rows, fh, indent=2, ensure_ascii=False)
            fh.write("\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--url", default=DEFAULT_URL, help="API endpoint (JSON)")
    parser.add_argument("--format", choices=("csv", "json"), default="csv")
    parser.add_argument("-o", "--output", help="output file (default: data.<format>)")
    parser.add_argument("--timeout", type=int, default=10, help="seconds per request")
    args = parser.parse_args()

    output = args.output or f"data.{args.format}"
    try:
        payload = fetch_json(args.url, timeout=args.timeout)
        rows, columns = clean(extract_records(payload))
    except Exception as err:  # noqa: BLE001 - report any failure cleanly
        print(f"Error: {err}", file=sys.stderr)
        return 1

    if not rows:
        print("Warning: the API returned no records; nothing written.", file=sys.stderr)
        return 1

    write_output(rows, columns, output, args.format)
    print(f"{len(rows)} records, {len(columns)} columns -> {output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
