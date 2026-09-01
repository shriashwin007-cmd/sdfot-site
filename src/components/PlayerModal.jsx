import { useEffect } from 'react'
import PlayerAvatar from './PlayerAvatar'
import './PlayerModal.css'

export default function PlayerModal({ player, onClose }) {
  useEffect(() => {
    if (!player) return

    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [player, onClose])

  if (!player) return null

  const rows = [
    { label: 'District', value: player.district },
    { label: 'Age Group', value: player.age },
    { label: 'Preference', value: player.preference },
    { label: 'Batting Arm', value: player.battingArm },
    { label: 'Bowling Arm', value: player.bowlingArm },
  ]

  return (
    <div className="player-modal-backdrop" onClick={onClose}>
      <div className="player-modal" onClick={(e) => e.stopPropagation()}>
        <button className="player-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="player-modal-photo">
          <PlayerAvatar name={player.name} photoId={player.photoId} size="detail" />
        </div>

        <div className="player-modal-body">
          <p className="player-modal-eyebrow">SDFOT Registered Player</p>
          <h2 className="player-modal-name">{player.name}</h2>

          <dl className="player-modal-facts">
            {rows.map(
              (r) =>
                r.value && (
                  <div className="player-modal-fact" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                )
            )}
          </dl>
        </div>
      </div>
    </div>
  )
}
