const express = require('express');
const router = express.Router();

// Mock chatbot flows
let chatbots = [];

// Get all chatbot flows
router.get('/', (req, res) => {
  res.json({ chatbots, total: chatbots.length });
});

// Get single chatbot
router.get('/:id', (req, res) => {
  const chatbot = chatbots.find(c => c.id === req.params.id);
  if (!chatbot) {
    return res.status(404).json({ error: 'Chatbot not found' });
  }
  res.json(chatbot);
});

// Create chatbot flow
router.post('/', (req, res) => {
  const { name, trigger, nodes } = req.body;
  
  const newChatbot = {
    id: Date.now().toString(),
    name,
    trigger,
    nodes: nodes || [],
    active: false,
    createdAt: new Date()
  };
  
  chatbots.push(newChatbot);
  res.status(201).json(newChatbot);
});

// Update chatbot
router.put('/:id', (req, res) => {
  const index = chatbots.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Chatbot not found' });
  }
  
  chatbots[index] = { ...chatbots[index], ...req.body, updatedAt: new Date() };
  res.json(chatbots[index]);
});

// Toggle chatbot active status
router.patch('/:id/toggle', (req, res) => {
  const chatbot = chatbots.find(c => c.id === req.params.id);
  if (!chatbot) {
    return res.status(404).json({ error: 'Chatbot not found' });
  }
  
  chatbot.active = !chatbot.active;
  res.json(chatbot);
});

// Delete chatbot
router.delete('/:id', (req, res) => {
  const index = chatbots.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Chatbot not found' });
  }
  
  chatbots.splice(index, 1);
  res.json({ message: 'Chatbot deleted successfully' });
});

module.exports = router;
