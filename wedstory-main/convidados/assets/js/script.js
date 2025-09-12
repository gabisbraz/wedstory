// chave no localStorage
const STORAGE_KEY = 'wedstory_guests';

// pegar elemento toast
const toastEl = document.getElementById('toast');

function showToast(message, time = 1800) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  toastEl.style.opacity = '1';
  setTimeout(() => {
    toastEl.style.opacity = '0';
    setTimeout(() => { toastEl.hidden = true; }, 300);
  }, time);
}

function getGuests() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}
function saveGuests(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// altera contadores
function alterarQtd(id, valor) {
  const el = document.getElementById(id);
  if (!el) return;
  let atual = parseInt(el.innerText || '0', 10);
  let novo = atual + valor;
  if (novo < 0) novo = 0;
  el.innerText = novo;
}

// salvar convidado
document.addEventListener('DOMContentLoaded', () => {
  const btnSalvar = document.getElementById('btnSalvar');
  const btnCancelar = document.getElementById('btnCancelar');
  const btnVerLista = document.getElementById('btnVerLista');
  const btnNovo = document.getElementById('btnNovo');

  btnSalvar && btnSalvar.addEventListener('click', () => {
    const familia = document.getElementById('familia').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const adulto = parseInt(document.getElementById('adulto').innerText || '0', 10);
    const crianca = parseInt(document.getElementById('crianca').innerText || '0', 10);
    const bebe = parseInt(document.getElementById('bebe').innerText || '0', 10);

    if (!nome && !familia) {
      showToast('Preencha pelo menos Nome ou Família.');
      return;
    }

    const novo = { familia, nome, adulto, crianca, bebe, createdAt: Date.now() };
    const arr = getGuests();
    arr.push(novo);
    saveGuests(arr);

    showToast('Convidado salvo com sucesso!');

    // reset
    document.getElementById('familia').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('adulto').innerText = '0';
    document.getElementById('crianca').innerText = '0';
    document.getElementById('bebe').innerText = '0';
  });

  btnCancelar && btnCancelar.addEventListener('click', () => {
    // limpa campos
    document.getElementById('familia').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('adulto').innerText = '0';
    document.getElementById('crianca').innerText = '0';
    document.getElementById('bebe').innerText = '0';
    showToast('Formulário resetado');
  });

  btnVerLista && btnVerLista.addEventListener('click', () => {
    // leva para a página de listagem
    window.location.href = 'list.html';
  });

  btnNovo && btnNovo.addEventListener('click', () => {
    // foco no primeiro campo
    document.getElementById('nome').focus();
  });
});
