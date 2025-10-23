import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ActiveLink from "./ActiveLink";

export const metadata = { title: "Wedstory" };

export default function HomePage() {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Image
          src="/assets/Comp_Cel.png"
          alt="Imagem do App"
          width={400}
          height={400}
          className={styles.imgApp}
          priority
        />

        <section className={styles.conteudo}>
          <Link href="/wedstory/cadastro/pagina1" className={styles.btn}>
            Começar agora
          </Link>

          <p>
            Planeje, celebre e compartilhe cada momento
            <br />
            Tudo para celebrar o amor em um só clique!
          </p>
        </section>
      </main>
    </div>
  );
}
