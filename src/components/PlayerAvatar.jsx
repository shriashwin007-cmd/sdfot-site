import { useState } from 'react'
import './PlayerAvatar.css'

const PALETTE = ['#ff9933', '#138808', '#ffffff']

function initialsOf(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function hashColor(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}

export default function PlayerAvatar({ name, photoId, size = 'card' }) {
  const [failed, setFailed] = useState(false)
  const accent = hashColor(name || '?')
  const src = photoId ? `https://drive.google.com/thumbnail?id=${photoId}&sz=w${size === 'detail' ? 800 : 400}` : null

  return (
    <div className={`player-avatar player-avatar--${size} player-avatar--fallback`} style={{ '--avatar-accent': accent }}>
      <span>{initialsOf(name)}</span>
      {src && !failed && (
        <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  )
}
