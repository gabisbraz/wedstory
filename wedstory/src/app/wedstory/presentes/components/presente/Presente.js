"use client";

import Image from "next/image";
import styles from "./presente.module.css";

export default function Presente({ presente }) {
  return (
    <article className={styles.card} aria-label={presente.nome}>
      <div className={styles.thumb}>
        {presente.caminhoImagem ? (
          <Image
            src={presente.caminhoImagem}
            alt={presente.nome}
            width={220}
            height={160}
            className={styles.img}
          />
        ) : (
          <div className={styles.noImg}>Sem imagem</div>
        )}
      </div>

      <p className={styles.nome}>{presente.nome}</p>
      <p className={styles.preco}>
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
          .format(presente.preco)}
      </p>
    </article>
  );
}
