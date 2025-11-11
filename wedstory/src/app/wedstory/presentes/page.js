"use client";

import { useEffect, useState } from "react";
import Presente from "./presente/Presente";
import Modal from "./modal/Modal";
import styles from "./page.module.css";

const LS_KEY = "presentes";
const read = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};
const write = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// helpers para id “bonito”
const slugify = (s) =>
  String(s)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const short = () => Math.random().toString(36).slice(2, 6);
const makeIdFromName = (nome, existing = []) => {
  const base = slugify(nome) || "item";
  let candidate = base;
  const taken = new Set(existing);
  while (taken.has(candidate)) {
    candidate = `${base}-${short()}`;
  }
  return candidate;
};

export default function ListaDePresentes() {
  const [presentes, setPresentes] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = read();
      if (stored.length) return stored;
    }
    // Seed de fallback
    return [{
      id: "panela",
      nome: "Jogo de panelas",
      preco: 289.9,
      caminhoImagem: "/assets/champagne.jpeg",
    }];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // GET via API e espelha no localStorage
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/presentes", { cache: "no-store" });
        if (!res.ok) throw new Error("Erro ao buscar presentes");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPresentes(data);
          write(data);
        }
      } catch (e) {
        console.error(e);
        write(presentes);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persiste no LS quando a lista muda
  useEffect(() => {
    write(presentes);
  }, [presentes]);

  // POST via API com id amigável e imagem correta
  const handleSave = async ({ nome, preco, caminhoImagem, imagem }) => {
    try {
      const existingIds = presentes.map(p => p.id);
      const friendlyId = makeIdFromName(nome, existingIds);

      const payload = {
        id: friendlyId, // tenta usar id slug
        nome,
        preco: Number(preco),
        caminhoImagem: (caminhoImagem ?? imagem ?? "").trim(),
      };

      const res = await fetch("/api/presentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erro ao salvar presente");

      const criado = await res.json();
      const item = {
        ...payload,
        ...criado,
        caminhoImagem: (criado.caminhoImagem ?? payload.caminhoImagem) || "",
      };

      setPresentes((prev) => [...prev, item]);
    } catch (e) {
      console.error(e);
      // fallback local
      const fallback = {
        id: makeIdFromName(nome, presentes.map(p => p.id)),
        nome,
        preco: Number(preco),
        caminhoImagem: (caminhoImagem ?? imagem ?? "").trim(),
      };
      setPresentes((prev) => [...prev, fallback]);
    } finally {
      closeModal();
    }
  };

  if (isLoading) {
    return <p className={styles.loading}>Carregando presentes...</p>;
  }

  return (
    <section className={styles.sectionMain}>
      <button type="button" className={styles.addCard} onClick={openModal}>
        <span className={styles.plus}>+</span>
        <span>Adicionar presente</span>
      </button>

      {presentes.length > 0 ? (
        presentes.map((p) => <Presente key={p.id} presente={p} />)
      ) : (
        <p className={styles.empty}>Nenhum presente cadastrado ainda.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </section>
  );
}
