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

    const api = 'https://api.agify.io/'

    // regex to determine an array of the names introduced as input
    const names = name.split(/\,\s*/)

    let params = ''

    // params formating
    if (names.length === 1) params = `name=${names[0]}`
    else
      names.forEach((value, index) => {
        params += `${index > 0 ? '&' : ''}name[]=${value}`
      })

    if (country) params += `&country_id=${country}`

    fetch(`${api}?${params}`)
      .then((res) => res.json())
      .then((data) => {
        const dataArr = !Array.isArray(data) ? [data] : data
        setAges(dataArr.map((value) => value.age))
      })
  }

  return (
    <main>
      <h1 className="main-title u-bottom-margin-sm">Age predictor</h1>
      <label htmlFor="country-input">Country ID</label>
        <Input
          id="country-input"
          placeholder="CO"
          onInputChange={onInputCountryChange}
        ></Input>
      <label htmlFor="name-input">Name(s)</label>
      <div className="user-info u-bottom-margin-sm">
        <Input
          id='name-input'
          placeholder="Juan, Carlos, ..."
          onInputChange={onInputNameChange}
        />
        <h1 className="u-color-primary">Age(s): {ages.join(', ')}</h1>
      </div>
      <Button text="Get age(s)" handleClick={onsubmitInfo} />
    </main>
  )
}

export default App
