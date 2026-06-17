import React, { useState } from 'react'
import './app.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import Morphtext from './components/Morphtext'
import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'
import InkReveal from './components/ui/ink-reveal'

interface WindowsState {
  github: boolean
  note: boolean
  spotify: boolean
  cli: boolean
}

const App: React.FC = () => {
  const [WindowsState, setWindowsState] = useState<WindowsState>({
    github: false,
    note: false,
    spotify: false,
    cli: false,
  })

  const [isShutDown, setIsShutDown] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [cliTheme, setCliTheme] = useState('#00ff00')
  const [isWifiConnected, setIsWifiConnected] = useState(true)

  return (
    <main>
      {isShutDown ? (
        <div className="shut-down-overlay">
          <button onClick={() => setIsShutDown(false)} className="power-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="power-icon"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
            <span>Power On</span>
          </button>
        </div>
      ) : (
        <>
          {/* ─── Base wallpaper — the Unsplash landscape from the demo ── */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=85"
            alt="Desktop wallpaper"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Subtle dark vignette so the hero text stays legible */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background:
                'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.18) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Shader glow on top of wallpaper (theme colors) */}
          <div className="shader-bg" style={{ zIndex: 2 }}>
            <div className="shader-stripes" style={{ opacity: 0.35 }} />
          </div>

          {/* ─── InkReveal — scratches the cream mask to show wallpaper ── */}
          {/* maskColor matches the unsplash image's light beige/sky tones.
              Moving your cursor wipes through the overlay to reveal
              the landscape photo beneath. */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <InkReveal
              maskColor={[8, 10, 18]}
              brushSize={180}
              lifetime={900}
              rStart={14}
              rVary={0.5}
              stampStep={6}
              maxStamps={350}
              gradientStops={[0.98, 0.85, 0]}
              style={{ pointerEvents: 'all', opacity: 0.82 }}
            />
          </div>

          {/* Hero text */}
          <div className="hero-landing">
            <h1 className="hero-title">
              This MacBook is<br />
              Built on React,<br />
              No kidding.
            </h1>
            <Morphtext />
          </div>

          <Nav
            setIsShutDown={setIsShutDown}
            setShowAboutModal={setShowAboutModal}
            WindowsState={WindowsState}
            setWindowsState={setWindowsState}
            setCliTheme={setCliTheme}
            cliTheme={cliTheme}
            isWifiConnected={isWifiConnected}
            setIsWifiConnected={setIsWifiConnected}
          />

          <Dock setWindowsState={setWindowsState} />

          {WindowsState.github && (
            <Github windowName="GitHub" setWindowsState={setWindowsState} isWifiConnected={isWifiConnected} />
          )}
          {WindowsState.note && (
            <Note windowName="Note" setWindowsState={setWindowsState} />
          )}
          {WindowsState.spotify && (
            <Spotify windowName="Spotify" setWindowsState={setWindowsState} isWifiConnected={isWifiConnected} />
          )}
          {WindowsState.cli && (
            <Cli windowName="CLI" setWindowsState={setWindowsState} cliTheme={cliTheme} />
          )}

          {/* About This Mac Modal */}
          {showAboutModal && (
            <div className="about-modal-overlay" onClick={() => setShowAboutModal(false)}>
              <div className="about-modal" onClick={(e) => e.stopPropagation()}>
                <div className="about-modal-close" onClick={() => setShowAboutModal(false)} />
                <img src="/favicon.svg" alt="toxicbishop logo" className="about-logo" />
                <h2>toxicbishop OS</h2>
                <p className="version">Version 1.0.0 (React 19 + TypeScript)</p>
                <div className="specs">
                  <div className="spec-row">
                    <span className="spec-label">Processor</span>
                    <span className="spec-val">Backend & AI Engine</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Memory</span>
                    <span className="spec-val">Node.js / Python</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Graphics</span>
                    <span className="spec-val">React / Tailwind / TSX</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Storage</span>
                    <span className="spec-val">MongoDB / MySQL / Cassandra</span>
                  </div>
                </div>
                <p className="copyright">™ & © 2026 toxicbishop. All Rights Reserved.</p>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default App
