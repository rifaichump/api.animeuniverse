const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());
let count = 0;

const TARGET_API = "http://188.165.224.198:5419/api/v2/send-otp";

app.get("/", (req, res) => {
  count++;
  console.log("Berhasil di pulihkan: ", count);
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

  try {
    const response = await fetch(TARGET_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_req),
    });

    const data = await response.json();
    if (data.status) {
      res.status(response.status).json(data);
    } else {
      res.status(500).json({ error: "Gagal kirim otp" });
    }
  } catch (err) {
    console.error("Gagal kirim OTP:", err.message);
    res
      .status(500)
      .json({ error: "Gagal menghubungi server OTP", detail: err.message });
  }
});

const PORT = process.env.PORT || 37817;

app.listen(PORT, () => {
  console.log("Proxy OTP server running on port", PORT);
});
