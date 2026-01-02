const express = require('express');
const router = express.Router();

// Mock templates data
let templates = [
  {
    id: '1',
    name: 'welcome_message',
    category: 'MARKETING',
    language: 'en',
    status: 'APPROVED',
    content: 'Hi {{1}}, Welcome to our service! We\'re excited to have you.',
    createdAt: new Date()
  }
];

// Get all templates
router.get('/', (req, res) => {
  res.json({ templates, total: templates.length });
});

// Get single template
router.get('/:id', (req, res) => {
  const template = templates.find(t => t.id === req.params.id);
  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }
  res.json(template);
});

// Create template
router.post('/', (req, res) => {
  const { name, category, language, content } = req.body;
  
  const newTemplate = {
    id: Date.now().toString(),
    name,
    category,
    language,
    content,
    status: 'PENDING',
    createdAt: new Date()
  };
  
  templates.push(newTemplate);
  res.status(201).json(newTemplate);
});

// Update template
router.put('/:id', (req, res) => {
  const index = templates.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  templates[index] = { ...templates[index], ...req.body, updatedAt: new Date() };
  res.json(templates[index]);
});

// Delete template
router.delete('/:id', (req, res) => {
  const index = templates.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  templates.splice(index, 1);
  res.json({ message: 'Template deleted successfully' });
});

module.exports = router;
