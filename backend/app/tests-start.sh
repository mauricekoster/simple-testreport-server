#! /usr/bin/env bash
set -e

# This will only work inside a container ans if all other systemcomponents are also running (eg.: DB)

python /app/app/tests_pre_start.py

bash ./scripts/test.sh "$@"