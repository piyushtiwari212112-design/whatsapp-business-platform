const express = require('express');
const router = express.Router();

// Webhook verification (required by WhatsApp)
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receive incoming WhatsApp messages
router.post('/whatsapp', (req, res) => {
  try {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      body.entry.forEach(entry => {
        entry.changes.forEach(change => {
          if (change.field === 'messages') {
            const message = change.value.messages[0];
            const from = message.from;
            const messageBody = message.text?.body;
            const messageType = message.type;

            console.log(`📩 Received message from ${from}: ${messageBody}`);

            // Process message here
            // - Save to database
            // - Trigger chatbot
            // - Notify agents via WebSocket
            // - Auto-reply if configured

            // Example: Save message
            const incomingMessage = {
              id: message.id,
              from,
              message: messageBody,
              type: messageType,
              timestamp: new Date(message.timestamp * 1000),
              direction: 'incoming'
            };

            // TODO: Save to database and emit via WebSocket
          }
        });
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
