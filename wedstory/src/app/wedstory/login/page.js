'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import styles from './page.module.css';

// export const metadata = { title: 'Wedstory – Login' };

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const senhaRef = useRef(null);

  const togglePassword = () => {
    setShowPassword((v) => !v);
    senhaRef.current?.focus();
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <b>
            Bem-vindo ao <br /> Wedstory
          </b>
        </nav>

        {/* Imagem dos corações */}
        <div className={styles.headerImageWrapper}>
          <Image
            src="/assets/coracoes.png"
            alt="Corações"
            width={220}
            height={220}
            className={styles.headerImage}
            priority
          />
        </div>
      </header>

      <section className={styles.section}>
        <h1>Faça seu Login!</h1>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = '/wedstory/pagina-inicial';
          }}
        >
          <input
            type="text"
            className={styles.inputField}
            placeholder="Usuário"
            required
          />

          <fieldset className={styles.passwordContainer}>
            <input
              ref={senhaRef}
              type={showPassword ? 'text' : 'password'}
              className={styles.inputField}
              id="senha"
              placeholder="Senha"
              required
              aria-label="Senha"
            />

            <button
              type="button"
              className={styles.togglePassword}
              onClick={togglePassword}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <Image
                src={showPassword ? '/assets/olho-aberto.png' : '/assets/olho-fechado.png'}
                alt={showPassword ? 'Olho aberto' : 'Olho fechado'}
                width={25}
                height={25}
              />
            </button>
          </fieldset>

          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Lembrar
            </label>

            <Link href="#" className={styles.link}>
              Esqueci Senha
            </Link>
          </div>

          <div className={styles.actions}>
            <button className={styles.enviar} type="submit">
              Enviar
              <Image
                src="/assets/enviar.png"
                alt=""
                width={20}
                height={20}
                aria-hidden
              />
            </button>

            <Link href="/wedstory/cadastro/pagina1" className={styles.criarConta}>
              Criar Conta
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
