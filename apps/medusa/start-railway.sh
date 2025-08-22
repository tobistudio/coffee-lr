#!/bin/bash

# Railway startup script for Medusa
echo "🚀 Starting Lavender Hill Springs Medusa Backend..."

# Check if database is initialized
echo "📦 Running database migrations..."
yarn migrate:prod

# Seed the database if it's empty (first deployment)
echo "🌱 Seeding database..."
yarn seed:prod || echo "⚠️ Seeding failed or already done"

# Start the Medusa server
echo "🎯 Starting Medusa server..."
yarn start
