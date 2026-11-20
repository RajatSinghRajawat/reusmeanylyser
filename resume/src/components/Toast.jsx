import { useEffect } from 'react'
import { IconCheckCircle2, IconAlertCircle, IconX } from './Icons'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div className={`toast-notification toast-notification--${type} fade-in`}>
      <div className="toast-notification__content">
        {type === 'success' ? (
          <IconCheckCircle2 size={18} className="toast-notification__icon toast-notification__icon--success" />
        ) : (
          <IconAlertCircle size={18} className="toast-notification__icon toast-notification__icon--error" />
        )}
        <span className="toast-notification__message">{message}</span>
      </div>
      <button type="button" className="toast-notification__close" onClick={onClose} aria-label="Close notification">
        <IconX size={14} />
      </button>
    </div>
  )
}
