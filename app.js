const SERVER_ADDRESS = 'play.zyronetwork.net';
const SERVER_PORT = 19132;
const API_URL = `https://api.mcstatus.io/v2/status/bedrock/${SERVER_ADDRESS}:${SERVER_PORT}`;

document.getElementById('year').innerText = new Date().getFullYear();

async function fetchStatus(){
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('status error');
    const j = await res.json();
    const online = j.online === true;
    document.getElementById('srv-status').innerText = online ? 'Online' : 'Offline';
    if (j.players && typeof j.players.online !== 'undefined') {
      document.getElementById('srv-players').innerText = `${j.players.online}/${j.players.max || '—'}`;
    } else {
      document.getElementById('srv-players').innerText = '—';
    }
    document.getElementById('srv-version').innerText = j.version && j.version.name_clean ? j.version.name_clean : (j.version || '—');
  } catch(e){
    document.getElementById('srv-status').innerText = 'Unknown';
    document.getElementById('srv-players').innerText = '—';
    document.getElementById('srv-version').innerText = '—';
    console.error('fetchStatus error', e);
  }
}

async function fetchAnnouncements(){
  try {
    const res = await fetch('announcements.json');
    if (!res.ok) throw new Error('announcements load failed');
    const data = await res.json();
    const list = document.getElementById('news-list');
    if (Array.isArray(data) && data.length) {
      document.getElementById('ann-1').innerHTML = `<strong>${data[0].title}</strong><div style="font-size:12px;color:#9fbfb0">${data[0].date}</div><p style="margin:8px 0 0">${data[0].excerpt}</p>`;
      list.innerHTML = data.map(a => `<div class="card" style="margin-bottom:12px;padding:12px"><h4>${a.title}</h4><div style="font-size:12px;color:#9fbfb0">${a.date}</div><p style="margin:8px 0 0">${a.excerpt}</p></div>`).join('');
    } else {
      document.getElementById('ann-1').innerText = 'No announcements yet.';
      list.innerHTML = '<p>No news available.</p>';
    }
  } catch (e) {
    console.error(e);
    document.getElementById('ann-1').innerText = 'Failed to load announcements.';
    document.getElementById('news-list').innerHTML = '<p>Failed to load news.</p>';
  }
}

function copyIP(){
  const ip = `${SERVER_ADDRESS}:${SERVER_PORT}`;
  navigator.clipboard.writeText(ip).then(()=> {
    alert('IP copied to clipboard: ' + ip);
  }).catch(()=> alert('Copy failed, please copy manually: ' + ip));
}

document.getElementById('joinBtn').addEventListener('click', copyIP);
document.getElementById('voteBtn').addEventListener('click', ()=> {
  // Example vote link - replace with your actual vote page
  window.open('https://example.com/vote', '_blank');
});
document.getElementById('buy-vip').addEventListener('click', ()=> window.open('https://example.com/store/vip', '_blank'));
document.getElementById('buy-legend').addEventListener('click', ()=> window.open('https://example.com/store/legend', '_blank'));

fetchStatus(); fetchAnnouncements();
setInterval(fetchStatus, 20000);
setInterval(fetchAnnouncements, 60000);
