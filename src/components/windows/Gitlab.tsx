import React, { useState, useEffect } from 'react'
import MacWindow from './MacWindow'
import './Github.scss'

// ✏️ Put your GitLab project names here in the order you want them to appear
const FEATURED_PROJECTS: string[] = []

const GITLAB_USERNAME = 'toxicbishop'

interface GitLabProject {
  id: number
  name: string
  path_with_namespace: string
  description: string | null
  web_url: string
  topics: string[]
  language: string | null
  readme_url: string | null
  avatar_url: string | null
  namespace: {
    avatar_url: string | null
  }
}

interface GitLabCardProps {
  data: GitLabProject
}

const GitLabCard: React.FC<GitLabCardProps> = ({ data }) => {
  const coverUrl = `https://gitlab.com/${data.path_with_namespace}/raw/HEAD/cover.png`
  const fallbackUrl =
    data.avatar_url ||
    data.namespace?.avatar_url ||
    `https://gitlab.com/uploads/-/system/user/avatar/default.png`

  const [imgSrc, setImgSrc] = useState(coverUrl)

  const tags: string[] = []
  if (data.language) tags.push(data.language)
  if (data.topics && Array.isArray(data.topics)) tags.push(...data.topics)

  return (
    <div className="card">
      <img
        src={imgSrc}
        alt={`${data.name} cover`}
        style={{ width: '100%', borderRadius: '1rem', aspectRatio: '1200/630', objectFit: 'cover' }}
        onError={() => setImgSrc(fallbackUrl)}
      />
      <h1>{data.name}</h1>
      <p className="description">{data.description || 'No description provided.'}</p>
      <div className="tags">
        {tags.slice(0, 4).map((tag, index) => (
          <p key={index} className="tag">{tag}</p>
        ))}
      </div>
      <div className="urls">
        <a href={data.web_url} target="_blank" rel="noopener noreferrer">Repository</a>
      </div>
    </div>
  )
}

interface GitlabProps {
  windowName: string
  setWindowsState: React.Dispatch<React.SetStateAction<{
    github: boolean
    gitlab: boolean
    note: boolean
    spotify: boolean
    cli: boolean
  }>>
  isWifiConnected: boolean
}

const Gitlab: React.FC<GitlabProps> = ({ windowName, setWindowsState, isWifiConnected }) => {
  const [projects, setProjects] = useState<GitLabProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isWifiConnected) return
    fetch(
      `https://gitlab.com/api/v4/users/${GITLAB_USERNAME}/projects?order_by=updated_at&sort=desc&per_page=30&visibility=public`
    )
      .then(res => res.json())
      .then((data: GitLabProject[]) => {
        if (!Array.isArray(data)) { setProjects([]); setLoading(false); return }

        const featured = FEATURED_PROJECTS.length > 0
          ? FEATURED_PROJECTS
              .map(name => data.find(r => r.name === name))
              .filter((r): r is GitLabProject => Boolean(r))
          : []

        const others = data.filter(r => !FEATURED_PROJECTS.includes(r.name))
        setProjects([...featured, ...others])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [isWifiConnected])

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div
        className="cards"
        style={{
          display: !isWifiConnected ? 'flex' : 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minHeight: '300px',
        }}
      >
        {!isWifiConnected ? (
          <div
            className="github-offline-screen"
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: '2rem' }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '48px', height: '48px', margin: '0 auto 1rem', color: 'rgba(255, 255, 255, 0.3)' }}
            >
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.5" />
              <path d="M5 12.5a10.9 10.9 0 0 1 5.83-2.84" />
              <path d="M8.66 16.14A7 7 0 0 1 12 15a7 7 0 0 1 3.34 1.14" />
              <path d="M10.5 19.5a2.12 2.12 0 0 1 3 0" />
            </svg>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              Connection Lost
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', maxWidth: '280px', margin: '0 auto', lineHeight: '1.4' }}>
              GitLab API requires an active network connection. Reconnect to Wi-Fi to load projects.
            </p>
          </div>
        ) : (
          <>
            {loading && (
              <div style={{ color: 'white', padding: '2rem', textAlign: 'center', width: '100%' }}>
                Fetching projects from GitLab...
              </div>
            )}
            {!loading && projects.length === 0 && (
              <div style={{ color: 'white', padding: '2rem', textAlign: 'center', width: '100%' }}>
                No public projects found or API rate limit exceeded.
              </div>
            )}
            {!loading && projects.map(project => (
              <GitLabCard key={project.id} data={project} />
            ))}
          </>
        )}
      </div>
    </MacWindow>
  )
}

export default Gitlab
