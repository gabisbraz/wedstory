'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import styles from './page.module.css';
import PasswordField from './PasswordField';

export default function CadastroPg2() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <nav>
          <b>Bem-vindo ao <br /> Wedstory</b>
        </nav>
        <Image src="/assets/coracoes.png" alt="Corações" width={220} height={220} priority />
      </header>

      <section className={styles.section}>
        <h1>Crie sua Conta!</h1>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = '/wedstory/pagina_inicial';
          }}
        >
          <input type="email" className={styles.inputField} placeholder="E-mail" required />
          <input type="text" className={styles.inputField} placeholder="Usuário" required />

          <PasswordField id="senha" placeholder="Senha" />
          <PasswordField id="repetirSenha" placeholder="Repetir Senha" />

          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Lembrar
            </label>
            <Link href="#" className={styles.link}>Esqueci Senha</Link>
          </div>

          <button className={styles.enviar} type="submit">
            Enviar
            <Image src="/assets/enviar.png" alt="" width={20} height={20} />
          </button>
        </form>
      </section>
    </main>
  );
}
