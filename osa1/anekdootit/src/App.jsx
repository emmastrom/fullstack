import { useState, useEffect } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes = (props) => {
  return (
    <table>
      <tbody>
        <tr><td>has {props.votes} votes</td></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const random = () => {
    return Math.floor(Math.random() * 7)
  }

  const [allPoints, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const setPointValue = (selected) => {
    const copy = [...allPoints]
    copy[selected] += 1
    setPoints(copy)
  }

  const max = Math.max(...allPoints)
  console.log(max)

  const maxIndex = allPoints.indexOf(max)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Votes votes={allPoints[selected]} />
      <p></p>
      <Button handleClick={() => setPointValue(selected)} text='vote' />
      <Button handleClick={() => setSelected(random)} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <Votes votes={max} />
    </div>
  )
}

export default App