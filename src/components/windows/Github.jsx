import React, { useState, useEffect } from 'react'
import MacWindow from './MacWindow'
import "./Github.scss"

// ✏️ Put your repo names here in the order you want them to appear
const FEATURED_REPOS = [
    'Chain-of-Thought',
    'DSA-with-tsx',
    'Crypt-Vault',
    'Student-GUI-With-SQL',
    'VITAL-Health-App-Flutter',
    'KSSEM-College-ERP-System'
];

const GITHUB_USERNAME = 'toxicbishop';

const GitCard = ({ data }) => {
    const [imgSrc, setImgSrc] = useState(
        `https://opengraph.githubassets.com/1/${data.full_name}`
    );

    const tags = [];
    if (data.language) tags.push(data.language);
    if (data.topics && Array.isArray(data.topics)) {
        tags.push(...data.topics);
    }

    return (
        <div className="card">
            <img
                src={imgSrc}
                alt={`${data.name} cover`}
                style={{ width: "100%", borderRadius: "1rem", aspectRatio: "1200/630", objectFit: "cover" }}
                onError={() => setImgSrc(data.owner?.avatar_url)}
            />
            <h1>{data.name}</h1>
            <p className='description'>{data.description || "No description provided."}</p>
            <div className="tags">
                {tags.slice(0, 4).map((tag, index) => (
                    <p key={index} className='tag'>{tag}</p>
                ))}
            </div>
            <div className="urls">
                <a href={data.html_url} target="_blank" rel="noopener noreferrer">Repository</a>
                {data.homepage && data.homepage !== "" && (
                    <a href={data.homepage} target="_blank" rel="noopener noreferrer">Demo link</a>
                )}
            </div>
        </div>
    );
};


const Github = ({ windowName, setWindowsState, isWifiConnected }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isWifiConnected) return; // don't fetch if offline
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) { setRepos([]); setLoading(false); return; }

                // Sort: FEATURED_REPOS first (in your defined order), then the rest
                const featured = FEATURED_REPOS
                     .map(name => data.find(r => r.name === name))
                     .filter(Boolean);

                const others = data.filter(r => !FEATURED_REPOS.includes(r.name));

                setRepos([...featured, ...others]);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [isWifiConnected]);

    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
            <div className="cards" style={{ display: !isWifiConnected ? 'flex' : 'grid', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '300px' }}>
                {!isWifiConnected ? (
                    <div className="github-offline-screen" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: '2rem' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', margin: '0 auto 1rem', color: 'rgba(255, 255, 255, 0.3)' }}>
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.5" />
                            <path d="M5 12.5a10.9 10.9 0 0 1 5.83-2.84" />
                            <path d="M8.66 16.14A7 7 0 0 1 12 15a7 7 0 0 1 3.34 1.14" />
                            <path d="M10.5 19.5a2.12 2.12 0 0 1 3 0" />
                        </svg>
                        <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Connection Lost</h3>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', maxWidth: '280px', margin: '0 auto', lineHeight: '1.4' }}>
                            GitHub API requires an active network connection. Reconnect to Wi-Fi to load repositories.
                        </p>
                    </div>
                ) : (
                    <>
                        {loading && (
                            <div style={{ color: "white", padding: "2rem", textAlign: "center", width: "100%" }}>
                                Fetching repositories from GitHub...
                            </div>
                        )}

                        {!loading && repos.length === 0 && (
                            <div style={{ color: "white", padding: "2rem", textAlign: "center", width: "100%" }}>
                                No repositories found or API rate limit exceeded.
                            </div>
                        )}

                        {!loading && repos.map(project => (
                            <GitCard key={project.id} data={project} />
                        ))}
                    </>
                )}
            </div>
        </MacWindow>
    );
};

export default Github;