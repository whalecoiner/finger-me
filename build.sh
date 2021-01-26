#!/bin/bash
echo "Building app..."
npm ci

echo "Restarting server process..."
pm2 stop ecosystem.config.js
pm2 delete ecosystem.config.js
pm2 start ecosystem.config.js
pm2 save