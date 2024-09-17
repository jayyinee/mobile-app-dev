import { useState } from 'react'
import Button from '../components/Button'
import './styles.css'
// you might come across the use of useState() like this in the wild
// import React from 'react'
// React.useState()
// this is the library we installed, we are impirting the favorite.svg as a react component
//RENamed to heart
import { ReactComponent as Heart } from '@material-design-icons/svg/filled/favorite.svg'

export default function UserRating(props) {
  const [count, setCount] = useState(0)
  const handlePlusClick = () => {
    if (count < 5) {
      setCount(count + 1)
    }
    return
  }

  const handleMinusClick = () => {
    if (count > 0) {
      setCount(count - 1)
    }
    return
  }

  return (
    <div className="button_container">
      <div className="minus_button">
        {count > 0 && (
          <Button primary outline rounded onClick={handleMinusClick} className="button">
            [-]
          </Button>
        )}
      </div>
      <span className="hearts">
        {/* {count} */}
        {[...Array(count)].map((heart, i) => {
          return (
            <span key="u">
              <Heart />
            </span>
          )
        })}
      </span>
      <div className="plus_button">
        {count < 5 && (
          <Button primary outline rounded onClick={handlePlusClick} className="button">
            [+]
          </Button>
        )}
      </div>
    </div>
  )
}
