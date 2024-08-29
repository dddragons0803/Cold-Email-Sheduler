const express = require('express');
const {inputData,uploadcsv,scheduleEmails} = require('../controllers/inputContoller')
const multer = require('multer')
const router = express.Router();
const path = require('path');
// const { protect } = require('../middleware/authMiddleware');
const { getUserWorkflows } = require('../controllers/workflowController');
const { getWorkflow, saveWorkflow, runWorkflow ,deleteWorkflow,pauseWorkflow,resumeWorkflow} = require('../controllers/workflowController');

// Set up storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save the uploaded file
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name conflicts
    }
  });
  
  // Initialize Multer with the storage configuration
  const upload = multer({ storage: storage });

router.get('/workflows',  getUserWorkflows);
router.get('/workflow/:id', getWorkflow);
router.post('/workflow', saveWorkflow);
router.post('/workflow/:id/run', runWorkflow);
router.delete('/workflow/:id', deleteWorkflow);
router.post('/workflow/:id/pause', pauseWorkflow); // Add pause route
router.post('/workflow/:id/resume', resumeWorkflow); // Add resume rout

module.exports= router;