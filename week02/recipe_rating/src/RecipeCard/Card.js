import React from 'react'
import './styles.css'
// Hmmm. This looks like a reusable UI component...
// Let's discuss next class
export default function Card(props) {
  return <div className="card">{props.children}</div>
}
