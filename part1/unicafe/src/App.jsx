import { useState } from 'react'

const Comentario = () => {
  return (
    <h2>Give feedback</h2>
  )
}

const Boton = ({name,onClick}) => {
  return(
    <button onClick={onClick}>{name}</button>
  )
}

const EstatLine = (props) => {
  return(
    <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Estat = ({good,neutral,bad}) => {
  const all = good + bad + neutral
  const average = (good-bad)/all
  const positive = (good/all)*100 
  if (good === 0 && bad ===0 && neutral ===0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
      <EstatLine name='good' value={good} />
      <EstatLine name='neutral' value={neutral} />
      <EstatLine name='bad' value={bad} />
      <EstatLine name='all' value={all} />
      <EstatLine name='average' value={average} />
      <EstatLine name='positive' value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () =>{
    setGood(good+1)
  }
  const handleClickNeutral= () =>{
    setNeutral(neutral+1)
  }
  const handleClickBad = () =>{
    setBad(bad+1)
  }


  return (
    <div>
      <div>
        <Comentario />
      </div>
      <div>
        <Boton name='Good' onClick={handleClickGood} />
        <Boton name='Neutral' onClick={handleClickNeutral} />
        <Boton name='Bad' onClick={handleClickBad} />
      </div>
      <div>
        <h2>statistics</h2>
        <Estat good={good} neutral={neutral} bad={bad} />
      </div>

    </div>
  )
} 

export default App