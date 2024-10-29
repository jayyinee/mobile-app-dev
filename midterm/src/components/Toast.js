import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import '../styles.css'

export default function Toast(props) {
  const {message, onClose} = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 1000 * 10)

    return () => clearTimeout(timer)
  }, [onClose])

  return ReactDOM.createPortal(
    <div class="toast-container">
      <span class="toast-message">{message}</span>
      <button onClick={onClose} class="toast-close-button">
        &#x2715;
      </button>
    </div>,
    document.getElementById('portal')
  )
}
