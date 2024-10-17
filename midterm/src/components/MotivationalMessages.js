const MotivationalMessages = () => {
  const messages = [
    'Tick-tock! Time’s slipping away, and your tasks aren’t done yet! Get moving!',
    'Remember that task you said you’d do? It’s still waiting… 😬',
    'Procrastination called—it’s wondering if you’re still friends.',
    'The clock is ticking... your tasks aren’t gonna finish themselves!',
    'Imagine how good it’ll feel when this is finally done… Or just keep dreading it!',
    'Hey! You’ve been scrolling long enough—time to tackle that to-do list!',
    'Your future self is either celebrating or panicking—what’s it gonna be?',
    'I see you’ve been avoiding this task. Guess what? It’s still here. 😏',
    'Your to-do list is silently judging you right now… better fix that!',
    'Your to-do list is starting to feel neglected. Maybe show it some love?',
  ]

  const getRandomMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return {getRandomMessage}
}

export default MotivationalMessages