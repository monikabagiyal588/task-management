const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require ('./routes/taskRoute');
const connectDB= require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors({
  origin:"https://task-management-umber-two.vercel.app/"
}));
app.use(express.json());

app.use('/api/task',taskRoutes);
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

