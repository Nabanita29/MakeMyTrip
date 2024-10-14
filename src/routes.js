const express = require('express');
const router = express.Router();
const path = require('path');

// Handle form submission
router.post('/plan-trip', (req, res) => {
    const { location, days, budget, interests } = req.body;
    
    // Here you can process the data and maybe send a response
    console.log('Form data:', { location, days, budget, interests });

    // For now, we'll just send back the received data
    res.json({ message: 'Trip planned successfully!', data: { location, days, budget, interests } });
});

// Serve the main HTML file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Update the path as needed
});

module.exports = router;
