const STORAGE_KEY = 'wedstory_guests';
const toastEl = document.getElementById('toast');

function showToast(msg, time = 1800) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.hidden = false;
  toastEl.style.opacity = '1';
  setTimeout(() => {
    toastEl.style.opacity = '0';
    setTimeout(() => toastEl.hidden = true, 300);
  }, time);
}

function getGuests() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveGuests(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// adiciona um input de convidado
function adicionarConvidado(tipo, valor = '') {
  const container = document.getElementById(`${tipo}-list`);
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Nome do ${tipo}`;
  input.value = valor;
  input.classList.add('input-nome');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerHTML = '<i class="bi bi-trash"></i>';
  btn.title = 'Remover';
  btn.onclick = () => div.remove();

  div.appendChild(input);
  div.appendChild(btn);
  container.appendChild(div);
}

// coleta nomes
function coletarNomes(tipo) {
  return [...document.querySelectorAll(`#${tipo}-list input`)]
    .map(i => i.value.trim())
    .filter(Boolean);
}

// preencher inputs ao editar
function preencherConvidados(tipo, nomes = []) {
  const container = document.getElementById(`${tipo}-list`);
  container.innerHTML = '';
  if (nomes.length === 0) adicionarConvidado(tipo); // pelo menos 1
  else nomes.forEach(n => adicionarConvidado(tipo, n));
}

// salvar ou editar
document.addEventListener('DOMContentLoaded', () => {
  const btnSalvar = document.getElementById('btnSalvar');
  const btnCancelar = document.getElementById('btnCancelar');
  const btnVerLista = document.getElementById('btnVerLista');
  const btnNovo = document.getElementById('btnNovo');

  const params = new URLSearchParams(window.location.search);
  const editIndex = params.get('edit');
  let editing = editIndex !== null ? parseInt(editIndex, 10) : null;

  if (editing !== null) {
    const arr = getGuests();
    const convidado = arr[editing];
    if (convidado) {
      document.getElementById('familia').value = convidado.familia || '';
      preencherConvidados('adulto', convidado.nomesAdultos || []);
      preencherConvidados('crianca', convidado.nomesCriancas || []);
      preencherConvidados('bebe', convidado.nomesBebes || []);
    }
  } else {
    // inicializa com 1 input por tipo
    ['adulto','crianca','bebe'].forEach(t => adicionarConvidado(t));
  }

  btnSalvar?.addEventListener('click', () => {
    const familia = document.getElementById('familia').value.trim();

    const nomesAdultos = coletarNomes('adulto');
    const nomesCriancas = coletarNomes('crianca');
    const nomesBebes = coletarNomes('bebe');

    if (!familia) {
      showToast('Preencha o nome da família.');
      return;
    }
    if (nomesAdultos.length + nomesCriancas.length + nomesBebes.length === 0) {
      showToast('Adicione pelo menos 1 convidado.');
      return;
    }

    const novo = {
      id: editing !== null ? getGuests()[editing].id : crypto.randomUUID(),
      familia,
      adulto: nomesAdultos.length,
      crianca: nomesCriancas.length,
      bebe: nomesBebes.length,
      nomesAdultos,
      nomesCriancas,
      nomesBebes,
      createdAt: Date.now()
    };

    const arr = getGuests();
    if (editing !== null && arr[editing]) {
      arr[editing] = novo;
      showToast('Família editada com sucesso!');
    } else {
      arr.push(novo);
      showToast('Convidado salvo com sucesso!');
    }
    saveGuests(arr);
    window.location.href = 'list.html';
  });

  btnCancelar?.addEventListener('click', () => {
    ['familia'].forEach(id => document.getElementById(id).value = '');
    ['adulto','crianca','bebe'].forEach(tipo => document.getElementById(`${tipo}-list`).innerHTML = '');
    ['adulto','crianca','bebe'].forEach(tipo => adicionarConvidado(tipo));
    showToast('Formulário resetado');
  });

  btnVerLista?.addEventListener('click', () => window.location.href='list.html');
});
