// "use client";

// import { useEffect, useMemo, useState } from "react";
// import styles from "./page.module.css";

// const STORAGE_KEY = "wedstory_gifts";

// function loadGifts() {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//   } catch {
//     return [];
//   }
// }
// function saveGifts(arr) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
// }
// function fmtBRL(v) {
//   if (v === "" || v === null || v === undefined) return "";
//   const n = Number(v);
//   if (Number.isNaN(n)) return v;
//   return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
// }
// function uid() {
//   return (typeof crypto !== "undefined" && crypto.randomUUID)
//     ? crypto.randomUUID()
//     : Math.random().toString(36).slice(2, 10);
// }

// export default function PresentesPage() {
//   const [gifts, setGifts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [img, setImg] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(""); // número em texto
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setGifts(loadGifts());
//   }, []);

//   const total = useMemo(
//     () => gifts.reduce((acc, g) => acc + (Number(g.price) || 0), 0),
//     [gifts]
//   );

//   function resetForm() {
//     setImg("");
//     setName("");
//     setPrice("");
//     setError("");
//   }

//   function addGift() {
//     // validações simples
//     if (!name.trim()) return setError("Informe o nome do presente.");
//     const num = Number(price);
//     if (Number.isNaN(num) || num < 0) return setError("Informe um preço válido (ex: 199.90).");

//     const novo = { id: uid(), name: name.trim(), price: num, img: img.trim() };
//     const arr = [novo, ...gifts];
//     setGifts(arr);
//     saveGifts(arr);
//     setOpen(false);
//     resetForm();
//   }

//   function removeGift(id) {
//     const arr = gifts.filter((g) => g.id !== id);
//     setGifts(arr);
//     saveGifts(arr);
//   }

//   return (
//     <div className={styles.page}>
//       <header className={styles.header}>
//         <h1>Lista de Presentes</h1>
//         <div className={styles.summary}>
//           <span>{gifts.length} itens</span>
//           <span>Total: <strong>{fmtBRL(total)}</strong></span>
//         </div>
//       </header>

//       <section className={styles.grid}>
//         {/* Card inicial: adicionar */}
//         <button className={styles.addCard} onClick={() => setOpen(true)}>
//           <span className={styles.addPlus}>+</span>
//           <span>Adicionar presente</span>
//         </button>

//         {/* Cards de presente */}
//         {gifts.map((g) => (
//           <article className={styles.card} key={g.id}>
//             <div className={styles.thumb}>
//               {g.img ? (
//                 // usando <img> para aceitar URLs externas sem precisar configurar domains
//                 <img src={g.img} alt={g.name} />
//               ) : (
//                 <div className={styles.noImg}>Sem imagem</div>
//               )}
//             </div>

//             <div className={styles.cardBody}>
//               <h3 className={styles.title} title={g.name}>{g.name}</h3>
//               <div className={styles.price}>{fmtBRL(g.price)}</div>
//             </div>

//             <div className={styles.cardActions}>
//               <button className={styles.deleteBtn} onClick={() => removeGift(g.id)}>
//                 Remover
//               </button>
//             </div>
//           </article>
//         ))}
//       </section>

//       {/* Modal simples para adicionar */}
//       {open && (
//         <div className={styles.modalBackdrop} onClick={() => setOpen(false)}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h2>Novo presente</h2>

//             <label className={styles.label}>Imagem (URL) – opcional</label>
//             <input
//               className={styles.input}
//               placeholder="https://exemplo.com/box-panela.jpg"
//               value={img}
//               onChange={(e) => setImg(e.target.value)}
//             />

//             <label className={styles.label}>Nome</label>
//             <input
//               className={styles.input}
//               placeholder="Jogo de panelas"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <label className={styles.label}>Preço</label>
//             <input
//               className={styles.input}
//               placeholder="199.90"
//               inputMode="decimal"
//               value={price}
//               onChange={(e) => setPrice(e.target.value.replace(",", "."))}
//             />

//             {error && <p className={styles.error}>{error}</p>}

//             <div className={styles.modalActions}>
//               <button className={styles.saveBtn} onClick={addGift}>Salvar</button>
//               <button className={styles.cancelBtn} onClick={() => { setOpen(false); resetForm(); }}>Cancelar</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }]

// "use client";

// import Presente from "./components/presente/Presente";
// import styles from "./page.module.css";

// export default function ListaDePresentes() {
//   const presentes = [
//     { id: "panela",    nome: "Jogo de panelas",       preco: 289.90, caminhoImagem: "/imagens/presentes/panela.jpg" },
//   ];

//   return (
//     <section className={styles.sectionMain}>
//       {/* Card inicial para adicionar (placeholder simples) */}
//       <button
//         type="button"
//         className={styles.addCard}
//         onClick={() => alert("Aqui você pode abrir um modal para cadastrar um presente.")}
//       >
//         <span className={styles.plus}>+</span>
//         <span>Adicionar presente</span>
//       </button>

//       {presentes.map((p) => (
//         <Presente key={p.id} presente={p} />
//       ))}
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Presente from "./components/presente/Presente";
import Modal from "./components/modal/Modal";
import styles from "./page.module.css";

export default function ListaDePresentes() {
  const [presentes, setPresentes] = useState([
    {
      id: "panela",
      nome: "Jogo de panelas",
      preco: 289.9,
      caminhoImagem: "/imagens/presentes/panela.jpg",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (novoPresente) => {
    setPresentes((prevPresentes) => [
      ...prevPresentes,
      { ...novoPresente, id: crypto.randomUUID() },
    ]);
  };

  return (
    <section className={styles.sectionMain}>
      {/* Card inicial para adicionar (placeholder simples) */}
      <button
        type="button"
        className={styles.addCard}
        onClick={openModal}
      >
        <span className={styles.plus}>+</span>
        <span>Adicionar presente</span>
      </button>

      {presentes.map((p) => (
        <Presente key={p.id} presente={p} />
      ))}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </section>
  );
}
