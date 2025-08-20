#!/bin/bash

# Load NVM and switch to Node 20
source ~/.nvm/nvm.sh
nvm use 20

# Display environment info
echo "Starting Medusa Storefront..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""
echo "Medusa Backend: http://localhost:9000"
echo "Storefront will run on: http://localhost:3000 (or next available port)"
echo ""

# Run the development server
npm run dev