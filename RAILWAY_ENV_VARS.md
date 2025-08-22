# Railway Environment Variables Template
# Copy these to your Railway dashboard Environment Variables

# Database (Railway will provide PostgreSQL)
DATABASE_URL=${{Postgres.DATABASE_URL}}
POSTGRES_URL=${{Postgres.DATABASE_URL}}

# Redis (Railway will provide Redis)
REDIS_URL=${{Redis.REDIS_URL}}

# Security - Generate strong secrets
JWT_SECRET=lavender-hill-springs-jwt-secret-2025
COOKIE_SECRET=lavender-hill-springs-cookie-secret-2025

# CORS - Allow your domains
STORE_CORS=https://lavenderhillsprings.com,https://lr-coffee-0715-2o91yf563-app-vantix.vercel.app,http://localhost:3000
ADMIN_CORS=https://lavenderhillsprings.com,https://lr-coffee-0715-2o91yf563-app-vantix.vercel.app,http://localhost:7000,http://localhost:7001
AUTH_CORS=https://lavenderhillsprings.com,https://lr-coffee-0715-2o91yf563-app-vantix.vercel.app,http://localhost:7000,http://localhost:7001

# Backend URL for admin
ADMIN_BACKEND_URL=https://web-lr-coffee-0715-f51d6c33-9dba-440a-a297-af29c2b206e1.up.railway.app

# Stripe (add your production keys)
STRIPE_API_KEY=sk_test_your_stripe_secret_key_here

# Shopify Integration
SHOPIFY_DOMAIN=f4d952-1b.myshopify.com
SHOPIFY_PASSWORD=shpat_YOUR_SHOPIFY_PASSWORD_HERE

# Node Environment
NODE_ENV=production
