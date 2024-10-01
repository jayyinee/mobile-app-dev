import ReactDOM from 'react-dom'
import { useEffect } from 'react'

export default function Modal(props) {
  const { onClose, children, actionBar } = props
  
  /*
  useEffect (() => {}, [])
  - this is the useEffect hook from React
  - useEffect forces every time the component is mounted/aka created in the dom
  - the first argument is an arrow function that we want to fire
  - the second argument is an array of piece if state we want to watch for a change, when they change, useEffect's arrow function fires
  - if you only want it to fire when it's cteated, the second argument is and empty array []
  */
  useEffect(() => {
    //disablle scrolling when the modal is open on mount/creation
    document.body.classList.add('overflow-hidden')
    /* useEffect() can also take a callback function:
    if you return a fucntion here, it will fire whn the component is destroyed or updated
    aka our close modal action
    */
    return () => {document.body.classList.remove('overflow-hidden')}
  }, [])
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-300 opacity-50"
      ></div>
      {/* Modal BG */}
      <div className="absolute inset-40 p-10 bg-white">
        {/* Modal Content */}
        <div className="flex flex-col justify-between h-full">
          <div>{children}</div>
          {/* Action Bar */}
          <div className="flex flex-row justify-end">{actionBar}</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

// extra HW: but an X on top of the modal content