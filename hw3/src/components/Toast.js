import ReactDOM from 'react-dom'
import { IoClose } from 'react-icons/io5'

export default function Toast(props) {
  const { message, onClose } = props

  return ReactDOM.createPortal(
    <div className="fixed top-5 right-5 bg-zinc-100 text-black pl-3 pr-8 pt-4 pb-3 rounded shadow-lg">
      <span>{message}</span>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-500 hover:text-black"
      >
        <IoClose />
      </button>
    </div>,
    document.getElementById('portal')
  )
}
