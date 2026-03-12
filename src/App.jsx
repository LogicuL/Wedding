import React, { useState, useRef, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import PageCover     from './components/PageCover.jsx'
import PageDetails   from './components/PageDetails.jsx'
import PageCountdown from './components/PageCountdown.jsx'
import PageRSVP      from './components/PageRSVP.jsx'
import Nav           from './components/Nav.jsx'
import { useParticles } from './hooks/useParticles.js'
import styles from './App.module.css'

// Michael Bublé - Everything (fișier local)
const MUSIC_URLS = [
  './everything.mp3',
]

const PAGES = [PageCover, PageDetails, PageCountdown, PageRSVP]
const TOTAL = PAGES.length

function MusicBtn({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={playing ? 'Oprește muzica' : 'Pornește muzica'}
      style={{
        position: 'fixed',
        bottom: '76px',
        right: '18px',
        zIndex: 8000,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.35)',
        background: 'rgba(253,250,245,0.82)',
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold)',
        boxShadow: '0 2px 14px rgba(45,26,6,0.10)',
        transition: 'transform 0.2s',
        padding: 0,
      }}
    >
      {playing ? (
        // Pause icon
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="5" y="3" width="4" height="18" rx="1"/>
          <rect x="15" y="3" width="4" height="18" rx="1"/>
        </svg>
      ) : (
        // Play icon + music note hint
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      )}
    </button>
  )
}

export default function App() {
  const [cur, setCur]       = useState(0)
  const [prev, setPrev]     = useState(null)
  const [dir, setDir]       = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const [playing, setPlaying] = useState(false)
  const canvasRef = useRef(null)
  const audioRef  = useRef(null)
  const swipeStartX   = useRef(0)
  const swipeStartY   = useRef(0)
  const hasNavigated  = useRef(false)

  const particlePageRef = useParticles(canvasRef)

  // Muzică: inițializează audio la start
  useEffect(() => {
    let urlIndex = 0
    function tryNextUrl() {
      if (urlIndex >= MUSIC_URLS.length) return
      const a = new Audio(MUSIC_URLS[urlIndex])
      a.loop = true
      a.volume = 0.35
      a.addEventListener('error', () => { urlIndex++; tryNextUrl() }, { once: true })
      audioRef.current = a
    }
    tryNextUrl()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  // Pornește muzica automat când ajunge pe pagina 2 (index >= 1)
  const musicStartedRef = useRef(false)
  useEffect(() => {
    if (cur < 1 || musicStartedRef.current) return
    const tryPlay = () => {
      if (!audioRef.current || musicStartedRef.current) return
      audioRef.current.play().then(() => {
        musicStartedRef.current = true
        setPlaying(true)
      }).catch(() => {})
    }
    tryPlay()
    // fallback la prima interacțiune
    function onInteract() {
      tryPlay()
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('pointerdown', onInteract)
    }
    document.addEventListener('touchstart', onInteract, { passive: true })
    document.addEventListener('pointerdown', onInteract, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('pointerdown', onInteract)
    }
  }, [cur])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [playing])

  const goTo = useCallback((n) => {
    if (n < 0 || n >= TOTAL || transitioning || n === cur) return
    hasNavigated.current = true
    setDir(n > cur ? 1 : -1)
    setPrev(cur)
    setCur(n)
    if (particlePageRef) particlePageRef.current = n
    setTransitioning(true)
    setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
    }, 520)
  }, [cur, transitioning, particlePageRef])

  // Swipe
  useEffect(() => {
    function onStart(e) {
      swipeStartX.current = e.touches[0].clientX
      swipeStartY.current = e.touches[0].clientY
    }
    function onEnd(e) {
      const dx = e.changedTouches[0].clientX - swipeStartX.current
      const dy = e.changedTouches[0].clientY - swipeStartY.current
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        goTo(dx < 0 ? cur + 1 : cur - 1)
      }
    }
    document.addEventListener('touchstart', onStart, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onStart)
      document.removeEventListener('touchend', onEnd)
    }
  }, [cur, goTo])

  return (
    <div className={styles.app}>
      {/* Ambient background */}
      <div className={styles.ambient} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Pages */}
      <div className={styles.pageStack}>
        {PAGES.map((Page, i) => {
          const isActive = i === cur
          const isPrev   = i === prev

          let cls = styles.pageSlot
          if (isActive) {
            // Only animate entrance if user has actually navigated
            if (hasNavigated.current) {
              cls += ' ' + (dir > 0 ? styles.enterRight : styles.enterLeft)
            } else {
              cls += ' ' + styles.pageActive
            }
          } else if (isPrev) {
            cls += ' ' + (dir > 0 ? styles.exitLeft : styles.exitRight)
          } else {
            cls += ' ' + styles.hidden
          }

          return (
            <div key={i} className={cls}>
              <Page active={isActive} />
            </div>
          )
        })}
      </div>

      <Nav cur={cur} total={TOTAL} onGo={goTo} />
      <MusicBtn playing={playing} onToggle={toggleMusic} />
    </div>
  )
}
