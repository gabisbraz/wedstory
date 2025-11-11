"use client";

import { useState } from "react";
import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose, onSave }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  const handleSave = () => {
    onSave({ nome, preco: parseFloat(preco), imagem });
    setNome("");
    setPreco("");
    setImagem("");
    onClose();
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Adicionar Presente</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome do Presente</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do presente"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="preco">Preço</label>
          <input
            id="preco"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="imagem">Imagem (URL)</label>
          <input
            id="imagem"
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="URL da imagem"
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
