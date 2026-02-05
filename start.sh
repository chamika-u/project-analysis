#!/bin/bash
# Startup script for Medical Submission System

echo "Medical Submission System - Starting..."

# Create database directory if it doesn't exist
mkdir -p database

# Navigate to backend directory
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting server on port 3000..."
node server.js
