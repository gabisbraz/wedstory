"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = href !== "#" && (pathname === href || pathname.startsWith(href + "/"));
  return (
    <Link href={href} className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
      {children}
    </Link>
  );
}

export default function HeaderNav() {
  return (
    <nav className={styles.nav}>
      <b>
        <Link href="/wedstory/home" className={styles.logo}>Wedstory</Link>
      </b>

      <ul className={styles.menu}>
        <li><NavLink href="/wedstory/login">Login</NavLink></li>
        <li><NavLink href="#">Tutorial</NavLink></li>
        <li className={styles.perfilItem}>
          <Link href="/wedstory/perfil" className={styles.perfilLink}>
            <Image src="/assets/perfil.png" alt="Perfil" width={40} height={40} />
            <span>Perfil</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
