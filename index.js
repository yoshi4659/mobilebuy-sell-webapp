const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbwuNFxJkdgrramW00zUgnfe1Qm638_--DFZEAO1jGWOgP_SwMBOVOowuPIz3nH1QJZe/exec';

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const imei = req.query.imei;

  if (!imei) {
    return res.json({ status: "success", message: "Proxy Server พร้อมใช้งานแล้ว!" });
  }

  // ✅ ถ้ามี imei → ส่งต่อไปยัง Google Script
  try {
    const response = await fetch(`${googleAppsScriptURL}?imei=${imei}`);
    const result = await response.text(); // ต้องใช้ .text() เพราะฝั่ง GAS อาจคืน plain text
    res.send(result); // ส่งต่อ JSON หรือ "Not found"
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post('/', async (req, res) => {
  try {
    const response = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.text(); // GAS ฝั่งนั้นคืนเป็น plain text ไม่ใช่ JSON
    res.send(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server is running on port ${PORT}`);
});
