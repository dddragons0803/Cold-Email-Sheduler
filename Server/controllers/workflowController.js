// controllers/workflowController.js
const Workflow = require('../models/workflow');
const { executeWorkflow } = require('../Services/workflowExecutor');

exports.getUserWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ user: req.user._id });
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({ _id: req.params.id, user: req.user._id });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveWorkflow = async (req, res) => {
  const { name, nodes, edges } = req.body;
  const workflow = new Workflow({ user: req.user._id,name, nodes, edges });

  try {
    const newWorkflow = await workflow.save();
    res.status(201).json(newWorkflow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.runWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    await executeWorkflow(workflow);
    res.status(200).json({ message: 'Workflow executed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json({ message: 'Workflow deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.pauseWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'paused' },
      { new: true }
    );

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Implement logic to stop all jobs associated with this workflow
    const jobs = await agenda.jobs({ 'data.workflowId': workflow._id });
    for (const job of jobs) {
      await agenda.cancel({ _id: job.attrs._id });
      console.log(`Job ${job.attrs.name} paused`);
    }

    res.status(200).json({ message: 'Workflow paused successfully', workflow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resumeWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'running' },
      { new: true }
    );

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Re-schedule all jobs associated with this workflow
    const jobs = await agenda.jobs({ 'data.workflowId': workflow._id });
    for (const job of jobs) {
      // Assuming the job was scheduled for a specific time or interval
      if (job.attrs.nextRunAt) {
        await agenda.schedule(job.attrs.nextRunAt, job.attrs.name, job.attrs.data);
        console.log(`Job ${job.attrs.name} resumed`);
      }
    }

    res.status(200).json({ message: 'Workflow resumed successfully', workflow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

