import * as React from 'react'
import { useState, useEffect } from 'react'
import { NovelCovid } from 'novelcovid'
import Loading from './Loading.jsx'
import CountryStats from './CountryStats.jsx'
import CountryChart from './CountryChart.jsx'

// Experimental, can probably be changed to input at some time to feature other countries

const APIEndpoint = new NovelCovid()

const Country = () => {
  const [current, setCurrent] = useState({})
  const [isLoadingC, setIsLoadingC] = useState(true)
  const [errorC, setErrorC] = useState(false)
  const [yesterday, setYesterday] = useState({})
  const [isLoadingY, setIsLoadingY] = useState(true)
  const [errorY, setErrorY] = useState(false)
  const [historical, setHistorical] = useState({})
  const [isLoadingH, setIsLoadingH] = useState(true)
  const [errorH, setErrorH] = useState(false)

  const fetchCurrent = async () => {
    setIsLoadingC(true)
    await APIEndpoint.countries('norway')
      .then((response) => {
        if (response) {
          return response
        } else {
          throw new Error('Error')
        }
      })
      .then((response) => setCurrent(response))
      .catch((error) => setErrorC({ error }))
    setIsLoadingC(false)
  }

  const fetchYesterday = async () => {
    setIsLoadingY(true)
    await APIEndpoint.countries('norway', { yesterday: true })
      .then((response) => {
        if (response) {
          return response
        } else {
          throw new Error('Error')
        }
      })
      .then((response) => setYesterday(response))
      .catch((error) => setErrorY({ error }))
    setIsLoadingY(false)
  }

  const fetchHistorical = async () => {
    setIsLoadingH(true)
    await APIEndpoint.historical(null, 'norway')
      .then((response) => {
        if (response) {
          return response
        } else {
          throw new Error('Error')
        }
      })
      .then((response) => setHistorical(response))
      .catch((error) => setErrorH({ error }))
    setIsLoadingH(false)
  }

  useEffect(() => {
    fetchCurrent()
    fetchYesterday()
    fetchHistorical()
  }, [])

  return !isLoadingC &&
    !errorC &&
    !isLoadingY &&
    !errorY &&
    !isLoadingH &&
    !errorH ? (
    <>
      <h2>{current.country}</h2>
      <CountryStats c={current} y={yesterday} />
      <CountryChart historical={historical} />
    </>
  ) : (
    <Loading />
  )
}

export default Country
