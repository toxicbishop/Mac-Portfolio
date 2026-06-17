import React from 'react'
import MacWindow from './MacWindow'
import './spotify.scss'

interface SpotifyProps {
  setWindowsState: React.Dispatch<React.SetStateAction<{
    github: boolean
    note: boolean
    spotify: boolean
    cli: boolean
  }>>
  windowName: string
  isWifiConnected: boolean
}

const Spotify: React.FC<SpotifyProps> = ({ setWindowsState, windowName, isWifiConnected }) => {
  return (
    <MacWindow setWindowsState={setWindowsState} windowName={windowName} width="30vw">
      <div className="spotify-window">
        <div className="spotify-header">
          <div className="profile-info">
            <svg viewBox="0 0 24 24" fill="currentColor" className="spotify-icon">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.746-.47-.077-.337.135-.67.47-.747 3.856-.88 7.15-.508 9.822 1.13.295.18.387.563.206.862zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.41.107-.847.52-.972 3.676-1.116 8.243-.574 11.35 1.34.368.225.487.705.26 1.074zm.106-2.833C14.384 8.78 8.563 8.588 5.183 9.613c-.53.16-1.09-.142-1.25-.672-.16-.53.143-1.09.672-1.25 3.882-1.178 10.31-.955 14.373 1.458.477.283.633.9.35 1.377-.282.478-.9.634-1.377.35z" />
            </svg>
            <div className="user-text">
              <span className="profile-label">Spotify Profile</span>
              <span className="username">toxicbishop</span>
            </div>
          </div>
          <a
            href="https://open.spotify.com/user/qu919vbtsdzeq2zncni7ahcnx?si=8e203c39147d429e"
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-btn"
          >
            Follow
          </a>
        </div>

        {!isWifiConnected ? (
          <div className="spotify-offline-screen">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="offline-icon"
            >
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.5" />
              <path d="M5 12.5a10.9 10.9 0 0 1 5.83-2.84" />
              <path d="M8.66 16.14A7 7 0 0 1 12 15a7 7 0 0 1 3.34 1.14" />
              <path d="M10.5 19.5a2.12 2.12 0 0 1 3 0" />
            </svg>
            <h3>Unable to connect</h3>
            <p>Please check your internet connection and try again.</p>
          </div>
        ) : (
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3n0Aus?utm_source=generator"
            width="100%"
            height="320"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          />
        )}
      </div>
    </MacWindow>
  )
}

export default Spotify
