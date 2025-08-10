import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

// MOCK: returns server status; swap with real server query or API
app.get('/api/status', async (req, res) => {
  // Example structure similar to many game status APIs
  const mocked = {
    online: true,
    version: "1.21.100",
    players: { online: 243, max: 1000 }
  };
  res.json(mocked);
});

// MOCK: player count endpoint (could pull from a cache)
app.get('/api/players', (req, res) => {
  res.json({ online: 243, max: 1000, sample: ["Player1","Player2","Player3"] });
});

// MOCK: announcements list
app.get('/api/announcements', (req, res) => {
  res.json([
    { id:1, title:"Summer Update Live!", date:"2025-07-28", excerpt:"New bedwars maps, bugfixes and a brand new shop season." },
    { id:2, title:"Double XP Weekend", date:"2025-08-02", excerpt:"Play this weekend and earn double XP in all modes!" }
  ]);
});

// Serve static frontend when in production — point to frontend built files
app.use('/', express.static('../frontend', {extensions:['html']}));

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Zyro API running on port ${port}`));
