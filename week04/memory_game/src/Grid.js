import { useEffect, useState } from 'react'
import cx from 'classnames'

import CardPattern from './assets/moroccan-flower-dark.png'
import Bilbo from './assets/bilbo-baggins.png'
import Cameron from './assets/cameron-poe.png'
import Nikki from './assets/nikki-cage.png'
import Pollux from './assets/pollux-troy.png'

import styles from './UI.module.css'

const cardImages = [
  { src: Bilbo, matched: false },
  { src: Cameron, matched: false },
  { src: Nikki, matched: false },
  { src: Pollux, matched: false },
]

export default function Grid() {
  // state to store our deck of cards
  const [cards, setCards] = useState([])
  //state to keeep track of our turns
  const [turns, setTurns] = useState(0)
  //keep track of our choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  
  useEffect(() => {
    // this is where we compare!
    // first lets make sure we have both choices
    if (choiceOne && choiceTwo) {
      // if they both exist we can compare src values to see if they match!
      if (choiceOne.src === choiceTwo.src) {
        // we have an array of all of our shuffled cards inside cards
        // we will map the matched cards to a new array
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              console.log('those cards match')
              // spread out card properties and set matched to true
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        // now lets reset our turn with the function below
        resetTurn()
      } else {
        console.log('those cards do not match')
        // NEW EEK when they dont match the flipped class gets removed almost instantly
        // lets add a 1 second timeout using setTimeout
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // a function to double our cards (so each has a duplicate)
  // and then shuffle the deck ... and deal them on the screen
  const shuffleCards = () => {
    // spread our img array 2x so we have aan array with duplicates to shuffle
    const shuffledCards = [...cardImages, ...cardImages]
      // add a sort function which fires a function for each item in our new array
      // when a random number is negative, leave the item where it is
      // if it's positive, swap with another random item to shuffle
      .sort(() => Math.random() - 0.5)
      // add a mapping fucntion to add an ID to each img object
      // first we spread the current properties and then add a new one at the end
      .map((card) => ({ ...card, id: Math.random() }))

    // use our setter from useState to add our new array of doubled, shuffled objects with unique id propety added to each
    setCards(shuffledCards)
    // reset our turns to 0
    setTurns(0)
  }

  console.log(cards)

  const handleChoice = (card) => {
    console.log(card)
    // check if we have a choice one
    // if we don't have a choiceOne set, make the current card choiceOne
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  return (
    <>
      <button onClick={shuffleCards}>New Game</button>
      {turns}
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Card
              key={card.id}
              img={card.src}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}

          {cards.map((card) => (
            <Card key={card.id} img={card.src} />
          ))}
        </div>
      </div>
      <div>Turn: {turns}</div>
    </>
  )
}

function Card(props) {
  const [card, handleChoice, flipped] = props

  const handleClick = (event) => {
    // toggle active state on click
    handleChoice(card)
  }

  return (
    <div className={styles.flip_card}>
      <div
        onClick={handleClick}
        className={cx(styles.flip_card_inner, { [styles.flipped]: flipped })}
      >
        <div className={styles.flip_card_front}>
          <img src={CardPattern} alt="card back" />
        </div>
        <div className={styles.flip_card_back}>
          <img src={card.src} alt="card front" />
        </div>
      </div>
    </div>
  )
}