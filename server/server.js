/* Server Setup */

// Load required modules 
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Read environment variables
dotenv.config();

const app = express();
// Define the server port
const PORT = process.env.PORT || 5000;


/* Middleware Configuration */

// Allow cross-origin requests.
app.use(cors()); 
// Parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable file upload handling
app.use(fileUpload());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, "public/uploads")));

// Return server running status
app.get("/", (req, res) => {
  res.send("Server is running...");
});

/* Starting the Server */

app.listen(PORT, () => {
  // The server listens on PORT (default: 5000)
  // Log a message when it starts
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Upload Endpoint
app.post('/uploads', (req, res) => {
  console.log("Upload request received");

  // Check if a file is included in the request
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("No file uploaded");
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  console.log("Uploading file:", file.name);

  // Move file to public/uploads/ directory
  const uploadPath = path.join(__dirname, "public/uploads", file.name);
  file.mv(uploadPath, err => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).send(err);
    }
    console.log("File successfully uploaded:", uploadPath);
    // Send a response with the file name and path
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
