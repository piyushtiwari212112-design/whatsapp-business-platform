const express = require('express');
const router = express.Router();

// Mock contacts data
let contacts = [
  { id: '1', name: 'John Doe', phone: '+1234567890', email: 'john@example.com', tags: ['Customer', 'VIP'], createdAt: new Date() },
  { id: '2', name: 'Sarah Smith', phone: '+1234567891', email: 'sarah@example.com', tags: ['Lead'], createdAt: new Date() }
];

// Get all contacts
router.get('/', (req, res) => {
  res.json({ contacts, total: contacts.length });
});

// Get single contact
router.get('/:id', (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.json(contact);
});

// Create contact
router.post('/', (req, res) => {
  const { name, phone, email, tags } = req.body;
  
  const newContact = {
    id: Date.now().toString(),
    name,
    phone,
    email,
    tags: tags || [],
    createdAt: new Date()
  };
  
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Update contact
router.put('/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  
  contacts[index] = { ...contacts[index], ...req.body, updatedAt: new Date() };
  res.json(contacts[index]);
});

// Delete contact
router.delete('/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  
  contacts.splice(index, 1);
  res.json({ message: 'Contact deleted successfully' });
});

module.exports = router;
