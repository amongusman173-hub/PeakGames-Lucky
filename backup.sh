#!/bin/bash

# Backup script - keeps only the last 3 backups
# Usage: ./backup.sh

BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="backup_${TIMESTAMP}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create new backup folder
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Copy main files to backup
echo "Creating backup: $BACKUP_NAME"
cp game.js "$BACKUP_DIR/$BACKUP_NAME/"
cp index.html "$BACKUP_DIR/$BACKUP_NAME/"
cp style.css "$BACKUP_DIR/$BACKUP_NAME/"

# Copy folders
cp -r sounds "$BACKUP_DIR/$BACKUP_NAME/"
cp -r images "$BACKUP_DIR/$BACKUP_NAME/"

echo "✓ Backup created: $BACKUP_DIR/$BACKUP_NAME"

# Keep only the last 3 backups
cd "$BACKUP_DIR"
BACKUP_COUNT=$(ls -1d backup_* 2>/dev/null | wc -l | tr -d ' ')

if [ "$BACKUP_COUNT" -gt 3 ]; then
    echo "Found $BACKUP_COUNT backups, removing old ones..."
    # List all backups sorted by name (oldest first), keep only last 3
    ls -1td backup_* | tail -n +4 | while read old_backup; do
        echo "  Removing: $old_backup"
        rm -rf "$old_backup"
    done
    echo "✓ Cleaned up old backups"
fi

cd ..
echo "✓ Backup complete! Current backups:"
ls -1t "$BACKUP_DIR" | head -3
