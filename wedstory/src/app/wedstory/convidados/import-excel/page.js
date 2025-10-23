"use client";
import { useState } from "react";
import ExcelJS from "exceljs";
import styles from "./page.module.css";

const STORAGE_KEY = "wedstory_guests";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function save(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export default function ImportarExcelPage() {
  const [toast, setToast] = useState(null);

  function showToast(msg, time = 1800) {
    setToast(msg);
    setTimeout(() => setToast(null), time);
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const workbook = new ExcelJS.Workbook();
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);
      const sheet = workbook.worksheets[0];

      const rows = [];
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // pula cabeçalho
        rows.push({
          Familia: row.getCell(1).value,
          Adultos: row.getCell(2).value,
          Crianças: row.getCell(3).value,
          Bebês: row.getCell(4).value,
        });
      });

      const novosConvidados = rows.map((r) => ({
        id: crypto.randomUUID(),
        familia: r.Familia?.toString().trim() || "",
        nomesAdultos: r.Adultos ? r.Adultos.toString().split(",").map((n) => n.trim()) : [],
        nomesCriancas: r.Crianças ? r.Crianças.toString().split(",").map((n) => n.trim()) : [],
        nomesBebes: r.Bebês ? r.Bebês.toString().split(",").map((n) => n.trim()) : [],
        adulto: r.Adultos ? r.Adultos.toString().split(",").filter(Boolean).length : 0,
        crianca: r.Crianças ? r.Crianças.toString().split(",").filter(Boolean).length : 0,
        bebe: r.Bebês ? r.Bebês.toString().split(",").filter(Boolean).length : 0,
        createdAt: Date.now(),
      }));

      const arr = load();
      const atualizados = [...arr, ...novosConvidados];
      save(atualizados);

      showToast(`${novosConvidados.length} famílias importadas com sucesso!`);
    } catch (err) {
      console.error(err);
      showToast("❌ Erro ao processar o Excel");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📁 Importar convidados via Excel</h1>

      <label htmlFor="excelUpload" className={styles.importButton}>
        Selecionar arquivo .xlsx
      </label>
      <input
        id="excelUpload"
        type="file"
        accept=".xlsx"
        className={styles.hiddenInput}
        onChange={handleFileUpload}
      />

      <p className={styles.info}>
        O arquivo deve conter as colunas: <b>Família</b>, <b>Adultos</b>, <b>Crianças</b> e <b>Bebês</b>.
      </p>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
