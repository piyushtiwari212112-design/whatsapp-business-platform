const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock messages data
let messages = [];

// Get all messages
router.get('/', (req, res) => {
  res.json({ messages, total: messages.length });
});

// Get messages for a contact
router.get('/contact/:contactId', (req, res) => {
  const contactMessages = messages.filter(m => m.contactId === req.params.contactId);
  res.json({ messages: contactMessages, total: contactMessages.length });
});

// Send message via WhatsApp API
router.post('/send', async (req, res) => {
  try {
    const { to, message, type = 'text' } = req.body;
    
    // WhatsApp Business API call
    const response = await axios.post(
      `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: type,
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Save to database
    const newMessage = {
      id: Date.now().toString(),
      contactId: to,
      message,
      type,
      direction: 'outgoing',
      status: 'sent',
      timestamp: new Date(),
      waMessageId: response.data.messages[0].id
    };
    
    messages.push(newMessage);
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send message', details: error.response?.data });
  }
});

// Mark message as read
router.put('/:id/read', (req, res) => {
  const message = messages.find(m => m.id === req.params.id);
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  message.read = true;
  res.json(message);
});

module.exports = router;
