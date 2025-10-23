'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import SelectButtons from './SelectButtons';

// export const metadata = { title: 'Wedstory – Cadastro (1/2)' };

export default function CadastroPg1() {
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

        <form className={styles.form}>
          <input type="text" className={styles.inputField} placeholder="Seu nome" required />

          {/* Grupo 1: eu sou noiva/noivo */}
          <SelectButtons
            name="eu"
            options={[
              { value: 'noiva', label: 'Sou a noiva' },
              { value: 'noivo', label: 'Sou o noivo' },
            ]}
          />

          <input type="text" className={styles.inputField} placeholder="Nome do seu amor" required />

          {/* Grupo 2: meu par é noiva/noivo */}
          <SelectButtons
            name="par"
            options={[
              { value: 'noiva', label: 'É minha noiva' },
              { value: 'noivo', label: 'É meu noivo' },
            ]}
          />

          <p className={styles.dateLabel}>Data do casamento:</p>
          <input type="date" id="data" name="data" className={styles.date} />
        </form>

        <Link href="/wedstory/cadastro/pagina2" className={styles.proximo}>
          Próximo
          <Image src="/assets/enviar.png" alt="" width={20} height={20} />
        </Link>
      </section>
    </main>
  );
}
