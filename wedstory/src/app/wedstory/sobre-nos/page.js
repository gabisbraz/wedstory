import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = { title: "Wedstory – Sobre Nós" };

export default function SobreNosPage() {
  return (
    <div className={styles.root}>
      <main className={styles.container}>
        <Image
          src="/assets/giovana.png"
          alt="Foto de Giovana Ribeiro"
          width={249}
          height={249}
          className={styles.fotoGiovana}
          priority
        />

        <section className={styles.texto}>
          <ul>
            <li>Somos Giovana Ribeiro e Mellyna Rodrigues, primas e parceiras nesse projeto feito com muito carinho.</li>
            <br />
            <li>A ideia foi da Mellyna, apaixonada por casamentos, e a Giovana colocou tudo em prática como desenvolvedora da plataforma.</li>
            <br />
            <li>Criamos esse espaço para ajudar casais a contarem sua história de forma única, bonita e inesquecível.</li>
          </ul>
        </section>

        <Image
          src="/assets/mellyna.png"
          alt="Foto de Mellyna Rodrigues"
          width={249}
          height={249}
          className={styles.fotoMellyna}
        />
      </main>
    </div>
  );
}
