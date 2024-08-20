const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle POST requests
app.post('*', (req, res) => {
    const jsonData = req.body;

    // Log to console
    console.log('Received JSON:', jsonData);

    // Log to file
    const logFilePath = path.join(__dirname, 'requests.log');
    fs.appendFile(logFilePath, JSON.stringify(jsonData) + '\n', (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        } else {
            console.log('Logged to file:', logFilePath);
        }
    });

    // Respond to the client
    res.status(200).send('JSON received and logged');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
