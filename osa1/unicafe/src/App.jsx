import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <table>
        <tbody>
          <tr><th>statistics</th></tr>
          <tr><td>No feedback given</td></tr>
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value ={props.good}/>
        <StatisticsLine text='neutral' value ={props.neutral}/>
        <StatisticsLine text='bad' value ={props.bad}/>
        <StatisticsLine text='all' value ={props.all}/>
        <StatisticsLine text='average' value ={props.total / props.all}/>
        <StatisticsLine text='positive' value ={props.good / props.all * 100 + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [total, setTotal] = useState(0)

  const setNewTotal = newTotal => {
    console.log('total now', newTotal)
    setTotal(newTotal)
  }

  const setNewAll = newAll => {
    console.log('all now', newAll)
    setAll(newAll)
  }

  const setToGood = newValue => {
    console.log('good now', newValue)
    setGood(newValue)
    setNewAll(all+1)
    setNewTotal(total+1)
  }

  const setToNeutral = newValue => {
    console.log('neutral now', newValue)
    setNeutral(newValue)
    setNewAll(all+1)
  }

  const setToBad = newValue => {
    console.log('bad now', newValue)
    setBad(newValue)
    setAll(all+1)
    setNewTotal(total-1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} total={total}/>
    </div>
  )
}

export default App