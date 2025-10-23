"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function AvatarPicker() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function onPick() {
    fileRef.current?.click();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  return (
    <article className={styles.fotoPerfilContainer}>
      <figure className={styles.fotoPerfil} onClick={onPick}>
        {preview ? (
          <img src={preview} alt="Foto de perfil" />
        ) : (
          <span className={styles.placeholderIcon}>
            <span className={styles.plusIcon}>+</span>
          </span>
        )}
      </figure>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
      />

      <button
        type="button"
        className={styles.fotoPerfilOverlay}
        aria-label="Selecionar foto de perfil"
        onClick={onPick}
      />
    </article>
  );
}
