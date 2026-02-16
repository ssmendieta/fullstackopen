import { useState } from 'react'

const App = () =>{
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [select, setSelect] = useState(0)
  const [votes,setVote] = useState(Array(anecdotes.length).fill(0))
  const maximo = votes.indexOf(Math.max(...votes))

  const hadleclickNext = () =>{
    const aleatorio = Math.floor(Math.random() * anecdotes.length)
    setSelect(aleatorio)
    console.log(aleatorio)
  }

  const handleClickVote = () =>{
    const copy = [...votes]
    copy[select] += 1
    setVote(copy)
    console.log(copy)
  }

  return(
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[select]}</p> 
      <p>has {votes[select]} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={hadleclickNext}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maximo]}
      </p>
    </div>
  )
}

export default App