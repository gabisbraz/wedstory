"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./edit.module.css";

const LS_KEY = "presentes";
const read = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};
const write = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

export default function EditPresentePage({ params }) {
  const { id } = params;                  
  const router = useRouter();

  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [caminhoImagem, setCaminhoImagem] = useState("");

  useEffect(() => {
    const data = read();
    setLista(data);
    const item = data.find((p) => p.id === id);
    if (item) {
      setNome(item.nome ?? "");
      setPreco(String(item.preco ?? ""));
      setCaminhoImagem(item.caminhoImagem ?? "");
    }
  }, [id]);

  const presente = useMemo(() => lista.find((p) => p.id === id), [lista, id]);

  if (!presente) {
    return (
      <section className={styles.container}>
        <p className={styles.notFound}>Presente não encontrado.</p>
        <Link href="/wedstory/presentes" className={styles.cancelLink}>Voltar</Link>
      </section>
    );
  }

  const salvar = (e) => {
    e.preventDefault();
    const novoPreco = Number(preco);
    const novaLista = lista.map((p) =>
      p.id === id ? { ...p, nome, preco: isNaN(novoPreco) ? 0 : novoPreco, caminhoImagem } : p
    );
    write(novaLista);
    router.push("/wedstory/presentes"); 
  };

  const deletar = () => {
    if (!confirm("Tem certeza que deseja deletar?")) return;
    write(lista.filter((p) => p.id !== id));
    router.push("/wedstory/presentes");
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Editar presente</h1>

      {caminhoImagem ? (
        <Image
          src={caminhoImagem}
          alt={nome}
          width={500}
          height={350}
          className={styles.previewImage}
        />
      ) : (
        <div className={styles.imagePlaceholder}>Sem imagem</div>
      )}

      <form onSubmit={salvar} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Nome</span>
          <input
            className={styles.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Preço</span>
          <input
            className={styles.input}
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Imagem (URL)</span>
          <input
            className={styles.input}
            value={caminhoImagem}
            onChange={(e) => setCaminhoImagem(e.target.value)}
            placeholder="/imagens/presentes/arquivo.jpg ou https://…"
          />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.btn}>Salvar</button>
          <button type="button" onClick={deletar} className={`${styles.btn} ${styles.btnDanger}`}>
            Deletar
          </button>
          <Link href="/wedstory/presentes" className={`${styles.btn} ${styles.cancelLink}`}>
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}
