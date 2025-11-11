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

export default function ListaDePresentes() {
  const [presentes, setPresentes] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = read();
      if (stored.length) return stored;
    }
    return [{
      id: "panela",
      nome: "Jogo de panelas",
      preco: 289.9,
      caminhoImagem: "/imagens/presentes/panela.jpg",
    }];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    write(presentes);
  }, [presentes]);

  const handleSave = ({ nome, preco, caminhoImagem }) => {
    setPresentes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), nome, preco: Number(preco), caminhoImagem: caminhoImagem || "" },
    ]);
    closeModal();
  };

  return (
    <section className={styles.sectionMain}>
      <button type="button" className={styles.addCard} onClick={openModal}>
        <span className={styles.plus}>+</span>
        <span>Adicionar presente</span>
      </button>

      {presentes.map((p) => (
        <Presente key={p.id} presente={p} />
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </section>
  );
}
