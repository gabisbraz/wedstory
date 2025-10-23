"use client";

import { useState } from "react";
import styles from "./page.module.css";
import AvatarPicker from "./AvatarPicker";

export default function ProfileForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section className={styles.perfilContainer}>
      <section className={styles.fotoPerfilSection}>
        <AvatarPicker />
        <p className={styles.fotoPerfilLabel}>Foto de Perfil</p>
      </section>

      <section className={styles.perfilCard}>
        <form className={styles.formSection} onSubmit={(e)=>e.preventDefault()}>
          <fieldset className={styles.inputGroup}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Nome de usuário"
              value={nome}
              onChange={(e)=>setNome(e.target.value)}
            />
            <span className={styles.inputIcon}>✎</span>
          </fieldset>

          <fieldset className={styles.inputGroup}>
            <input
              type="email"
              className={styles.formInput}
              placeholder="E-mail"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <span className={styles.inputIcon}>✎</span>
          </fieldset>

          <button
            type="button"
            className={styles.btnAlterarSenha}
            onClick={()=>alert("Essa funcionalidade ainda está em desenvolvimento.")}
          >
            Alterar senha
          </button>

          <button
            type="button"
            className={styles.btnSalvar}
            onClick={()=>alert("Salvo por enquanto!")}
          >
            Salvar
          </button>
        </form>
      </section>
    </section>
  );
}
