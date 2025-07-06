// index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ตัวอย่าง route สำหรับ proxy ไปยัง Google Apps Script
app.post("/submit", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbydBLHp2AZhCuZX99_mtk3mxnemc2HdvD-YxmpAwITru2Wt66G0P3oVuWx6piayBfBM/exec", {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
