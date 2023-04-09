require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const mailer = require("nodemailer");
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use(express.json());

// Mongo URI

mongoose
  .connect(`${process.env.DB_URL}`)
  .then((m) => {
    console.log("Connected! --> Mongo DB");
  })
  .catch((e) => {
    console.log("Mongo Connection Error");
  });

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  hospital: String,
  date_of_appointment: String,
});

const BloodDonorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  age: String,
  dob: String,
  blood_group: String,
  aadhaar: String,
});

const Appointment = new mongoose.model("appointment", AppointmentSchema);
const BloodDonor = new mongoose.model("blooddonor", BloodDonorSchema);
const BloodReceiver = new mongoose.model("bloodreceiver", BloodDonorSchema);

// post routes

app.post("/appointment", (req, res) => {
  Appointment.updateOne(
    {
      email: req.body.email,
    },
    {
      $set: {
        name: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        hospital: req.body.hospital,
        date_of_appointment: req.body.date_of_appointment,
      },
    },

    {
      upsert: true,
    }
  )
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
      });
    });
});

app.post("/blooddonor", (req, res) => {
  BloodDonor.updateOne(
    {
      email: req.body.email,
    },
    {
      $set: {
        name: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        age: req.body.age,
        dob: req.body.dob,
        blood_group: req.body.blood_group,
        aadhaar: req.body.aadhaar,
      },
    },

    {
      upsert: true,
    }
  )
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
      });
    });
});

app.post("/bloodreceiver", (req, res) => {
  BloodReceiver.updateOne(
    {
      email: req.body.email,
    },
    {
      $set: {
        name: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        age: req.body.age,
        dob: req.body.dob,
        blood_group: req.body.blood_group,
        aadhaar: req.body.aadhaar,
      },
    },

    {
      upsert: true,
    }
  )
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
      });
    });
});

// get routes

app.get("/", (req, res) => {
  res.send({ success: true });
});

app.get("/appointment", (req, res) => {
  Appointment.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ success: false });
    });
});

app.get("/blooddonor", (req, res) => {
  BloodDonor.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ success: false });
    });
});

app.get("/bloodreceiver", (req, res) => {
  BloodReceiver.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ success: false });
    });
});

app.listen(PORT, () => {
  console.log("Server Active on PORT 3000");
});
