# 📋 Setup Instructions

## Prerequisites
- Node.js 16+ installed
- MongoDB (local or Atlas)
- WhatsApp Business API account
- Git installed

## Step-by-Step Setup

### 1️⃣ Get WhatsApp Business API Access

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create a new app → Select "Business" → "WhatsApp"
3. Navigate to WhatsApp → Getting Started
4. Note down:
   - **Phone Number ID**
   - **Access Token** (temporary for testing)
   - Create your own **Verify Token** (any random string)

### 2️⃣ Clone & Install

```bash
# Clone repository
git clone https://github.com/piyushtiwari212112-design/whatsapp-business-platform.git
cd whatsapp-business-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3️⃣ Configure Backend

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB (use local or Atlas)
MONGODB_URI=mongodb://localhost:27017/whatsapp-business

# WhatsApp Business API
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token

# JWT Secret (generate random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Webhook URL (update after deployment)
WEBHOOK_URL=http://localhost:5000/api/webhooks/whatsapp
```

### 4️⃣ Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000`

### 5️⃣ Configure Webhook (After Deployment)

1. Deploy backend to Railway/Heroku/Vercel
2. Get your public URL (e.g., `https://your-app.railway.app`)
3. In Meta Developer Console:
   - Go to WhatsApp → Configuration
   - Click "Edit" on Webhook
   - Callback URL: `https://your-app.railway.app/api/webhooks/whatsapp`
   - Verify Token: Your custom token from `.env`
   - Subscribe to: `messages`

### 6️⃣ Test Your Setup

1. **Test Backend API:**
```bash
curl http://localhost:5000/health
```

2. **Test WhatsApp Integration:**
   - Send a message to your test number
   - Check backend logs for incoming webhook

3. **Send Test Message:**
```bash
curl -X POST http://localhost:5000/api/messages/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from your platform!"
  }'
```

## 🎯 Quick Deploy Options

### Option A: Railway (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway up
```

### Option B: Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Option C: Heroku
```bash
# Install Heroku CLI
# Then:
cd backend
heroku create your-app-name
git push heroku main
```

## 🔐 Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Use environment variables (never commit `.env`)
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS in production
- [ ] Rotate WhatsApp access tokens regularly
- [ ] Add rate limiting
- [ ] Implement proper authentication

## 🐛 Common Issues

### Issue: Webhook verification fails
**Solution:** Ensure verify token in Meta console matches `.env` file

### Issue: Messages not sending
**Solution:** 
- Check access token is valid
- Verify phone number ID is correct
- Ensure recipient has opted in

### Issue: MongoDB connection error
**Solution:**
- Check MongoDB is running: `mongod`
- Or use MongoDB Atlas cloud database

### Issue: CORS errors
**Solution:** Update `FRONTEND_URL` in backend `.env`

## 📱 Production Checklist

Before going live:

- [ ] Set up production MongoDB (MongoDB Atlas)
- [ ] Get permanent WhatsApp access token
- [ ] Configure production webhook URL
- [ ] Set up SSL/HTTPS
- [ ] Add error monitoring (Sentry)
- [ ] Set up logging
- [ ] Add backup strategy
- [ ] Configure auto-scaling
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring/alerts

## 🎓 Learning Resources

- [WhatsApp Business API Guide](https://developers.facebook.com/docs/whatsapp/getting-started)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Documentation](https://react.dev)
- [MongoDB University](https://university.mongodb.com)

## 💬 Need Help?

- 📧 Email: piyushtiwari212112@gmail.com
- 🐛 [Report Issues](https://github.com/piyushtiwari212112-design/whatsapp-business-platform/issues)
- 📖 [Read Documentation](https://github.com/piyushtiwari212112-design/whatsapp-business-platform)

---

**Built by Piyush Tiwari** | [GitHub](https://github.com/piyushtiwari212112-design)
