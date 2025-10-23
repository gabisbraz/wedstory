"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const STORAGE_KEY = "wedstory_guests";

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function save(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}
function uid() {
  return (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);
}

export default function ConvidadosNovoPage() {
  const router = useRouter();
  const q = useSearchParams();
  const editIndexStr = q.get("edit");
  const editIndex = editIndexStr !== null ? parseInt(editIndexStr, 10) : null;

  const [familia, setFamilia] = useState("");
  const [adulto, setAdulto] = useState([]);
  const [crianca, setCrianca] = useState([]);
  const [bebe, setBebe] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (editIndex === null || Number.isNaN(editIndex)) {
      setAdulto((v) => (v.length ? v : [""]));
      setCrianca((v) => (v.length ? v : [""]));
      setBebe((v) => (v.length ? v : [""]));
      return;
    }
    const arr = load();
    const g = arr[editIndex];
    if (!g) return;
    setFamilia(g.familia || "");
    setAdulto(g.nomesAdultos?.length ? g.nomesAdultos : [""]);
    setCrianca(g.nomesCriancas?.length ? g.nomesCriancas : [""]);
    setBebe(g.nomesBebes?.length ? g.nomesBebes : [""]);
  }, [editIndex]);

  function addNome(grupo, valor = "") {
    if (grupo === "adulto") setAdulto((v) => [...v, valor]);
    if (grupo === "crianca") setCrianca((v) => [...v, valor]);
    if (grupo === "bebe") setBebe((v) => [...v, valor]);
  }
  function setNome(grupo, i, val) {
    if (grupo === "adulto") setAdulto((v) => v.map((n, idx) => (idx === i ? val : n)));
    if (grupo === "crianca") setCrianca((v) => v.map((n, idx) => (idx === i ? val : n)));
    if (grupo === "bebe") setBebe((v) => v.map((n, idx) => (idx === i ? val : n)));
  }
  function removeNome(grupo, i) {
    if (grupo === "adulto") setAdulto((v) => v.filter((_, idx) => idx !== i));
    if (grupo === "crianca") setCrianca((v) => v.filter((_, idx) => idx !== i));
    if (grupo === "bebe") setBebe((v) => v.filter((_, idx) => idx !== i));
  }

  const canSave = useMemo(() => {
    const tot =
      adulto.filter(Boolean).length +
      crianca.filter(Boolean).length +
      bebe.filter(Boolean).length;
    return familia.trim() && tot > 0;
  }, [familia, adulto, crianca, bebe]);

  function showToast(msg, time = 1800) {
    setToast(msg);
    setTimeout(() => setToast(null), time);
  }

  function handleSalvar() {
    const nomesAdultos = adulto.map((s) => s.trim()).filter(Boolean);
    const nomesCriancas = crianca.map((s) => s.trim()).filter(Boolean);
    const nomesBebes = bebe.map((s) => s.trim()).filter(Boolean);

    if (!familia.trim()) return showToast("Preencha o nome da família.");
    if (nomesAdultos.length + nomesCriancas.length + nomesBebes.length === 0)
      return showToast("Adicione pelo menos 1 convidado.");

    const arr = load();

    const novo = {
      id: editIndex !== null && arr[editIndex]?.id ? arr[editIndex].id : uid(),
      familia: familia.trim(),
      adulto: nomesAdultos.length,
      crianca: nomesCriancas.length,
      bebe: nomesBebes.length,
      nomesAdultos,
      nomesCriancas,
      nomesBebes,
      createdAt: Date.now(),
      presencas: editIndex !== null ? (arr[editIndex]?.presencas ?? {}) : {},
    };

    if (editIndex !== null && arr[editIndex]) {
      arr[editIndex] = novo;
      save(arr);
      showToast("Família editada com sucesso!");
    } else {
      arr.push(novo);
      save(arr);
      showToast("Convidado salvo com sucesso!");
    }
    setTimeout(() => router.push("/wedstory/convidados/lista"), 400);
  }

  function handleCancelar() {
    setFamilia("");
    setAdulto([""]);
    setCrianca([""]);
    setBebe([""]);
    showToast("Formulário resetado");
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} aria-labelledby="titulo-card">
        <h2 id="titulo-card">{editIndex !== null ? "Editar convidado" : "Adicionar convidado"}</h2>

        <label htmlFor="familia" className={styles.label}>Nome da família</label>
        <input
          id="familia"
          type="text"
          placeholder="Ex: Família Silva"
          value={familia}
          onChange={(e) => setFamilia(e.target.value)}
          className={styles.input}
        />

        {/* Adulto */}
        <div className={styles.info}>
          <span>Adulto</span>
          <small>Faixa etária: acima de 8 anos</small>
        </div>
        <div className={styles.nomesContainer}>
          {adulto.map((n, i) => (
            <div key={`a-${i}`} className={styles.inputWrapper}>
              <input
                className={styles.inputNome}
                value={n}
                onChange={(e) => setNome("adulto", i, e.target.value)}
                placeholder="Nome do adulto"
              />
              <button type="button" title="Remover" onClick={() => removeNome("adulto", i)}>×</button>
            </div>
          ))}
        </div>
        <div className={styles.buttonRowContainer}>
          <button type="button" className={styles.buttonRow} onClick={() => addNome("adulto")}>
            Adicionar adulto
          </button>
        </div>

        <div className={styles.linhaSeparadora} />

        {/* Criança */}
        <div className={styles.info}>
          <span>Criança</span>
          <small>Faixa etária: entre 3 e 7 anos</small>
        </div>
        <div className={styles.nomesContainer}>
          {crianca.map((n, i) => (
            <div key={`c-${i}`} className={styles.inputWrapper}>
              <input
                className={styles.inputNome}
                value={n}
                onChange={(e) => setNome("crianca", i, e.target.value)}
                placeholder="Nome da criança"
              />
              <button type="button" title="Remover" onClick={() => removeNome("crianca", i)}>×</button>
            </div>
          ))}
        </div>
        <div className={styles.buttonRowContainer}>
          <button type="button" className={styles.buttonRow} onClick={() => addNome("crianca")}>
            Adicionar criança
          </button>
        </div>

        <div className={styles.linhaSeparadora} />

        {/* Bebê */}
        <div className={styles.info}>
          <span>Bebê</span>
          <small>Faixa etária: entre 0 e 2 anos</small>
        </div>
        <div className={styles.nomesContainer}>
          {bebe.map((n, i) => (
            <div key={`b-${i}`} className={styles.inputWrapper}>
              <input
                className={styles.inputNome}
                value={n}
                onChange={(e) => setNome("bebe", i, e.target.value)}
                placeholder="Nome do bebê"
              />
              <button type="button" title="Remover" onClick={() => removeNome("bebe", i)}>×</button>
            </div>
          ))}
        </div>
        <div className={styles.buttonRowContainer}>
          <button type="button" className={styles.buttonRow} onClick={() => addNome("bebe")}>
            Adicionar bebê
          </button>
        </div>

        <div className={styles.actions}>
          <button className={styles.salvar} onClick={handleSalvar} disabled={!canSave}>Salvar</button>
          <button className={styles.cancelar} onClick={handleCancelar}>Cancelar</button>
        </div>
      </div>

      <div className={styles.buttonsRow}>
        <Link href="/wedstory/convidados/novo" className={styles.newGuest}>Novo convidado</Link>
        <Link href="/wedstory/convidados/lista" className={styles.viewList}>Visualizar lista</Link>
      </div>

      {toast && <div className={styles.toast} role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}
