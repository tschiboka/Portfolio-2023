#!/bin/sh
# Shared by pre-commit and commit-msg. Sourced, never executed: a function has to live in the
# shell it exits, and exiting is how a failing step stops the commit.

# One step per line: the label opens it, a green confirmation closes it. A failing step exits
# before its confirmation, so a green line always means that step passed.
step() {
    label=$1
    shift
    printf '\033[36m%s\033[0m\n' "$label"
    if ! "$@"; then
        printf '\033[31m%s Failed ✗\033[0m\n' "$label"
        exit 1
    fi
    printf '\033[32m%s Successful ✓\033[0m\n' "$label"
}
