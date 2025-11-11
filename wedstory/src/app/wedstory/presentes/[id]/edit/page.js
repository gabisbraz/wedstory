"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import styles from "./edit.module.css";

export default function EditPresentePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [caminhoImagem, setCaminhoImagem] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/presentes/${id}`, { cache: "no-store" });
        if (res.status === 404) { setNotFound(true); return; }
        if (!res.ok) throw new Error("Erro ao carregar presente");
        const item = await res.json();
        setNome(item?.nome ?? "");
        setPreco(String(item?.preco ?? ""));
        setCaminhoImagem((item?.caminhoImagem ?? item?.imagem ?? "").trim());
      } catch (e) {
        console.error(e);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const salvar = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome,
        preco: Number(preco),
        caminhoImagem: caminhoImagem.trim(),
      };
      const res = await fetch(`/api/presentes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      const updated = await res.json();

      // Se o id mudou por conta do novo nome, navega para a nova rota
      if (updated?.id && updated.id !== id) {
        router.replace(`/wedstory/presentes/${updated.id}/edit`);
      } else {
        router.refresh(); // atualiza os dados na página
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deletar = async () => {
    if (!confirm("Tem certeza que deseja deletar?")) return;
    try {
      const res = await fetch(`/api/presentes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar");
      router.push(`/wedstory/presentes`);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando presente...</p>;
  if (notFound) {
    return (
      <section className={styles.container}>
        <p className={styles.notFound}>Presente não encontrado.</p>
        <Link href="/wedstory/presentes" className={styles.cancelLink}>Voltar</Link>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Editar presente</h1>

      {caminhoImagem ? (
        <Image
          key={caminhoImagem}
          src={caminhoImagem}
          alt={nome}
          width={500}
          height={350}
          className={styles.previewImage}
          unoptimized
        />
      ) : (
        <div className={styles.imagePlaceholder}>Sem imagem</div>
      )}

      <form onSubmit={salvar} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Nome</span>
          <input className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Preço</span>
          <input className={styles.input} type="number" step="0.01" value={preco}
                 onChange={(e) => setPreco(e.target.value)} required />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Imagem (URL)</span>
          <input className={styles.input} value={caminhoImagem}
                 onChange={(e) => setCaminhoImagem(e.target.value)}
                 placeholder="/assets/champagne.jpeg ou https://..." />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.btn}>Salvar</button>
          <button type="button" onClick={deletar} className={`${styles.btn} ${styles.btnDanger}`}>Deletar</button>
          <Link href="/wedstory/presentes" className={`${styles.btn} ${styles.cancelLink}`}>Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
