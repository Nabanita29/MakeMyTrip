const express = require('express');
const path = require('path'); // To work with file paths
const app = express();
const PORT = 3001;
const routes = require('./routes'); // Import the routes

app.use(express.json()); // Middleware for JSON body parsing
app.use(express.urlencoded({ extended: true })); // Middleware to handle form data

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in routes.js
app.use(routes);

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
