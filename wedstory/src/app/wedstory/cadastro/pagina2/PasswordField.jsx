'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function PasswordField({ id, placeholder }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  return (
    <fieldset className={styles.passwordContainer}>
      <input
        ref={ref}
        id={id}
        type={show ? 'text' : 'password'}
        className={styles.inputField}
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        className={styles.togglePassword}
        onClick={() => {
          setShow(s => !s);
          ref.current?.focus();
        }}
        aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
      >
        <Image
          src={show ? '/assets/olho-aberto.png' : '/assets/olho-fechado.png'}
          alt=""
          width={25}
          height={25}
        />
      </button>
    </fieldset>
  );
}
