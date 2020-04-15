import * as React from 'react'
import { useState, useEffect } from 'react'
import { NovelCovid } from 'novelcovid'
import Loading from './Loading.jsx'
import StatsCountry from './StatsCountry.jsx'

// Experimental, can probably be changed to input at some time to feature other countries

const APIEndpoint = new NovelCovid()

const Country = () => {
  const [current, setCurrent] = useState([])
  const [isLoadingC, setIsLoadingC] = useState(true)
  const [errorC, setErrorC] = useState(false)
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
    fetchHistorical()
  }, [])

  return !isLoadingC && !errorC && !isLoadingH && !errorH ? (
    <StatsCountry current={current} historical={historical} />
  ) : (
    <Loading />
  )
}

export default Country
