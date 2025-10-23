// import styles from "./layout.module.css";
// import HeaderNav from "./HeaderNav";
// import Footer from "./Footer";

// export const metadata = { title: "Wedstory" };

// export default function SiteLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className={styles.shell}>
//       <header className={styles.header}>
//         <HeaderNav />
//       </header>

//       <main className={styles.main}>
//         {children}
//       </main>

//       <footer className={styles.footer}>
//         <Footer />
//       </footer>
//     </div>
//   );
// }
"use client";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith("/wedstory/login") || pathname?.startsWith("/wedstory/cadastro");
  return (
    <div className={styles.shell}>
      {!hideChrome && (
        <header className={styles.header}>
          <HeaderNav />
        </header>
      )}

      <main className={styles.main}>{children}</main>

      {!hideChrome && (
        <footer className={styles.footer}>
          <Footer />
        </footer>
      )}
    </div>
  );
}
