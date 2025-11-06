"use client";

import { useState, useEffect } from "react";
import Presente from "./components/presente/Presente";
import Modal from "./components/modal/Modal";
import styles from "./page.module.css";

export default function ListaDePresentes() {
  const [presentes, setPresentes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 👈 adiciona estado de carregamento

  // Buscar presentes da API no client
  useEffect(() => {
    async function fetchPresentes() {
      try {
        const res = await fetch("/api/presentes");
        if (!res.ok) throw new Error("Erro ao buscar presentes");
        const data = await res.json();
        setPresentes(data);
      } catch (err) {
        console.error("Erro ao buscar presentes:", err);
      } finally {
        setIsLoading(false); // 👈 só renderiza lista depois que carregar
      }
    }
    fetchPresentes();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Salvar novo presente via API
  const handleSave = async (novoPresente) => {
    try {
      const res = await fetch("/api/presentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPresente),
      });

      if (!res.ok) throw new Error("Erro ao salvar presente");

      const presenteCriado = await res.json();
      setPresentes((prev) => [...prev, presenteCriado]);
    } catch (err) {
      console.error(err);
    } finally {
      closeModal();
    }
  };

  // 💡 Evita o hydration mismatch:
  // o servidor e o cliente renderizam o mesmo conteúdo inicial ("Carregando...")
  if (isLoading) {
    return <p className={styles.loading}>Carregando presentes...</p>;
  }

  return (
    <section className={styles.sectionMain}>
      {/* Botão para abrir o modal */}
      <button type="button" className={styles.addCard} onClick={openModal}>
        <span className={styles.plus}>+</span>
        <span>Adicionar presente</span>
      </button>

      {presentes.length > 0 ? (
        presentes.map((p) => <Presente key={p.id} presente={p} />)
      ) : (
        <p className={styles.empty}>Nenhum presente cadastrado ainda.</p>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </section>
  );
}
