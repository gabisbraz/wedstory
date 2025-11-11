"use client";

import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideChrome =
    pathname?.startsWith("/wedstory/login") ||
    pathname?.startsWith("/wedstory/cadastro");

  return (
    <div className={styles.shell}>
      {/* HEADER visível apenas quando não for login/cadastro */}
      {!hideChrome && (
        <header className={styles.header}>
          <HeaderNav />
        </header>
      )}

      {/* MAIN ajusta estilo conforme o tipo de página */}
      <main className={`${styles.main} ${hideChrome ? styles.noChrome : ""}`}>
        {children}
      </main>

      {/* FOOTER visível apenas quando não for login/cadastro */}
      {!hideChrome && (
        <footer className={styles.footer}>
          <Footer />
        </footer>
      )}
    </div>
  );
}
