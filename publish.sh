#!/usr/bin/env bash
set -euo pipefail

# Load .env
if [ -f .env ]; then
  export $(grep -v '^\s*#' .env | grep -v '^\s*$' | xargs)
else
  echo "❌  .env file not found"
  exit 1
fi

# Validate required vars
if [ -z "${HOSTINGER_USER:-}" ] || [ -z "${HOSTINGER_HOST:-}" ] || [ -z "${HOSTINGER_SSH_PORT:-}" ] || [ -z "${HOSTINGER_REMOTE_PATH:-}" ]; then
  echo "❌  HOSTINGER_USER, HOSTINGER_HOST, HOSTINGER_SSH_PORT, and HOSTINGER_REMOTE_PATH must be set in .env"
  exit 1
fi

REMOTE="$HOSTINGER_USER@$HOSTINGER_HOST:/home/$HOSTINGER_USER/$HOSTINGER_REMOTE_PATH"

# Build
echo "🔨  Building..."
npm run build-only

# Deploy
echo "🚀  Deploying to $REMOTE"
rsync -avvz -e "ssh -p $HOSTINGER_SSH_PORT" --delete --progress --stats dist/ "$REMOTE"

echo "✅  Done"
