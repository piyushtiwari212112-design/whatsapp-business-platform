# 🚀 Deployment Guide

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/piyushtiwari212112-design/whatsapp-business-platform.git
cd whatsapp-business-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_VERIFY_TOKEN=your_verify_token
JWT_SECRET=your_secret_key
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 🌐 Deploy to Railway

### Backend Deployment

1. **Create Railway Account**: [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `whatsapp-business-platform`
   - Select `backend` directory

3. **Add Environment Variables**:
   ```
   MONGODB_URI=<your_mongodb_uri>
   WHATSAPP_PHONE_NUMBER_ID=<your_id>
   WHATSAPP_ACCESS_TOKEN=<your_token>
   WHATSAPP_VERIFY_TOKEN=<your_verify_token>
   JWT_SECRET=<random_secret>
   ```

4. **Add MongoDB**:
   - Click "New" → "Database" → "Add MongoDB"
   - Copy connection string to `MONGODB_URI`

5. **Generate Domain**:
   - Go to Settings → Generate Domain
   - Your API will be live at: `https://your-app.railway.app`

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
cd frontend
vercel
```

3. **Add Environment Variable**:
```
REACT_APP_API_URL=https://your-backend.railway.app
```

## 📱 WhatsApp Business API Setup

### 1. Create Meta Developer Account
- Go to [developers.facebook.com](https://developers.facebook.com)
- Create new app → Business → WhatsApp

### 2. Get Credentials
- **Phone Number ID**: WhatsApp → API Setup
- **Access Token**: WhatsApp → API Setup → Temporary token
- **Verify Token**: Create your own (random string)

### 3. Configure Webhook
- Webhook URL: `https://your-backend.railway.app/api/webhooks/whatsapp`
- Verify Token: Your custom token
- Subscribe to: `messages`

### 4. Test
Send a message to your WhatsApp test number!

## 🔧 Configuration

### Update API Endpoint
In `frontend/src/config.js`:
```javascript
export const API_URL = 'https://your-backend.railway.app';
```

### Database Models
Backend uses in-memory storage by default. For production:
1. Create MongoDB models in `backend/models/`
2. Replace mock data with database queries
3. Add proper authentication middleware

## 📊 Features Checklist

- [x] Backend API structure
- [x] WhatsApp API integration
- [x] Webhook handling
- [x] Authentication routes
- [x] Contact management
- [x] Message handling
- [x] Broadcast system
- [x] Template management
- [x] Chatbot flows
- [ ] Frontend React app (in progress)
- [ ] Real-time WebSocket
- [ ] Database models
- [ ] User authentication UI
- [ ] Analytics dashboard

## 🆘 Troubleshooting

### Webhook Not Working
- Check verify token matches
- Ensure HTTPS (Railway provides this)
- Check Railway logs for errors

### Messages Not Sending
- Verify access token is valid
- Check phone number ID is correct
- Ensure recipient opted in

### Database Connection Failed
- Verify MongoDB URI format
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes Railway IPs

## 📚 Resources

- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [React Documentation](https://react.dev)

## 💡 Next Steps

1. **Complete Frontend**: Build React components
2. **Add Database**: Implement MongoDB models
3. **Authentication**: Add JWT middleware
4. **Real-time**: Implement WebSocket
5. **Analytics**: Add dashboard metrics
6. **Testing**: Write unit tests
7. **Documentation**: API documentation

---

Need help? Check the [GitHub Issues](https://github.com/piyushtiwari212112-design/whatsapp-business-platform/issues)
