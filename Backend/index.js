const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// App Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

var whitelist = ["http://127.0.0.1:5500/Frontend/appointment.html"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://Sagar:Sagar2806@cluster0.fwa7n.mongodb.net/appointmentsDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB Atlas!");
});

// Mongoose Schema and Model
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  problemDescription: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// API Endpoint to Handle Form Submission
app.post("/api/appointments", cors(corsOptions), async (req, res) => {
  console.log("Request Body:", req.body); // Log the incoming data

  const { name, email, mobile, appointmentDate, problemDescription } = req.body;
  try {
    const appointment = new Appointment({
      name,
      email,
      mobile,
      appointmentDate,
      problemDescription,
    });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ message: "Failed to book the appointment." });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
