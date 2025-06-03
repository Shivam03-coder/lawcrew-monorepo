# 🚀 Project Setup Guide

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- MySQL database
- pnpm package manager

## ⚡ Quick Start

```bash
# Install pnpm globally
npm install -g pnpm

# Install project dependencies
pnpm install

# Setup environment files
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env
cp packages/env/env.example packages/env/.env

# Generate Prisma client
cd packages/db
pnpm prisma generate
pnpm prisma db push

# Run development server
cd ../../apps/web
pnpm dev

cd ../../apps/api
pnpm dev