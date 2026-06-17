import React, { useRef } from 'react'
import './Dock.scss'

interface DockItem {
  key: string
  className: string
  src: string
  onClick?: () => void
  isLink?: boolean
  href?: string
}

interface DockProps {
  setWindowsState: React.Dispatch<React.SetStateAction<{
    github: boolean
    note: boolean
    spotify: boolean
    cli: boolean
  }>>
}

const Dock: React.FC<DockProps> = ({ setWindowsState }) => {
  const dockRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const dock = dockRef.current
    if (!dock) return
    const icons = dock.querySelectorAll<HTMLElement>('.dock-icon-wrap')
    const mouseX = e.clientX

    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect()
      const iconCenter = rect.left + rect.width / 2
      const distance = Math.abs(mouseX - iconCenter)
      const maxDist = 100

      if (distance < maxDist) {
        const scale = 1 + 0.55 * Math.cos((distance / maxDist) * (Math.PI / 2))
        const lift = -22 * Math.cos((distance / maxDist) * (Math.PI / 2))
        icon.style.transform = `scale(${scale}) translateY(${lift / scale}px)`
      } else {
        icon.style.transform = 'scale(1) translateY(0px)'
      }
    })
  }

  const handleMouseLeave = () => {
    const dock = dockRef.current
    if (!dock) return
    const icons = dock.querySelectorAll<HTMLElement>('.dock-icon-wrap')
    icons.forEach((icon) => {
      icon.style.transform = 'scale(1) translateY(0px)'
    })
  }

  const items: DockItem[] = [
    {
      key: 'github',
      className: 'github',
      src: '/doc-icons/github.svg',
      onClick: () => setWindowsState(prev => ({ ...prev, github: true })),
    },
    {
      key: 'calender',
      className: 'calender',
      src: '/doc-icons/calender.svg',
      onClick: () => window.open('https://calendar.google.com/calendar/u/0/r', '_blank'),
    },
    {
      key: 'linkedin',
      className: 'linkedin',
      src: '/doc-icons/linkedin.svg',
      onClick: () => window.open('https://www.linkedin.com/in/pranav-arun/', '_blank'),
    },
    {
      key: 'twitter',
      className: 'twitter',
      src: '/doc-icons/twitter.svg',
      isLink: true,
      href: 'https://x.com/Pranav63076884',
    },
    {
      key: 'instagram',
      className: 'instagram',
      src: '/doc-icons/instagram.svg',
      isLink: true,
      href: 'https://www.instagram.com/toxicbishop_/',
    },
    {
      key: 'note',
      className: 'note',
      src: '/doc-icons/note.svg',
      onClick: () => setWindowsState(prev => ({ ...prev, note: true })),
    },
    {
      key: 'mail',
      className: 'mail',
      src: '/doc-icons/mail.svg',
      isLink: true,
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=pranavarun19@gmail.com&su=Portfolio%20Contact&body=Hello%20I%20want%20to%20connect',
    },
    {
      key: 'spotify',
      className: 'spotify',
      src: '/doc-icons/spotify.svg',
      onClick: () => setWindowsState(prev => ({ ...prev, spotify: true })),
    },
    {
      key: 'cli',
      className: 'cli',
      src: '/doc-icons/cli.svg',
      onClick: () => setWindowsState(prev => ({ ...prev, cli: true })),
    },
  ]

  return (
    <footer
      className="dock"
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {items.map(({ key, className, src, onClick, isLink, href }) => {
        const inner = (
          <div className={`icon ${className}`}>
            <img src={src} alt={key} draggable={false} />
            <span className="dock-dot" />
          </div>
        )

        return (
          <div key={key} className="dock-icon-wrap">
            {isLink ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="icon-link">
                {inner}
              </a>
            ) : (
              <div onClick={onClick} className="icon-link">
                {inner}
              </div>
            )}
          </div>
        )
      })}
    </footer>
  )
}

export default Dock
