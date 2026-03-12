const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const rooms = {};

app.get('/api/room/:code', (req, res) => {
  const room = rooms[req.params.code];
  if (!room) return res.status(404).json(null);
  res.json(room);
});

app.post('/api/room/:code', (req, res) => {
  rooms[req.params.code] = req.body;
  res.json({ ok: true });
});

app.post('/api/ai-analysis', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'ANTHROPIC_API_KEY no configurada' });
  }
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error('AI proxy error:', e);
    res.status(500).json({ error: 'Error al contactar la API de IA' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BrandSim running on port ${PORT}`));
