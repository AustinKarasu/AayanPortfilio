const API_BASE = (location.hostname === 'localhost') ? 'http://localhost:3000/api' : '/api';

document.getElementById('year').innerText = new Date().getFullYear();

async function fetchStatus(){
  try {
    const res = await fetch(`${API_BASE}/status`);
    const j = await res.json();
    document.getElementById('srv-status').innerText = j.online ? 'Online' : 'Offline';
    document.getElementById('srv-players').innerText = `${j.players.online}/${j.players.max}`;
    document.getElementById('srv-version').innerText = j.version || '—';
  } catch(e){
    document.getElementById('srv-status').innerText = 'Unknown';
    document.getElementById('srv-players').innerText = '—';
  }
}

async function fetchAnnouncements(){
  try {
    const res = await fetch(`${API_BASE}/announcements`);
    const a = await res.json();
    if (a && a.length){
      const el = document.getElementById('ann-1');
      el.innerHTML = `<strong>${a[0].title}</strong><div style="font-size:12px;color:#9fbfb0">${a[0].date}</div><p style="margin:8px 0 0">${a[0].excerpt}</p>`;
    }
  } catch(e){}
}

function copyIP(){
  navigator.clipboard.writeText('play.zyronetwork.net').then(()=> {
    alert('IP copied to clipboard: play.zyronetwork.net');
  });
}

document.getElementById('joinBtn').addEventListener('click', copyIP);

// polling every 20s for demo — adjust as needed
fetchStatus(); fetchAnnouncements();
setInterval(fetchStatus, 20000);
setInterval(fetchAnnouncements, 60000);
