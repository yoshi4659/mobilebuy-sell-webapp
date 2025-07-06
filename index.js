const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // ถ้าจะ proxy request ไป Google Apps Script

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Proxy POST ไปยัง Google Apps Script Web App
app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbydBLHp2AZhCuZX99_mtk3mxnemc2HdvD-YxmpAwITru2Wt66G0P3oVuWx6piayBfBM/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Proxy failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  
});
app.get('/', (req, res) => {
  res.send('✅ Proxy Server พร้อมใช้งานแล้ว! ใช้ POST เพื่อส่งข้อมูลไปยัง Google Sheet');
});

