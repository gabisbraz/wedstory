"use client";

import { useState } from "react";
import Presente from "./components/presente/Presente";
import Modal from "./components/modal/Modal";
import styles from "./page.module.css";

export default function ListaDePresentes() {
  const [presentes, setPresentes] = useState([
    {
      id: "panela",
      nome: "Jogo de panelas",
      preco: 289.9,
      caminhoImagem: "/imagens/presentes/panela.jpg",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (novoPresente) => {
    setPresentes((prevPresentes) => [
      ...prevPresentes,
      { ...novoPresente, id: crypto.randomUUID() },
    ]);
  };

  return (
    <section className={styles.sectionMain}>
      {/* Card inicial para adicionar (placeholder simples) */}
      <button
        type="button"
        className={styles.addCard}
        onClick={openModal}
      >
        <span className={styles.plus}>+</span>
        <span>Adicionar presente</span>
      </button>

      {presentes.map((p) => (
        <Presente key={p.id} presente={p} />
      ))}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </section>
  );
}
