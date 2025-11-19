const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const API = "http://160.191.77.60:5976";

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/:action", async (req, res) => {
  const { action } = req.params;

  const body = JSON.stringify(req.body.data ? req.body.data : req.body);
  console.log("Mengirim: " + body);
  try {
    const response = await fetch(API + "/" + action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });

    if(response.ok) {
      const data = await response.json();
      console.log("Diterima: " + data);
      return res.status(response.status).json(data);
    } else {
      return res.status(response.status).json({ error: response.statusText });
    }
  } catch (e) {
    console.log("Error di server Utama");
    return res.status(502).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log("Proxy OTP server running on port", PORT);
});
