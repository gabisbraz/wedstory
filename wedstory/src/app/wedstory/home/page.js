import Link from "next/link";
import Image from "next/image";
import styles from "./page.css";
import ActiveLink from "./ActiveLink";

export const metadata = { title: "Wedstory" };

export default function HomePage() {
  return (
    <div className="root">
      <main className="main">
        <Image
          src="/assets/Comp_Cel.png"
          alt="Imagem do App"
          width={400}
          height={400}
          className="imgApp"
          priority
        />

        <section className="conteudo">
          <Link href="/wedstory/cadastro/pagina1" className="btn">
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
