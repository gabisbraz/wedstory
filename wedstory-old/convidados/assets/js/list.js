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

  // totais
  let totalAdultos = 0, totalCriancas = 0, totalBebes = 0;

  const rows = guests.map((g, i) => {
    totalAdultos += Number(g.adulto || 0);
    totalCriancas += Number(g.crianca || 0);
    totalBebes += Number(g.bebe || 0);

    const title = g.familia ? `Família ${g.familia}` : (g.nome || '—');

    // monta lista de convidados individuais
    const convidados = [];
    (g.nomesAdultos || []).forEach(nome => {
      if (nome) convidados.push({ nome, tipo: "Adulto", presenca: g.presencas?.[nome] || "Não confirmado" });
    });
    (g.nomesCriancas || []).forEach(nome => {
      if (nome) convidados.push({ nome, tipo: "Criança", presenca: g.presencas?.[nome] || "Não confirmado" });
    });
    (g.nomesBebes || []).forEach(nome => {
      if (nome) convidados.push({ nome, tipo: "Bebê", presenca: g.presencas?.[nome] || "Não confirmado" });
    });

    const listaDetalhes = convidados.length
      ? `<ul class="detalhes">
          ${convidados.map(c => `
            <li>
              <span><strong>${c.nome}</strong> — ${c.tipo}</span>
              <span class="presenca ${c.presenca === 'Confirmado' ? 'ok' : 'pendente'}">
                ${c.presenca}
              </span>
            </li>`).join('')}
        </ul>`
      : `<em>Nenhum convidado individual informado.</em>`;

    return `
      <div class="guest-card">
        <div class="guest-header" onclick="toggleDetalhes(${i})">
          <span><strong>${title}</strong> 
            • Adultos ${g.adulto} • Crianças ${g.crianca} • Bebês ${g.bebe}
          </span>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div id="detalhes-${i}" class="guest-detalhes" hidden>
          ${listaDetalhes}
          <div class="guest-actions">
            <button class="salvar" onclick="editar(${i})">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="cancelar" onclick="remover(${i})">
              <i class="bi bi-trash"></i> Remover
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div style="margin-bottom:12px; color:#3a003a; font-weight:700;">
      Total famílias: ${guests.length} — Adultos ${totalAdultos} • Crianças ${totalCriancas} • Bebês ${totalBebes}
    </div>
    ${rows}
  `;
}

function toggleDetalhes(index) {
  const el = document.getElementById(`detalhes-${index}`);
  if (el) {
    el.hidden = !el.hidden;
  }
}

function editar(index) {
  window.location.href = `index.html?edit=${index}`;
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

  document.getElementById('btnVoltar')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  document.getElementById('btnLimpar')?.addEventListener('click', () => {
    if (!confirm('Remover todos os convidados?')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderList();
  });
});
