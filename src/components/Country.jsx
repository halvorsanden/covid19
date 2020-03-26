import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import Loading from './Loading.jsx'

// Experimental, can probably be changed to input at some time to feature other countries

const endpointCurrent =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/countries/norway'

const endpointHistorical =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/historical/norway'


function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const Country = () => {
  const [current, setCurrent] = useState([])
  const [isLoadingC, setIsLoadingC] = useState(false)
  const [errorC, setErrorC] = useState(false)
  const [historical, setHistorical] = useState({})
  const [isLoadingH, setIsLoadingH] = useState(false)
  const [errorH, setErrorH] = useState(false)

  const fetchCurrent = async () => {
    setIsLoadingC(true)
    await fetch(endpointCurrent)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error')
        }
      })
      .then(response => setCurrent(response))
      .catch(error => setErrorC({ error }))
    setIsLoadingC(false)
  }

  const fetchHistorical = async () => {
    setIsLoadingH(true)
    await fetch(endpointHistorical)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error')
        }
      })
      .then(response => setHistorical(response))
      .catch(error => setErrorH({ error }))
    setIsLoadingH(false)
  }

  useEffect(() => {
    fetchCurrent()
    fetchHistorical()
  }, [])

  const { country, cases, todayCases, deaths, todayDeaths, recovered, active, critical, casesPerOneMillion, deathsPerOneMillion } = current

  const { timeline } = historical

  return !isLoadingC && !errorC && !isLoadingH && !errorH ? (
    <section>

      Something where the height of the container is 60vh
      Then the tallest bar i 95 % of that and the rest of the numbers follow suit
      <h2>{country}</h2>
      {timeline.cases}

    </section>
  ) : <Loading />
}

export default Country