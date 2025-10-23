"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const STORAGE_KEY = "wedstory_guests";

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function save(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export default function ConvidadosListaPage() {
  const [lista, setLista] = useState([]);           
  const [aberto, setAberto] = useState({});        

  useEffect(() => { setLista(load()); }, []);

  function toggle(i) {
    setAberto((m) => ({ ...m, [i]: !m[i] }));
  }
  function remover(i) {
    const arr = load();
    if (!arr[i]) return;
    const nome = arr[i].familia ? `Família ${arr[i].familia}` : "Convidado";
    if (!confirm(`Remover "${nome}"?`)) return;
    arr.splice(i, 1);
    save(arr);
    setLista(arr);
  }
  function limparTudo() {
    if (!confirm("Remover todos os convidados?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setLista([]);
    setAberto({});
  }

  const totalAdulto = lista.reduce((a, g) => a + (g.adulto || 0), 0);
  const totalCrianca = lista.reduce((a, g) => a + (g.crianca || 0), 0);
  const totalBebe   = lista.reduce((a, g) => a + (g.bebe || 0), 0);
  const totalPessoas = totalAdulto + totalCrianca + totalBebe;

  return (
    <div className={styles.page}>
      <div className={styles.card} aria-labelledby="titulo-lista">
        <h2 id="titulo-lista">Lista de Convidados</h2>

        <div className={styles.resumo}>
          <span><b>Total famílias:</b> {lista.length}</span>
          <span><b>Total:</b> {totalPessoas}</span>
          <span>Adultos: {totalAdulto}</span>
          <span>Crianças: {totalCrianca}</span>
          <span>Bebês: {totalBebe}</span>
        </div>

        <div className={styles.listaContainer}>
          {lista.length === 0 && <p className={styles.vazia}>Nenhum convidado cadastrado ainda.</p>}

          {lista.map((g, i) => {
            const convidados = [];
            (g.nomesAdultos || []).forEach((nome) => nome && convidados.push({ nome, tipo: "Adulto", presenca: g.presencas?.[nome] || "Não confirmado" }));
            (g.nomesCriancas || []).forEach((nome) => nome && convidados.push({ nome, tipo: "Criança", presenca: g.presencas?.[nome] || "Não confirmado" }));
            (g.nomesBebes || []).forEach((nome) => nome && convidados.push({ nome, tipo: "Bebê", presenca: g.presencas?.[nome] || "Não confirmado" }));

            return (
              <div key={g.id} className={styles.guestCard}>
                <button type="button" className={styles.guestHeader} onClick={() => toggle(i)}>
                  <span>
                    <strong>{g.familia ? `Família ${g.familia}` : "—"}</strong>
                    {" • "}Adultos {g.adulto} • Crianças {g.crianca} • Bebês {g.bebe}
                  </span>
                  <span className={styles.chevron}>{aberto[i] ? "▴" : "▾"}</span>
                </button>

                {aberto[i] && (
                  <div className={styles.guestDetalhes}>
                    {convidados.length ? (
                      <ul className={styles.detalhes}>
                        {convidados.map((c, idx) => (
                          <li key={idx}>
                            <span><strong>{c.nome}</strong> — {c.tipo}</span>
                            <span className={`${styles.presenca} ${c.presenca === "Confirmado" ? styles.ok : styles.pendente}`}>
                              {c.presenca}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <em>Nenhum convidado individual informado.</em>
                    )}

                    <div className={styles.guestActions}>
                      <Link className={styles.salvar} href={`/wedstory/convidados/novo?edit=${i}`}>Editar</Link>
                      <button className={styles.cancelar} onClick={() => remover(i)}>Remover</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.actionsList}>
          <Link href="/wedstory/convidados/novo" className={styles.cancelar}>Voltar</Link>
          <button className={styles.salvar} onClick={limparTudo}>Limpar tudo</button>
        </div>
      </div>
    </div>
  );
}
