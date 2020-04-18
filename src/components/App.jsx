import * as React from 'react'
import { useState, useEffect, Suspense, lazy } from 'react'
import 'regenerator-runtime/runtime'
import { NovelCovid } from 'novelcovid'
import Countries from './Countries.jsx'
import Loading from './Loading.jsx'
import monthsAbbr from '../helpers/months.js'
const Country = lazy(() => import('./Country.jsx'))

const APIEndpoint = new NovelCovid()
const endpointPeople =
  'https://cors-anywhere.herokuapp.com/https://d6wn6bmjj722w.population.io/1.0/population/World/today-and-tomorrow/'

function dateTime(datestring) {
  const date = new Date(datestring)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const months = (month < 10 ? '0' : '') + month
  const dateDay = date.getDate()
  const dateDays = (dateDay < 10 ? '0' : '') + dateDay
  const hour = date.getHours()
  const hours = (hour < 10 ? '0' : '') + hour
  const minute = date.getMinutes()
  const minutes = (minute < 10 ? '0' : '') + minute
  return `${year}-${months}-${dateDays} ${hours}:${minutes}`
}

function formatDate(updateMs) {
  const update = new Date(updateMs)
  const day = update.getDate()
  const monthIndex = update.getMonth()
  const month = monthsAbbr[monthIndex]
  const hour = update.getHours()
  const minute = update.getMinutes()
  const minutes = (minute < 10 ? '0' : '') + minute
  const updateReadable = `${month} ${day} ${hour}.${minutes}`
  return updateReadable
}

const App = () => {
  const [show, setShow] = useState({
    selected: true,
    all: false,
    country: false
  })
  const [countries, setCountries] = useState([])
  const [isLoadingC, setIsLoadingC] = useState(true)
  const [errorC, setErrorC] = useState(false)
  const [world, setWorld] = useState([])
  const [isLoadingW, setIsLoadingW] = useState(true)
  const [errorW, setErrorW] = useState(false)
  const [people, setPeople] = useState({})
  const [isLoadingP, setIsLoadingP] = useState(true)
  const [errorP, setErrorP] = useState(false)

  function activateSelected() {
    setShow({ selected: true, all: false, country: false })
  }
  function activateAll() {
    setShow({ selected: false, all: true, country: false })
  }
  function activateCountry() {
    setShow({ selected: false, all: false, country: true })
  }

  const fetchPeople = async () => {
    setIsLoadingP(true)
    await fetch(endpointPeople)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error')
        }
      })
      .then((response) => setPeople(response))
      .catch((error) => setErrorP({ error }))
    setIsLoadingP(false)
  }

  const fetchWorld = async () => {
    setIsLoadingW(true)
    await APIEndpoint.all()
      .then((response) => {
        if (response) {
          return response
        } else {
          throw new Error('Error')
        }
      })
      .then((response) => setWorld(response))
      .catch((error) => setErrorW({ error }))
    setIsLoadingW(false)
  }

  const fetchCountries = async () => {
    setIsLoadingC(true)
    await APIEndpoint.countries(null, { sort: 'cases' })
      .then((response) => {
        if (response) {
          return response
        } else {
          throw new Error('Error')
        }
      })
      .then((response) => setCountries(response))
      .catch((error) => setErrorC({ error }))
    setIsLoadingC(false)
  }

  useEffect(() => {
    fetchPeople()
    fetchWorld()
    fetchCountries()
  }, [])

  return (
    <>
      <header>
        <h1>
          COVID-19 <span>status</span>
        </h1>
        <nav>
          {!show.selected ? (
            <button onClick={activateSelected}>Selected countries</button>
          ) : (
            <div className="btndeact">Selected countries</div>
          )}
          {!show.all ? (
            <button onClick={activateAll}>All countries</button>
          ) : (
            <div className="btndeact">All countries</div>
          )}
          {!show.country ? (
            <button onClick={activateCountry}>Norway (WIP)</button>
          ) : (
            <div className="btndeact">Norway (WIP)</div>
          )}
        </nav>
        {!isLoadingW && !errorW
          ? world.updated && (
              <div className="updated">
                Data updated{' '}
                <time dateTime={dateTime(world.updated)}>
                  {formatDate(world.updated)}
                </time>
              </div>
            )
          : null}
      </header>
      <main>
        {!isLoadingW && !errorW && !isLoadingC && !errorC ? (
          !show.country ? (
            <Countries
              countries={countries}
              showAll={show.all}
              world={world}
              people={people}
              loadingP={isLoadingP}
              errorP={errorP}
            />
          ) : (
            <Suspense fallback={<Loading />}>
              <Country showCountry={show.country} />
            </Suspense>
          )
        ) : (
          <Loading />
        )}
      </main>
      <footer>
        <p>
          Data:{' '}
          <a href="https://www.worldometers.info/coronavirus/">
            worldometers.info/coronavirus
          </a>{' '}
          +{' '}
          <a href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series">
            github.com/CSSEGISandData/COVID-19
          </a>{' '}
          + <a href="https://population.io/">population.io</a> API:{' '}
          <a href="https://github.com/NovelCOVID/API">
            github.com/NovelCOVID/API
          </a>
        </p>
        <a className="devlogo" aria-label="D+D: 8 Yard" href="https://8yd.no">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 601 282"
            width="60"
            height="28"
          >
            <g fill="currentColor" clipPath="url(#a)">
              <path d="M58 261c4 15 19 24 33 20l27-8-25-92-53 14 18 66zm78-77l53-15-28-105-53 14 28 106zM19 116l53-14L47 9l-27 7C6 20-3 35 1 50l18 66zm97 45l-14-53-93 25 14 52 93-24zm77 78c15-4 24-19 20-34l-7-26-93 25 14 53 66-18zM170 47l-7-27c-4-14-19-23-33-19L64 19l14 53 92-25z" />
              <path
                fillRule="nonzero"
                d="M322 161l7-2c2-1 3-3 3-5s-1-4-3-5l-7-2-7 2-2 5 2 5 7 2zm0-24l6-1 2-5-2-5-6-2-6 2-2 4v1c0 2 1 3 3 4 1 2 3 2 5 2zm0 34l-8-1-7-4-4-5-2-6 2-8 7-6-5-4c-2-2-2-5-2-8l1-6 4-5 6-3 8-1 8 1 6 3 4 5a13 13 0 0 1 2 6l-2 8-5 4 6 6c2 2 3 4 3 7v1a14 14 0 0 1-7 12l-6 3-9 1zm74-23l-21-33h14l13 22 14-22h13l-21 33v22h-12v-22zm66-1l-7-18-7 18h14zm-12-33h11l24 56h-13l-5-12h-24l-5 12h-12l24-56zm66 28l7-2c2-1 2-4 2-6l-2-6c-2-2-4-2-7-2h-12v16h12zm-25-27h26c7 0 12 2 16 5 3 4 5 8 5 13s-2 8-4 11-5 5-8 6l13 20h-14l-12-18h-9v18h-13v-55zm81 44l6-1 6-3 3-6 1-6v-1l-1-6-3-6-6-3-6-1h-10v33h10zm-22-44h22l12 2 9 6a26 26 0 0 1 6 8l2 11-2 11-6 9-9 6-12 2h-22v-55z"
              />
            </g>
          </svg>
        </a>
      </footer>
    </>
  )
}

export default App
