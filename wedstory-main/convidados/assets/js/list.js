const STORAGE_KEY = 'wedstory_guests';

function getGuests() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch(e) { return []; }
}
function saveGuests(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

function renderList() {
  const container = document.getElementById('listaContainer');
  if (!container) return;
  const guests = getGuests();

  if (guests.length === 0) {
    container.innerHTML = `<p>Nenhum convidado cadastrado ainda.</p>`;
    return;
  }

  // mostrar totais e lista
  let totalAdultos = 0, totalCriancas = 0, totalBebes = 0;
  const rows = guests.map((g, i) => {
    totalAdultos += Number(g.adulto || 0);
    totalCriancas += Number(g.crianca || 0);
    totalBebes += Number(g.bebe || 0);

    const title = g.familia ? `Família ${g.familia}` : (g.nome || '—');
    const nomeLine = (g.familia && g.nome) ? `<div>Nome: <strong>${g.nome}</strong></div>` : '';
    return `
      <div class="guest-row" data-index="${i}">
        <div class="guest-info">
          <div><strong>${title}</strong></div>
          ${nomeLine}
          <div>Adultos: ${g.adulto} • Crianças: ${g.crianca} • Bebês: ${g.bebe}</div>
        </div>
        <div class="guest-actions">
          <button class="cancelar" onclick="remover(${i})" title="Remover convidado"><i class="bi bi-trash"></i> Remover</button>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div style="margin-bottom:12px; color:#3a003a; font-weight:700;">
      Total convidados: ${guests.length} — Adultos ${totalAdultos} • Crianças ${totalCriancas} • Bebês ${totalBebes}
    </div>
    ${rows}
  `;
}

function remover(index) {
  const guests = getGuests();
  if (!guests[index]) return;
  const ok = confirm(`Remover "${guests[index].familia ? 'Família ' + guests[index].familia : guests[index].nome}"?`);
  if (!ok) return;
  guests.splice(index, 1);
  saveGuests(guests);
  renderList();
}

document.addEventListener('DOMContentLoaded', () => {
  renderList();

  const btnVoltar = document.getElementById('btnVoltar');
  const btnLimpar = document.getElementById('btnLimpar');

  btnVoltar && btnVoltar.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  btnLimpar && btnLimpar.addEventListener('click', () => {
    if (!confirm('Remover todos os convidados?')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderList();
  });
});
