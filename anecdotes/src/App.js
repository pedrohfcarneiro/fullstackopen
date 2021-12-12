import React, { useState } from 'react'

const Button = (props) => {
    return(
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const MostVotedAnecdote = (props) => {
    let votesValues = Object.values(props.votes)
    let biggerValue = Math.max(...votesValues)
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    console.log(findDuplicates(votesValues))
    if(biggerValue === 0) {
        return(
            <p>No Votes</p>
        )
    }
    return(
        <div>
            {props.anecdotes[Object.keys(props.votes).find(key => props.votes[key] === biggerValue)]}
        </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  
  const [votes, setVotes] = useState({
        0 : 0,
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0,
        5 : 0,
        6 : 0,
  })

  const [mostVoted, setMostVoted] = useState(0)

  const nextAnecdote = (anecdotesProp) => {
    const functionToReference = () => {
        let r = Math.floor(Math.random() * ((anecdotesProp.length-1) - 0 + 1) + 0)
        console.log(Object.keys(votes)[selected])
        setSelected(r)
    }
    return functionToReference
  }

  const voteForAnecdote = (anecdoteIndex) => {
    return () => {
        console.log("entrou na função de voto")
        const newVotes = {
            ...votes,
            [anecdoteIndex] : votes[anecdoteIndex] + 1
        }

        setVotes(newVotes)
    }
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick = {nextAnecdote(anecdotes)} text='next anecdote' />
      <Button handleClick = {voteForAnecdote(selected)} text='vote' />
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote votes = {votes} anecdotes = {anecdotes} />
    </div>
  )
}

export default App