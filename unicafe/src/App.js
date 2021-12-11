import React, { useState } from 'react'

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const StatisticLine = ({statisticName,value}) => {
    if(statisticName === 'positive') {
        return(
            <>
            <td>{statisticName}</td>
            <td>{value} %</td>
            </>
        )
    }
    return(
        <>
            <td>{statisticName}</td>
            <td>{value}</td>
        </>
    )
}



const Statistics = props => {
    let [good, neutral, bad] = props.statisticsArray
    let all = good + neutral + bad
    let avarage = (good - bad)/all
    let positive = (good/all)*100
    if(all === 0){
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <table>   
                    <tbody>
                        <tr>
                            <StatisticLine statisticName='good' value={good} />
                        </tr>
                        <tr>
                            <StatisticLine statisticName='neutral' value={neutral} />
                        </tr>
                        <tr>
                            <StatisticLine statisticName='bad' value={bad} />
                        </tr>
                        <tr>
                            <StatisticLine statisticName='all' value={all} />
                        </tr>
                        <tr>
                            <StatisticLine statisticName='avarage' value={avarage} />
                        </tr>
                        <tr>
                            <StatisticLine statisticName='positive' value={positive} />
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
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