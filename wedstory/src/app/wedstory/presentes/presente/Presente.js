"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./presente.module.css";

export default function Presente({ presente, onEdit }) {
  const router = useRouter();

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(presente);          
    } else {
      router.push(`/wedstory/presentes/${presente.id}/edit`); 
    }
  };

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

      <p className={styles.nome}>
        <Link href={`/wedstory/presentes/${presente.id}/edit`} className={styles.nomeLink}>
          {presente.nome}
        </Link>
      </p>

      <p className={styles.preco}>
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
          .format(presente.preco)}
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.editBtn} onClick={handleEdit}>
          Editar
        </button>
      </div>
    </article>
  );
}
