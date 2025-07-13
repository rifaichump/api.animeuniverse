const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API = "http://188.165.224.198:5419/api/v2/";

app.get("/", (req, res) => {
  console.log("Berhasil di pulihkan.");
  res.send("Server Running");
});

app.post("/send-otp", async (req, res) => {
  let _req;
  if (req.body.data) {
    _req = req.body.data;
  } else {
    _req = req.body;
  }
  console.log(_req);
  const response = await fetch(API + "send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_req),
  });
  const data = await response.json();
  return res.status(response.status).json(data);
});

app.post("/info-user", async (req, res) => {
  let _req;
  if (req.body.data) {
    _req = req.body.data;
  } else {
    _req = req.body;
  }
  console.log(_req);
  const response = await fetch(API + "info-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_req),
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.post("/send-message", async (req, res) => {
  let _req;
  if (req.body.data) {
    _req = req.body.data;
  } else {
    _req = req.body;
  }
  console.log(_req);
  const response = await fetch(API + "send-message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_req),
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.post("/update-user", async (req, res) => {
  let _req;
  if (req.body.data) {
    _req = req.body.data;
  } else {
    _req = req.body;
  }
  console.log(_req);
  const response = await fetch(API + "send-message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_req),
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Proxy OTP server running on port", PORT);
});
