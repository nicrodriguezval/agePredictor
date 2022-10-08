import { useState } from 'react'

import Input from './components/input/Input'
import Button from './components/button/Button'

import './App.css'

function App() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [ages, setAges] = useState([])

  const onInputCountryChange = (e) => setCountry(e.target.value)

  const onInputNameChange = (e) => setName(e.target.value)

  const onsubmitInfo = (e) => {
    e.preventDefault()

    // regex to determine an array of the names introduced as input
    const names = name.split(/\,\s*/)

    let params = ''

    if (names.length === 1) params = `name=${names[0]}`
    else
      names.forEach((value, index) => {
        params += `${index > 0 ? '&' : ''}name[]=${value}`
      })

    if (country) params += `&country_id=${country}`

    console.log(params)

    const api = 'https://api.agify.io/'

    console.log(`${api}?${params}`)

    fetch(`${api}?${params}`)
      .then((res) => res.json())
      .then((data) => {
        const dataArr = !Array.isArray(data) ? [data] : data
        setAges(dataArr.map((value) => value.age))
      })
  }

  return (
    <main>
      <label htmlFor="country-input">Country ID</label>
      <div className="user-info">
        <Input
          id="country-input"
          placeholder="CO"
          onInputChange={onInputCountryChange}
        ></Input>
      </div>
      <label htmlFor="name-input">Name(s)</label>
      <div className="user-info">
        <Input
          id='name-input'
          placeholder="Juan, carlos, ..."
          onInputChange={onInputNameChange}
        />
        <h1>Age(s): {ages.join(', ')}</h1>
      </div>
      <Button text="Get age(s)" handleClick={onsubmitInfo} />
    </main>
  )
}

export default App
