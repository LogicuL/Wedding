import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './PageCountdown.module.css'

function useCountdown() {
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' })

  useEffect(() => {
    function tick() {
      const diff = new Date('2026-08-08T15:00:00') - new Date()
      if (diff <= 0) { setTime({ d:'00', h:'00', m:'00', s:'00' }); return }
      const pad = n => String(Math.floor(n)).padStart(2, '0')
      setTime({
        d: pad(diff / 86400000),
        h: pad(diff % 86400000 / 3600000),
        m: pad(diff % 3600000 / 60000),
        s: pad(diff % 60000 / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function PageCountdown({ active }) {
  const ref = useRef(null)
  const hasAnimated = useRef(false)
  const time = useCountdown()

  useEffect(() => {
    if (!active || hasAnimated.current) return
    hasAnimated.current = true
    const el = ref.current
    if (!el) return

    gsap.fromTo(el.querySelector('.' + styles.header),
      { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })

    gsap.fromTo(el.querySelectorAll('.' + styles.cdBox),
      { opacity: 0, y: 30, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.3 })

    gsap.fromTo(el.querySelector('.' + styles.mapSection),
      { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.65 })

  }, [active])

  return (
    <div className={styles.page} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ne revedem în</h2>
        </div>

        <div className={styles.countdownCard}>
          <div className={styles.cdGrid}>
            {[['d','Zile'],['h','Ore'],['m','Min'],['s','Sec']].map(([key, label]) => (
              <div className={styles.cdBox} key={key}>
                <span className={styles.cdNum}>{time[key]}</span>
                <span className={styles.cdUnit}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mapSection}>
          <div className={styles.mapHeader}>
            <p className={styles.eyebrow}>Locația</p>
            <h3 className={styles.mapTitle}>Wild Hills, Jucu</h3>
          </div>

          <div className={styles.mapWrap}>
            <img
              src="https://archdesign.ro/wp-content/uploads/wild-hills-6.jpg"
              alt="Wild Hills"
              loading="lazy"
            />
          </div>

          <div className={styles.mapBtnWrap}>
            <a
              className="maps-btn"
              href="https://maps.google.com/?q=Wild+Hills+Sat+Gadalin+Jucu+Cluj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Deschide în Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
