import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './PageRSVP.module.css'

function Modal({ onClose }) {
  const [name, setName] = useState('')
  const [adults, setAdults] = useState('2')
  const [kids, setKids] = useState('0')
  const [done, setDone] = useState(false)
  const startY = useRef(0)
  const boxRef = useRef(null)

  function submit() {
    if (!name.trim()) { alert('Introduceți numele.'); return }
    const body = new URLSearchParams({
      'entry.2069362482': name,
      'entry.64121495': adults === '1' ? '1 persoană' : adults + ' persoane',
      'entry.1452410560': kids === '0' ? 'Fără copii' : kids === '1' ? '1 copil' : kids + ' copii',
    })
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSe0l6FmBOr37EQJJY03W0pgpA16lGQkw1I7xMvGG5i5yFdtpw/formResponse', {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(() => {})
    setDone(true)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div
        className={styles.modal}
        ref={boxRef}
        onTouchStart={e => { startY.current = e.touches[0].clientY }}
        onTouchEnd={e => { if (e.changedTouches[0].clientY - startY.current > 80) onClose() }}
      >
        <div className={styles.handle} />
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <p className={styles.modalTitle}>Confirmare Prezență</p>

        {!done ? (
          <>
            <div className={styles.field}>
              <label>Nume și Prenume</label>
              <input
                type="text"
                placeholder="Ion și Ana Popescu"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Adulți</label>
              <select value={adults} onChange={e => setAdults(e.target.value)}>
                <option value="1">1 adult</option>
                <option value="2">2 adulți</option>
                <option value="3">3 adulți</option>
                <option value="4">4 adulți</option>
                <option value="5">5 adulți</option>
                <option value="6">6 adulți</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Copii <span style={{fontWeight:300, fontSize:'0.85em'}}>(&lt;14 ani - meniu de copii)</span></label>
              <select value={kids} onChange={e => setKids(e.target.value)}>
                <option value="0">Fără copii</option>
                <option value="1">1 copil</option>
                <option value="2">2 copii</option>
                <option value="3">3 copii</option>
                <option value="4">4 copii</option>
                <option value="5">5 copii</option>
                <option value="6">6 copii</option>
              </select>
            </div>
            <button className={styles.submitBtn} onClick={submit}>
              Confirmă prezența ✓
            </button>
          </>
        ) : (
          <div className={styles.success}>
            <span>🎉</span>
            <p>Vă mulțumim!<br />Abia așteptăm să vă vedem!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PageRSVP({ active }) {
  const ref = useRef(null)
  const hasAnimated = useRef(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!active || hasAnimated.current) return
    hasAnimated.current = true
    const el = ref.current
    if (!el) return

    gsap.fromTo(el.querySelector('.' + styles.header),
      { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })

    gsap.fromTo(el.querySelectorAll('.' + styles.contactCard),
      { opacity: 0, y: 32, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.35 })

    gsap.fromTo(el.querySelector('.' + styles.rsvpBtn),
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.65 })

    gsap.fromTo(el.querySelector('.' + styles.footer),
      { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.9 })

  }, [active])

  return (
    <div className={styles.page} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Confirmă prezența</p>
          <p className={styles.subtitle}>
            Vă așteptăm răspunsul până pe <strong>1 Iulie 2026</strong>
          </p>
        </div>

        <div className={styles.contactRow}>
          <a className={styles.contactCard} href="tel:0758641439">
            <span className={styles.contactIcon}>
              <svg width="32" height="22" viewBox="0 0 32 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                {/* Left wing */}
                <path d="M14 11 L2 2 L2 20 Z"/>
                {/* Right wing */}
                <path d="M18 11 L30 2 L30 20 Z"/>
                {/* Center knot */}
                <ellipse cx="16" cy="11" rx="2.5" ry="3.5"/>
              </svg>
            </span>
            <span className={styles.contactName}>Clau</span>
            <span className={styles.contactPhone}>0758 641 439</span>
          </a>
          <a className={styles.contactCard} href="tel:0741989139">
            <span className={styles.contactIcon}>
              <svg width="30" height="26" viewBox="0 0 30 26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                {/* Bodice top */}
                <path d="M10 2 Q10 0 15 0 Q20 0 20 2 L19 8 L11 8 Z"/>
                {/* Sweetheart neckline */}
                <path d="M11 3 Q12.5 5.5 15 4.5 Q17.5 5.5 19 3" strokeWidth="0.9" opacity="0.55"/>
                {/* Waist */}
                <path d="M11 8 Q15 9.5 19 8"/>
                {/* Skirt flares wide */}
                <path d="M11 8 L2 26 L28 26 L19 8"/>
                {/* Skirt layers */}
                <path d="M7 17 Q15 19 23 17" strokeWidth="0.85" opacity="0.45"/>
              </svg>
            </span>
            <span className={styles.contactName}>Maria</span>
            <span className={styles.contactPhone}>0741 989 139</span>
          </a>
        </div>

        <button className={styles.rsvpBtn} onClick={() => setModalOpen(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'8px', flexShrink:0}}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Confirmă online
        </button>

        <p className={styles.deadline}>Termen limită: 1 Iulie 2026</p>

        <div className={styles.footer}>
          <p className={styles.footerNames}>Clau &amp; Maria</p>
          <p className={styles.footerDate}>8 · VIII · MMXXVI</p>
        </div>
      </div>

      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  )
}