import * as React from 'react'
import { useState, useEffect, Suspense, lazy } from 'react'
import 'regenerator-runtime/runtime'
import { NovelCovid } from 'novelcovid'
import Loading from './uicomponents/Loading'
import BtnDeact from './uicomponents/BtnDeact'
import monthsAbbr from '../helpers/months'
import ModeSwitch from './uicomponents/ModeSwitch'
const Countries = lazy(() => import('./Countries'))
const Country = lazy(() => import('./Country'))

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

let url = new URL(window.location.href)
let hash = url.hash

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
    history.pushState(null, null, '#selected')
  }
  function activateAll() {
    setShow({ selected: false, all: true, country: false })
    history.pushState(null, null, '#all')
  }
  function activateCountry() {
    setShow({ selected: false, all: false, country: true })
    history.pushState(null, null, '#country')
  }

  function getParams(navParam) {
    switch (navParam) {
      case '#selected':
        return activateSelected()
      case '#all':
        return activateAll()
      case '#country':
        return activateCountry()
    }
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
    getParams(hash)
  }, [])

  return (
    <>
      <header>
        <div>
          <h1>
            COVID-19 <span>status</span>
          </h1>
          <div className="menuwrap">
            <nav>
              {!show.selected ? (
                <button onClick={activateSelected}>Selected countries</button>
              ) : (
                <BtnDeact text="Selected countries" />
              )}
              {!show.all ? (
                <button onClick={activateAll}>All countries</button>
              ) : (
                <BtnDeact text="All countries" />
              )}
              {!show.country ? (
                <button onClick={activateCountry}>Norway</button>
              ) : (
                <BtnDeact text="Norway" />
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
          </div>
        </div>
        <ModeSwitch />
      </header>
      <main>
        {!isLoadingW && !errorW && !isLoadingC && !errorC ? (
          !show.country ? (
            <Suspense fallback={<Loading />}>
              <Countries
                countries={countries}
                showAll={show.all}
                world={world}
                people={people}
                loadingP={isLoadingP}
                errorP={errorP}
              />
            </Suspense>
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
        <a
          class="devlogo"
          title="Developed by H.W. Sanden"
          href="http://8yd.no"
        >
          <svg
            width="22.4"
            height="29.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 224 295"
          >
            <path
              d="M60.4 273.75a28.7 28.7 0 0035.16 20.3l27.72-7.44-26-97.02-55.44
          14.86 18.57 69.3zm142.32-23.28a28.7 28.7 0
          0020.3-35.15l-7.43-27.72-97.02 26 14.85 55.44 69.3-18.57zM121.3
          168.3l-14.86-55.44-97.02 26 14.85 55.44 97.03-26zm21.28
          24.01l55.44-14.85-29.7-110.89-55.45 14.86 29.71 110.88zM19.55
          121.28L75 106.44 49 9.41l-27.72 7.43A28.7 28.7 0 00.98 51.98l18.57
          69.3zM178.45 49l-7.43-27.72A28.7 28.7 0 00135.87.98l-69.3 18.57L81.43
          75l97.02-26z"
            />
          </svg>
        </a>
      </footer>
    </>
  )
}

export default App
