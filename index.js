const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ รองรับ CORS
app.use(express.json()); // ✅ รองรับ JSON body

const googleAppsScriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';

app.get('/', (req, res) => {
  res.json({ status: "success", message: "Proxy Server พร้อมใช้งานแล้ว!" });
});

app.post('/', async (req, res) => {
  try {
    const response = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    res.json(result); // ✅ ส่งผลลัพธ์จาก Google Apps Script กลับ
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server is running on port ${PORT}`);
});
