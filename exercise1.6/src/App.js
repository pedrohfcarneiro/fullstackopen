import React, { useState } from 'react'

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Statistics = props => {
    console.log(props)
    const array = props.statisticsArray
    return (
        <div>
            <p>good {array[0]}</p>
            <p>neutral {array[1]}</p>
            <p>bad {array[2]}</p>
        </div>
    )
}

const Button = (props) => {
    return(
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statisticsArrayProps = [good, neutral, bad]

  return (
    <div>
      <Header name='Give Feedback' />
      <Button handleClick= {() => setGood(good+1)} text='good' />
      <Button handleClick= {() => setNeutral(neutral+1)} text='neutral' />
      <Button handleClick= {() => setBad(bad+1)} text='bad' />
      <Header name='Statistics' />
      <Statistics statisticsArray={statisticsArrayProps} />
    </div>
  )
}

export default App