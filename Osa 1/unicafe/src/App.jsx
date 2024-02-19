import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <div>
      <strong>Give feedback</strong>
      <div style={{ marginBottom: '10px' }}></div>
    </div>

    <div>
      <Button text ="Good" onClick={() => setGood(good + 1)}/>
      <Button text ="Neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text ="Bad" onClick={() => setBad(bad + 1)}/>
    </div>

    
    <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
      <strong>Statistics</strong>
    </div>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    </>
  )
}

const Button = ({ text, onClick }) => {
  return (
  <button onClick={onClick}>
    {text}
  </button>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
    <div>
      No feedback given
    </div>
    )
  }
  return (
    <>
    <div>
      <StatisticLine text="Good" value ={good} />
      <StatisticLine text="Neutral" value ={neutral} />
      <StatisticLine text="Bad" value ={bad} />
    </div>
    <div>
      <StatisticLine text="Total" value={good + neutral + bad} />
      <StatisticLine text="Average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text="Positive" value={good / (good + neutral + bad) * 100} />
    </div>
    </>
  )
}

//Prosenttimerkin käytön formatointi koodissa lyhyemmin chatGPT:n avulla
const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text === "Positive" ? `${text}: ${value}%` : `${text}: ${value}`}
    </div>
  );
};


export default App