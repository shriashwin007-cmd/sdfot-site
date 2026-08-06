import { useRef } from 'react'
import { useTilt } from '../lib/useTilt'

export default function TiltCard({ as: Tag = 'div', className = '', children, style, max, ...props }) {
  const ref = useRef(null)
  useTilt(ref, max !== undefined ? { max } : undefined)

  return (
    <Tag ref={ref} className={className} style={style} {...props}>
      {children}
    </Tag>
  )
}
