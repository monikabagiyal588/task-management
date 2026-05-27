const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [ "active", "complted"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports =mongoose.models.Task || mongoose.model("Task", taskSchema);
