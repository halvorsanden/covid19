import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import WorldPercentage from './WorldPercentage.jsx'

const endpointWorld =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/all'

const endpointPeople =
  'https://cors-anywhere.herokuapp.com/https://d6wn6bmjj722w.population.io/1.0/population/World/today-and-tomorrow/'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(nja) {
  return nja.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const World = () => {
  const [world, setWorld] = useState([])
  const [isLoadingW, setIsLoadingW] = useState(true)
  const [errorW, setErrorW] = useState(false)
  const [people, setPeople] = useState({})
  const [isLoadingP, setIsLoadingP] = useState(true)
  const [errorP, setErrorP] = useState(false)

  const fetchWorld = async () => {
    setIsLoadingW(true)
    await fetch(endpointWorld)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error')
        }
      })
      .then(response => setWorld(response))
      .catch(error => setErrorW({ error }))
    setIsLoadingW(false)
  }

  const fetchPeople = async () => {
    setIsLoadingP(true)
    await fetch(endpointPeople)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error')
        }
      })
      .then(response => setPeople(response))
      .catch(error => setErrorP({ error }))
    setIsLoadingP(false)
  }

  useEffect(() => {
    fetchWorld()
    fetchPeople()
  }, [])

  const { cases, deaths, recovered } = world

  return !isLoadingW && !errorW && !isLoadingP && !errorP ? (
    <>
      <section className="statcard">
        <h2>Worldwide</h2>
        <dl>
          <div className="active">
            <dt>Active cases</dt>
            <dd>{cases && formatNum(cases - deaths - recovered)}</dd>
          </div>
          {cases > 0 && (
            <div className="cases cases__total">
              <dt>Total</dt>
              <dd>{formatNum(cases)}</dd>
            </div>
          )}
          {deaths > 0 && (
            <div className="cnd">
              <div className="cnd__dead">
                <dt>Dead</dt>
                <dd>{formatNum(deaths)}</dd>
              </div>
              <div className="cnd__deadly">
                <dt>Deadliness</dt>
                <dd>{round((deaths / cases) * 100, 4)} %</dd>
              </div>
            </div>
          )}
          {world.recovered > 0 && (
            <div className="recovered">
              <dt>Recovered</dt>
              <dd>{formatNum(recovered)}</dd>
            </div>
          )}
        </dl>
      </section>
      {
        (cases && people.total_population) &&
        <WorldPercentage
          caseData={world}
          population={people.total_population}
        />
      }
    </>
  ) : null
}

export default World
