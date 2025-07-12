// server.js – FINAL VERSION using fake AI logic

require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log('[✅] Server starting in FAKE AI MODE...');

// ========== In-memory Task Storage ==========
let tasks = [];

// ========== Task CRUD Routes ==========

// Create Task
app.post('/tasks', (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title || 'Untitled Task',
    dueDate: req.body.dueDate || null,
    status: req.body.status || 'Not Started',
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  console.log('[TASK CREATED]', task);
  res.status(201).json(task);
});

// List Tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update Task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(t => (t.id === id ? { ...t, ...req.body } : t));
  console.log('[TASK UPDATED] ID:', id);
  res.json({ message: 'Task updated' });
});

// Delete Task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  console.log('[TASK DELETED] ID:', id);
  res.json({ message: 'Task deleted' });
});

// ========== Fake AI Agent Route ==========

app.post('/ai-agent', (req, res) => {
  const userMessage = req.body.message || '';
  console.log('[FAKE AI] User said:', userMessage);

  const msg = userMessage.toLowerCase();

  let response = {
    action: 'createTask',
    data: {
      title: 'Untitled Task',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      status: 'Not Started',
      id: null
    }
  };

  // Very basic natural language matching
  if (msg.includes('delete')) {
    response.action = 'deleteTask';
    response.data = { id: 1 }; // placeholder, frontend sets real ID
  } else if (msg.includes('complete') || msg.includes('done')) {
    response.action = 'updateTask';
    response.data = { id: 1, status: 'Completed' }; // placeholder
  } else if (msg.includes('list') || msg.includes('show')) {
    response.action = 'listTasks';
    response.data = {};
  } else if (msg.includes('add') || msg.includes('create') || msg.includes('new')) {
    response.action = 'createTask';
    response.data.title = userMessage.replace(/(add|create|new|task|to)/gi, '').trim() || 'Untitled Task';
  }

  console.log('[FAKE AI] Responding with:', response);
  res.json(response);
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[✅] Local AI server running at http://localhost:${PORT}`);
});
