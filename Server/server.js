const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});