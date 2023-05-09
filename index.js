require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE",
  });
  next();
});

app.use(express.json());

// Mongo URI

mongoose
  .connect(`${process.env.DB_URL}`)
  .then((m) => {
    console.log("🟢 SUCCESS - Database Connected.");
  })
  .catch((e) => {
    console.log("🔴 FAILED - Database Connection Error!");
  });

const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  cardnumber: String,
  month: String,
  year: String,
  cvv: String,
  email: String,
});

const EmailSubscriptionSchema = new mongoose.Schema({
  email: String,
});

const Orders = new mongoose.model("order", OrderSchema);
const Emails = new mongoose.model("email", EmailSubscriptionSchema);

app.post("/api/order", (req, res) => {
  const order = new Orders({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    cardnumber: req.body.cardnumber,
    month: req.body.month,
    year: req.body.year,
    cvv: req.body.cvv,
    email: req.body.email,
  });

  order
    .save()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.post("/api/email", (req, res) => {
  const Semail = new Emails({
    email: req.body.email,
  });
  Semail.save()
    .then((em) => {
      res.send(em);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.get("/", (req, res) => {
  res.send("success");
});

app.get("/api/orders", (req, res) => {
  Orders.find()
    .then((o) => {
      res.send(o);
    })
    .catch((e) => {
      res.send(e);
    });
});
app.get("/api/emails", (req, res) => {
  Emails.find()
    .then((o) => {
      res.send(o);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.get("/api/delete/emails", (req, res) => {
  Emails.deleteMany({})
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.send(e);
    });
});
app.get("/api/delete/orders", (req, res) => {
  Orders.deleteMany({})
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.send(e);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Active on PORT 3000");
});
