const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const TARGET_API = "http://188.165.224.198:5419/api/v2/send-otp";

app.post("/send-otp", async (req, res) => {
  console.log(req.body);
  const { jid, text } = req.body;

  try {
    const response = await fetch(TARGET_API, {
      method: "POST",
      body: JSON.stringify({ jid, text })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Gagal kirim OTP:", err.message);
    res.status(500).json({ error: "Gagal menghubungi server OTP", detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy OTP server running on port", PORT);
});
