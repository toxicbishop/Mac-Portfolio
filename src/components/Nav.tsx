import React, { useEffect, useState, useRef } from 'react'
import './Nav.scss'
import DateTime from './DateTime'

const STORAGE_KEY = 'sky-mode'

type SkyMode = 'moon' | 'sun'
type DropdownName = 'apple' | 'file' | 'edit' | 'window' | 'terminal' | 'wifi' | null
type SpeedTestState = 'idle' | 'running' | 'done'

interface WindowsState {
  github: boolean
  note: boolean
  spotify: boolean
  cli: boolean
}

interface NavProps {
  setIsShutDown: React.Dispatch<React.SetStateAction<boolean>>
  setShowAboutModal: React.Dispatch<React.SetStateAction<boolean>>
  WindowsState: WindowsState
  setWindowsState: React.Dispatch<React.SetStateAction<WindowsState>>
  setCliTheme: React.Dispatch<React.SetStateAction<string>>
  cliTheme: string
  isWifiConnected: boolean
  setIsWifiConnected: React.Dispatch<React.SetStateAction<boolean>>
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sky-icon">
      <path
        d="M19 14.5A7.5 7.5 0 0 1 9.5 5a8.5 8.5 0 1 0 9.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sky-icon">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5V5.2M12 18.8v2.7M21.5 12h-2.7M5.2 12H2.5M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9M18.7 18.7l-1.9-1.9M7.2 7.2 5.3 5.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

const Nav: React.FC<NavProps> = ({
  setIsShutDown,
  setShowAboutModal,
  WindowsState,
  setWindowsState,
  setCliTheme,
  cliTheme,
  isWifiConnected,
  setIsWifiConnected,
}) => {
  const [mode, setMode] = useState<SkyMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'moon' ? 'moon' : 'sun'
  })

  const [activeDropdown, setActiveDropdown] = useState<DropdownName>(null)
  const [showCopiedToast, setShowCopiedToast] = useState(false)

  // Speed Test Simulator States
  const [speedTestState, setSpeedTestState] = useState<SpeedTestState>('idle')
  const [speedTestProgress, setSpeedTestProgress] = useState(0)
  const [speedTestResult, setSpeedTestResult] = useState(0)

  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.remove('theme-sun', 'theme-moon')
    document.body.classList.add(mode === 'sun' ? 'theme-sun' : 'theme-moon')
  }, [mode])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isWifiConnected) setSpeedTestState('idle')
  }, [isWifiConnected])

  const toggleDropdown = (menuName: NonNullable<DropdownName>) => {
    setActiveDropdown(prev => (prev === menuName ? null : menuName))
  }

  const handleCopy = (text: string) => {
    void navigator.clipboard.writeText(text)
    setActiveDropdown(null)
    setShowCopiedToast(true)
    setTimeout(() => setShowCopiedToast(false), 2000)
  }

  const runSpeedTest = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (speedTestState === 'running') return
    setSpeedTestState('running')
    setSpeedTestProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setSpeedTestProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setSpeedTestResult(Math.floor(Math.random() * 200) + 300)
        setSpeedTestState('done')
      }
    }, 150)
  }

  const updateSkyMode = (nextMode: SkyMode) => {
    setMode(nextMode)
    localStorage.setItem(STORAGE_KEY, nextMode)
    document.body.classList.remove('theme-sun', 'theme-moon')
    document.body.classList.add(nextMode === 'sun' ? 'theme-sun' : 'theme-moon')
    window.dispatchEvent(new CustomEvent('sky-mode-change', { detail: { mode: nextMode } }))
  }

  return (
    <div className="nav" ref={navRef}>
      {showCopiedToast && (
        <div className="copied-toast">Copied to clipboard! 📋</div>
      )}

      <div className="nav-left">
        {/* Apple Dropdown */}
        <div className="apple-menu-container">
          <div
            className={`apple-icon ${activeDropdown === 'apple' ? 'active-menu-label' : ''}`}
            onClick={() => toggleDropdown('apple')}
          >
            <img src="/nav-icons/apple.svg" alt="Apple" />
          </div>
          {activeDropdown === 'apple' && (
            <div className="apple-dropdown">
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); setShowAboutModal(true) }}>
                About This Portfolio
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); window.location.reload() }}>
                Restart...
              </div>
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); setIsShutDown(true) }}>
                Shut Down...
              </div>
            </div>
          )}
        </div>

        <div className="nav-item nav-name"><p>Pranav Arun</p></div>

        {/* File Dropdown */}
        <div className="menu-item-container">
          <div className={`nav-item nav-desktop-only ${activeDropdown === 'file' ? 'active-menu-label' : ''}`} onClick={() => toggleDropdown('file')}>
            <p>File</p>
          </div>
          {activeDropdown === 'file' && (
            <div className="apple-dropdown">
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); setWindowsState(prev => ({ ...prev, note: true })) }}>
                Open notes.txt
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); setWindowsState({ github: false, note: false, spotify: false, cli: false }) }}>
                Close All Windows
              </div>
            </div>
          )}
        </div>

        {/* Edit Dropdown */}
        <div className="menu-item-container">
          <div className={`nav-item nav-desktop-only ${activeDropdown === 'edit' ? 'active-menu-label' : ''}`} onClick={() => toggleDropdown('edit')}>
            <p>Edit</p>
          </div>
          {activeDropdown === 'edit' && (
            <div className="apple-dropdown">
              <div className="dropdown-item" onClick={() => handleCopy('pranavarun19@gmail.com')}>Copy Email Address</div>
              <div className="dropdown-item" onClick={() => handleCopy('https://www.linkedin.com/in/pranav-arun/')}>Copy LinkedIn URL</div>
            </div>
          )}
        </div>

        {/* Window Dropdown */}
        <div className="menu-item-container">
          <div className={`nav-item nav-desktop-only ${activeDropdown === 'window' ? 'active-menu-label' : ''}`} onClick={() => toggleDropdown('window')}>
            <p>Window</p>
          </div>
          {activeDropdown === 'window' && (
            <div className="apple-dropdown">
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); setWindowsState({ github: false, note: false, spotify: false, cli: false }) }}>
                Minimize All
              </div>
              <div className="dropdown-divider" />
              {(Object.keys(WindowsState) as (keyof WindowsState)[]).map((app) => (
                <div key={app} className="dropdown-item checkbox-item" onClick={() => { setActiveDropdown(null); setWindowsState(prev => ({ ...prev, [app]: !prev[app] })) }}>
                  <span className="checkbox-indicator">{WindowsState[app] ? '✓ ' : '  '}</span>
                  <span className="app-name-label">{app.charAt(0).toUpperCase() + app.slice(1)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terminal Dropdown */}
        <div className="menu-item-container">
          <div className={`nav-item nav-desktop-only ${activeDropdown === 'terminal' ? 'active-menu-label' : ''}`} onClick={() => toggleDropdown('terminal')}>
            <p>Terminal</p>
          </div>
          {activeDropdown === 'terminal' && (
            <div className="apple-dropdown">
              <div className="dropdown-item" onClick={() => { setActiveDropdown(null); setWindowsState(prev => ({ ...prev, cli: true })) }}>Open Terminal</div>
              <div className="dropdown-divider" />
              <div className="dropdown-header">Prompt Color</div>
              {[
                { label: 'Green', color: '#00ff00' },
                { label: 'Amber', color: '#ffb000' },
                { label: 'Cyan', color: '#00ffff' },
                { label: 'Red', color: '#ff3333' },
              ].map(({ label, color }) => (
                <div key={color} className="dropdown-item color-option-item" onClick={() => { setActiveDropdown(null); setCliTheme(color) }}>
                  <span className="color-dot" style={{ backgroundColor: color }} />
                  {label} {cliTheme === color && '✓'}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="nav-right">
        <div className="sky-toggle">
          <button
            onClick={() => updateSkyMode('moon')}
            className={`sky-btn${mode === 'moon' ? ' sky-btn--active' : ''}`}
            aria-label="Activate moon mode"
            title="Moonlight mode"
            type="button"
          >
            <MoonIcon />
            <span className="sky-btn-label">Moonlight</span>
          </button>
          <button
            onClick={() => updateSkyMode('sun')}
            className={`sky-btn${mode === 'sun' ? ' sky-btn--active' : ''}`}
            aria-label="Activate sun mode"
            title="Sunlit mode"
            type="button"
          >
            <SunIcon />
            <span className="sky-btn-label">Sunlit</span>
          </button>
        </div>

        {/* Wi-Fi Dropdown */}
        <div className="menu-item-container">
          <div
            className={`wifi-icon nav-desktop-only ${activeDropdown === 'wifi' ? 'active-menu-label' : ''}`}
            onClick={() => toggleDropdown('wifi')}
            style={{ cursor: 'pointer', padding: '3px 8px', borderRadius: '4px', opacity: isWifiConnected ? 1 : 0.4 }}
          >
            <img src="/nav-icons/wifi.svg" alt="WiFi" />
          </div>
          {activeDropdown === 'wifi' && (
            <div className="apple-dropdown wifi-dropdown" style={{ right: 0, left: 'auto', width: '220px' }}>
              <div className="dropdown-item wifi-toggle-row" onClick={() => setIsWifiConnected(!isWifiConnected)}>
                <span style={{ fontWeight: 'bold' }}>Wi-Fi</span>
                <span className={`toggle-switch ${isWifiConnected ? 'on' : 'off'}`}>
                  <span className="toggle-handle" />
                </span>
              </div>
              <div className="dropdown-divider" />
              {isWifiConnected ? (
                <>
                  <div className="dropdown-header">Known Networks</div>
                  {[
                    { name: 'toxicbishop-5G', connected: true },
                    { name: 'KSSEM-WiFi-Secure', connected: false },
                    { name: 'Starlink-Direct', connected: false },
                  ].map(({ name, connected }) => (
                    <div key={name} className={`dropdown-item network-item${connected ? ' connected' : ''}`}>
                      <span className="network-check">{connected ? '✓' : ''}</span>
                      <span className="network-name">{name}</span>
                      <span className="network-lock">🔒</span>
                    </div>
                  ))}
                  <div className="dropdown-divider" />
                  <div className="dropdown-item speed-test-btn" onClick={runSpeedTest}>
                    {speedTestState === 'idle' && 'Run Speed Test ⚡'}
                    {speedTestState === 'running' && `Testing... ${speedTestProgress}%`}
                    {speedTestState === 'done' && `Ping: 4ms | Download: ${speedTestResult} Mbps`}
                  </div>
                </>
              ) : (
                <div className="offline-placeholder">Wi-Fi is turned off.</div>
              )}
            </div>
          )}
        </div>

        <div className="nav-item nav-datetime">
          <DateTime />
        </div>
      </div>
    </div>
  )
}

export default Nav
