// models/Workflow.js
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  data: mongoose.Schema.Types.Mixed,
  position: {
    x: Number,
    y: Number
  }
});

const edgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  type: String
});

const workflowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  nodes: [nodeSchema],
  edges: [edgeSchema],
  status: { type: String, enum: ['paused', 'running', 'completed'], default: 'paused' },
});

module.exports = mongoose.model('Workflow', workflowSchema);
