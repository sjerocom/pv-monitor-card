#!/bin/bash
npm run build:dev
while inotifywait -e close_write src/**/*.ts; do
    npm run build:dev
    cp dist/pv-monitor-card-dev.js /path/to/homeassistant/www/pv-monitor-card/
    echo "✓ Updated dev build: $(date)"
done