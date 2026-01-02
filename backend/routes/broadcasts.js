const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock broadcasts data
let broadcasts = [];

// Get all broadcasts
router.get('/', (req, res) => {
  res.json({ broadcasts, total: broadcasts.length });
});

// Create and send broadcast
router.post('/', async (req, res) => {
  try {
    const { name, message, recipients, scheduleTime } = req.body;
    
    const broadcast = {
      id: Date.now().toString(),
      name,
      message,
      recipients: recipients.length,
      status: scheduleTime ? 'scheduled' : 'sending',
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0,
      createdAt: new Date(),
      scheduleTime: scheduleTime || null
    };
    
    broadcasts.push(broadcast);

    // If not scheduled, send immediately
    if (!scheduleTime) {
      // Send to all recipients
      for (const recipient of recipients) {
        try {
          await axios.post(
            `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
              messaging_product: 'whatsapp',
              to: recipient,
              type: 'text',
              text: { body: message }
            },
            {
              headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          );
          broadcast.sent++;
        } catch (error) {
          broadcast.failed++;
          console.error(`Failed to send to ${recipient}:`, error.message);
        }
      }
      
      broadcast.status = 'completed';
    }
    
    res.json({ success: true, broadcast });
  } catch (error) {
    console.error('Broadcast error:', error);
    res.status(500).json({ error: 'Failed to create broadcast' });
  }
});

// Get broadcast details
router.get('/:id', (req, res) => {
  const broadcast = broadcasts.find(b => b.id === req.params.id);
  if (!broadcast) {
    return res.status(404).json({ error: 'Broadcast not found' });
  }
  res.json(broadcast);
});

module.exports = router;
