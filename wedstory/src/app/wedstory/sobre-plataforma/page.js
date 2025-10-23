import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = { title: "Wedstory – Sobre a plataforma" };

export default function SobrePlataformaPage() {
  return (
    <div className={styles.root}>
      <main className={styles.container}>
        <Image
          src="/assets/fotosMV.png"
          alt="Imagem do App"
          width={400}
          height={400}
          className={styles.imgMv}
          priority
        />

        <section className={styles.texto}>
          <ul>
            <li>Nossa plataforma foi criada para tornar a experiência do casamento ainda mais especial.</li>
            <br />
            <li>Aqui, os noivos podem montar seu próprio site personalizado, com informações do grande dia, galeria de fotos, lista de presentes, confirmação de presença e muito mais.</li>
            <br />
            <li>Tudo de forma simples, bonita e com aquele toque de carinho que esse momento merece. Pensamos em cada detalhe para que vocês possam focar no mais importante: viver esse sonho!</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
