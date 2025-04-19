use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require("./server/routes/userRoutes");
const authRoutes = require("./server/routes/authRoutes");
const taskRoutes = require("./server/routes/taskRoutes");
const healthCheckRoutes = require("./server/routes/healthCheckRoutes"); // Import health check route

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1", healthCheckRoutes); // Use health check route

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });
