import React from 'react'
import './app.scss'
import { useState } from 'react'
import ParticleBg from './components/ParticleBg'
import Dock from './components/Dock.jsx'
import Nav from './components/Nav.jsx'
import Morphtext from './components/Morphtext.jsx'
import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'

const App = () => {

    const [WindowsState, setWindowsState] = useState({
        github: false,
        note: false,
        spotify: false,
        cli: false
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="power-icon">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                            <line x1="12" y1="2" x2="12" y2="12" />
                        </svg>
                        <span>Power On</span>
                    </button>
                </div>
            ) : (
                <>
                    <div className="shader-bg">
                        <div className="shader-stripes"></div>
                        <div className="shader-overlay"></div>
                    </div>
                    <ParticleBg />
                    {/* Hero Section */}
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
        
                    {WindowsState.github && <Github windowName='GitHub' setWindowsState={setWindowsState} isWifiConnected={isWifiConnected} />}
                    {WindowsState.note && <Note windowName='Note' setWindowsState={setWindowsState} />}
                    {WindowsState.spotify && <Spotify windowName='Spotify' setWindowsState={setWindowsState} isWifiConnected={isWifiConnected} />}
                    {WindowsState.cli && <Cli windowName='CLI' setWindowsState={setWindowsState} cliTheme={cliTheme} />}

                    {/* About This Mac Modal */}
                    {showAboutModal && (
                        <div className="about-modal-overlay" onClick={() => setShowAboutModal(false)}>
                            <div className="about-modal" onClick={(e) => e.stopPropagation()}>
                                <div className="about-modal-close" onClick={() => setShowAboutModal(false)}></div>
                                <img src="/favicon.svg" alt="toxicbishop logo" className="about-logo" />
                                <h2>toxicbishop OS</h2>
                                <p className="version">Version 1.0.0 (React 19)</p>
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