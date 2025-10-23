import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ProfileForm from "./ProfileForm";

export const metadata = { title: "Wedstory – Perfil" };

export default function PerfilPage() {
  return (
    <main>
      <ProfileForm />
    </main>
  );
}
