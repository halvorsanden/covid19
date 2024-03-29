import * as React from 'react'
import { useState, useEffect } from 'react'
import { NovelCovid } from 'novelcovid'
import Loading from './uicomponents/Loading'
import CountryStats from './CountryStats'
import CountryChart from './CountryChart'
import CountrySummary from './CountrySummary'

const APIEndpoint = new NovelCovid()

const Country = ({ selectedCountry }) => {
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
    await APIEndpoint.countries(selectedCountry)
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
    await APIEndpoint.countries(selectedCountry, { yesterday: true })
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
    await APIEndpoint.historical(null, selectedCountry)
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

  let tlCasesValue = []
  let tlCasesKeys = []

  if (!isLoadingH && !errorH && historical.timeline) {
    const timeline = historical.timeline
    Object.keys(timeline.cases).forEach(
      (key) => timeline.cases[key] > 0 && tlCasesValue.push(timeline.cases[key])
    )
    Object.keys(timeline.cases).forEach(
      (key) => timeline.cases[key] > 0 && tlCasesKeys.push(key)
    )
  }

  return !isLoadingC &&
    !errorC &&
    !isLoadingY &&
    !errorY &&
    !isLoadingH &&
    !errorH ? (
    <>
      <CountryStats c={current} y={yesterday} />
      {tlCasesValue.length > 0 ? (
        <>
          <CountrySummary
            tlCasesValue={tlCasesValue}
            country={current.country}
          />
          <CountryChart tlCasesValue={tlCasesValue} tlCasesKeys={tlCasesKeys} />
        </>
      ) : null}
    </>
  ) : (
    <Loading />
  )
}

export default Country
