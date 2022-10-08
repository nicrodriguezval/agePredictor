import { useState } from 'react'

import Input from './components/input/Input'
import Button from './components/button/Button'
import './App.css'

function App() {
  const [name, setName] = useState()
  const [age, setAge] = useState()

  const onInputChange = (e) => setName(e.target.value)

  const onsubmitInfo = (e) => {
    e.preventDefault()

    const api = 'https://api.agify.io'

    fetch(`${api}?name=${name}`)
      .then((res) => res.json())
      .then(({ age }) => setAge(age))
  }

  return (
    <main>
      {age && <h1>Age: {age}</h1>}
      <Input placeholder="Name" onInputChange={onInputChange} />
      <Button text="Get age" handleClick={onsubmitInfo} />
    </main>
  )
}

export default App
