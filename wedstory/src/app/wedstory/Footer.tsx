import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";

export default function Footer() {
  return (
    <div className={styles.footerInner}>
      <p>Contatos:</p>

      <Image src="/assets/whatsapp.png" alt="WhatsApp" width={30} height={30} />
      <p className={styles.num}>(11) 99710-2604</p>

      <Image src="/assets/mail.png" alt="Gmail" width={30} height={30} />
      <p className={styles.email}>gi.ribeirodefrancisco@gmail.com</p>

      <div className={styles.linhaVertical} />

      <Link href="/wedstory/sobre-nos" className={styles.sobreNos}>Sobre Nós</Link>
      <Link href="/wedstory/sobre-plataforma" className={styles.sobrePlataforma}>Sobre a plataforma</Link>
    </div>
  );
}
