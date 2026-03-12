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
      'entry.1162362404': name,
      'entry.603925251': adults,
      'entry.859808419': kids,
    })
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfpCr_pS6yADtIm9i9TmaHxTpXNSuhjGCi3GfqVhNZkZ4B6fg/formResponse', {
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="7"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </span>
            <span className={styles.contactName}>Clau</span>
            <span className={styles.contactPhone}>0758 641 439</span>
          </a>
          <a className={styles.contactCard} href="tel:0741989139">
            <span className={styles.contactIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M12 6c-1.5 0-2.8.6-3.8 1.5L12 12l3.8-4.5C14.8 6.6 13.5 6 12 6z"/>
                <path d="M8.2 7.5L5 10.5M15.8 7.5L19 10.5"/>
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
