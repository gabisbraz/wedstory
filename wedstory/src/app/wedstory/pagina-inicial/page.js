import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import HomeSwiper from "./HomeSwiper";

// export const metadata = { title: "Wedstory – Início" };

export default function PaginaInicial() {
  return (
    <main>
      {/* Carrossel */}
      <HomeSwiper />

    </main>
  );
}
