import { useState, useEffect } from 'react'
import Toast from '../components/Toast'

export default function ToastPage() {
  const [toastVisible, setToastVisible] = useState(false)
  const [message] = useState('Hello there! Welcome to the page!')

  useEffect(() => {
    setToastVisible(true)
  }, [])

  // Function to close the toast
  const closeToast = () => {
    setToastVisible(false)
  }

  return (
    <div className="p-10">
      {toastVisible && <Toast message={message} onClose={closeToast} />}
    </div>
  )
}
