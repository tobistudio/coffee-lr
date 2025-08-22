# 🚀 Railway Deployment Guide for Lavender Hill Springs Backend

## ✅ What I've Fixed:

1. **✅ Railway Configuration** - Updated `railway.json` with proper startup script
2. **✅ Health Endpoint** - Created `/store/health` endpoint for Railway health checks  
3. **✅ SSL Database** - Fixed PostgreSQL SSL configuration for Railway
4. **✅ Startup Script** - Created automated migration and seeding script
5. **✅ Environment Template** - Provided all required environment variables

---

## 🔧 DEPLOY TO RAILWAY (5 minutes):

### **Step 1: Go to Railway Dashboard**
Visit: [https://railway.app/project/f51d6c33-9dba-440a-a297-af29c2b206e1](https://railway.app/project/f51d6c33-9dba-440a-a297-af29c2b206e1)

### **Step 2: Add Required Services**
In your Railway project, make sure you have:
- **✅ PostgreSQL Database** (add if missing)
- **✅ Redis Service** (add if missing)  
- **✅ Medusa Backend Service** (should exist)

### **Step 3: Set Environment Variables**
In your **Medusa Backend Service** → **Variables**, add these:

```bash
# Database (Railway will auto-fill these)
DATABASE_URL=${{Postgres.DATABASE_URL}}
POSTGRES_URL=${{Postgres.DATABASE_URL}}

# Redis (Railway will auto-fill this) 
REDIS_URL=${{Redis.REDIS_URL}}

# Security (use these exact values)
JWT_SECRET=lavender-hill-springs-jwt-secret-2025
COOKIE_SECRET=lavender-hill-springs-cookie-secret-2025

# CORS (copy exactly)
STORE_CORS=https://lavenderhillsprings.com,https://lr-coffee-0715-2o91yf563-app-vantix.vercel.app,http://localhost:3000
ADMIN_CORS=https://lavenderhillsprings.com,https://lr-coffee-0715-2o91yf563-app-vantix.vercel.app,http://localhost:7000,http://localhost:7001
AUTH_CORS=https://lavenderhillsprings.com,https://lr-coffee-0715-2o91yf563-app-vantix.vercel.app,http://localhost:7000,http://localhost:7001

# Backend URL (use your Railway domain)
ADMIN_BACKEND_URL=https://web-lr-coffee-0715-f51d6c33-9dba-440a-a297-af29c2b206e1.up.railway.app

# Stripe (add your production key)
STRIPE_API_KEY=sk_test_your_stripe_secret_key_here

# Shopify
SHOPIFY_DOMAIN=f4d952-1b.myshopify.com
SHOPIFY_PASSWORD=shpat_YOUR_SHOPIFY_PASSWORD_HERE

# Environment
NODE_ENV=production
```

### **Step 4: Deploy**
1. **Connect GitHub**: Link your GitHub repo to Railway service
2. **Set Root Directory**: `/apps/medusa`
3. **Deploy**: Railway will automatically deploy from your `main` branch

### **Step 5: Verify Deployment**
Once deployed, test these URLs:
- **Health Check**: `https://web-lr-coffee-0715-f51d6c33-9dba-440a-a297-af29c2b206e1.up.railway.app/store/health`
- **Admin Panel**: `https://web-lr-coffee-0715-f51d6c33-9dba-440a-a297-af29c2b206e1.up.railway.app/app`

---

## 🎯 After Deployment:

### **Test the Full Stack:**
1. **Backend Health**: Should return `{"status": "healthy"}`
2. **Frontend Connection**: Your Vercel site should connect to Railway backend
3. **Admin Access**: Medusa admin panel should be accessible

### **Admin Login:**
- **Email**: `admin@medusa-test.com`
- **Password**: `supersecret`

---

## 🚨 Troubleshooting:

If deployment fails:
1. **Check Logs**: Railway dashboard → Your service → Logs
2. **Database Connection**: Ensure PostgreSQL service is running
3. **Environment Variables**: Double-check all variables are set
4. **Port Issues**: Railway auto-assigns ports (no need to configure)

---

## ✅ Success Indicators:

- ✅ Railway service shows "Active" status
- ✅ Health endpoint returns 200 status
- ✅ No errors in Railway logs
- ✅ Admin panel loads successfully
- ✅ Frontend can connect to backend APIs

**Once deployed, your full e-commerce platform will be live and ready!** 🛍️
