import styles from "./layout.module.css";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

export const metadata = { title: "Wedstory" };

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <HeaderNav />
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
