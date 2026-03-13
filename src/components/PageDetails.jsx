import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './PageDetails.module.css'

const COLORS = [
  { hex: '#fef4e8', label: 'Crem',     border: '1px solid rgba(0,0,0,0.08)' },
  { hex: '#f2cfc4', label: 'Roz',      border: 'none' },
  { hex: '#f7dfc0', label: 'Piersică', border: 'none' },
  { hex: '#fefacd', label: 'Galben',   border: '1px solid rgba(0,0,0,0.07)' },
  { hex: '#c1e1c1', label: 'Verde',    border: 'none' },
  { hex: '#a7c7e7', label: 'Albastru', border: 'none' },
  { hex: '#d4cce8', label: 'Lavandă',  border: 'none' },
  { hex: '#d3d3d3', label: 'Gri',      border: 'none' },
]

export default function PageDetails({ active }) {
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || hasAnimated.current) return
    hasAnimated.current = true
    const el = ref.current
    if (!el) return

    gsap.fromTo(el.querySelector('.' + styles.header),
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })

    gsap.fromTo(el.querySelectorAll('.' + styles.eventCard),
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.15, ease: 'power3.out', delay: 0.3 })

    gsap.fromTo(el.querySelector('.' + styles.dressCard),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.65 })

    gsap.fromTo(el.querySelectorAll('.' + styles.swatch),
      { opacity: 0, scale: 0, rotate: -15 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(2)', delay: 0.85 })

  }, [active])

  return (
    <div className={styles.page} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Detalii Eveniment</h2>
          <a className={styles.locationSub} href="https://maps.google.com/?q=Wild+Hills+Sat+Gadalin+nr+158+Jucu+Cluj" target="_blank" rel="noopener noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px',flexShrink:0,verticalAlign:'middle'}}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Wild Hills, Jucu, județul Cluj
          </a>
        </div>

        <div className={`${styles.eventCard} ${styles.church}`}>
          <span className={styles.icon}>
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="17" cy="24" r="11"/>
              <circle cx="31" cy="24" r="11"/>
              <path d="M22 18 C24 21 24 27 22 30" strokeWidth="1.2" opacity="0.6"/>
              <path d="M26 18 C24 21 24 27 26 30" strokeWidth="1.2" opacity="0.6"/>
            </svg>
          </span>
          <span className={styles.cardLabel}>Cununie religioasă în aer liber</span>
          <p className={styles.cardTime}>Ora 15:00</p>
          <p className={styles.venueName}>Wild Hills – Italian Garden</p>
          <img
            src="https://www.wildhills.ro/wp-content/uploads/2025/02/IA-INFrame-1008-1536x1024.jpg"
            alt="Wild Hills Italian Garden"
            className={styles.venueImg}
          />
        </div>

        <div className={`${styles.eventCard} ${styles.party}`}>
          <span className={styles.icon}>
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 6 L10 22 C10 28 18 32 18 32 L18 42"/>
              <path d="M34 6 L38 22 C38 28 30 32 30 32 L30 42"/>
              <line x1="12" y1="42" x2="24" y2="42"/>
              <line x1="24" y1="42" x2="36" y2="42"/>
              <path d="M10 6 L38 6"/>
              <path d="M12 14 C16 16 20 15 24 13 C28 11 32 12 36 14" strokeWidth="1" opacity="0.5"/>
              <circle cx="22" cy="20" r="1" opacity="0.4"/>
              <circle cx="26" cy="16" r="0.8" opacity="0.4"/>
              <circle cx="24" cy="24" r="0.9" opacity="0.3"/>
            </svg>
          </span>
          <span className={styles.cardLabel}>Hai și bucură-te cu noi la nuntă!</span>
          <p className={styles.cardTime}>Ora 16:00</p>
          <p className={styles.venueName}>Wild Hills – Glass House</p>
          <img
            src="https://www.wildhills.ro/wp-content/uploads/2025/02/glass-house-4-1024x683.jpeg"
            alt="Wild Hills Glass House"
            className={styles.venueImg}
          />
        </div>

        <div className={styles.dressCard}>
          <p className={styles.dressTitle}>Dress Code</p>
          <p className={styles.dressNote}>
            Vă rugăm să evitați nuanțele de alb și negru.
          </p>
          <div className={styles.colorGrid}>
            {COLORS.map(c => (
              <div className={styles.swatch} key={c.label}>
                <div
                  className={styles.swatchCircle}
                  style={{ background: c.hex, border: c.border }}
                />
                <span className={styles.swatchLabel}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}