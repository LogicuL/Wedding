import React from 'react'
import styles from './Nav.module.css'

export default function Nav({ cur, total, onGo }) {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.btn}
        onClick={() => onGo(cur - 1)}
        disabled={cur === 0}
        aria-label="Pagina anterioară"
      >
        ←
      </button>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === cur ? styles.dotActive : ''}`}
            onClick={() => onGo(i)}
            aria-label={`Pagina ${i + 1}`}
          />
        ))}
      </div>
      <button
        className={styles.btn}
        onClick={() => onGo(cur + 1)}
        disabled={cur === total - 1}
        aria-label="Pagina următoare"
      >
        →
      </button>
    </nav>
  )
}
