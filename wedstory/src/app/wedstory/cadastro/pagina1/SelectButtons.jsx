'use client';

import { useId, useState } from 'react';
import styles from './page.module.css';

export default function SelectButtons({ name, options }) {
  const groupId = useId();
  const [value, setValue] = useState('');

  return (
    <section
      className={styles.selectButtons}
      role="radiogroup"
      aria-labelledby={`${groupId}-label`}
      data-name={name}
    >
      <span id={`${groupId}-label`} className="sr-only">{name}</span>

      {options.map(opt => (
        <button
          type="button"
          key={opt.value}
          role="radio"
          aria-checked={value === opt.value}
          data-value={opt.value}
          className={`${styles.brideButton} ${value === opt.value ? styles.selected : ''}`}
          onClick={() => setValue(opt.value)}
        >
          <span>{opt.label}</span>
        </button>
      ))}

      {/* espelha o valor num hidden (se precisar enviar em form tradicional) */}
      <input type="hidden" name={name} value={value} />
    </section>
  );
}
