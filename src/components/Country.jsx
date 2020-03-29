import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import Loading from './Loading.jsx'
import StatsCountry from './StatsCountry.jsx'

// Experimental, can probably be changed to input at some time to feature other countries

const endpointCurrent =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/countries/norway'

const endpointHistorical =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/v2/historical/norway'

const Country = () => {
  const [current, setCurrent] = useState([])
  const [isLoadingC, setIsLoadingC] = useState(true)
  const [errorC, setErrorC] = useState(false)
  const [historical, setHistorical] = useState({})
  const [isLoadingH, setIsLoadingH] = useState(true)
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

  return !isLoadingC && !errorC && !isLoadingH && !errorH ? (
    <StatsCountry current={current} historical={historical} />
  ) : <Loading />
}

export default Country