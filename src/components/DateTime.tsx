import React, { useState, useEffect } from 'react'
import './DateTime.scss'

// We keep a tiny CSS file for the nav font styling
// Create src/components/DateTime.scss if missing (empty fallback is fine)

const DateTime: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const formatted = now
        .toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .replace(/,/g, '')
        .replace(/\s+/g, ' ')
      setDateTime(formatted)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ textTransform: 'none' }}>
      {dateTime}
    </div>
  )
}

export default DateTime
