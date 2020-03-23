import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

const endpointWorld =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/all'

const endpointPeople =
  'https://cors-anywhere.herokuapp.com/https://d6wn6bmjj722w.population.io/1.0/population/World/today-and-tomorrow/'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const WorldPercentage = () => {
  const [world, setWorld] = useState([])
  const [people, setPeople] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchPeople = async () => {
      await fetch(endpointPeople)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error')
          }
        })
        .then(response => setPeople(response))
        .catch(error => setError({ error }))
      setIsLoading(false)
    }
    const fetchWorld = async () => {
      await fetch(endpointWorld)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error')
          }
        })
        .then(response => setWorld(response))
        .catch(error => setError({ error }))
      setIsLoading(false)
    }
    fetchPeople()
    fetchWorld()
  }, [])

  const everyone = people.total_population[0].popluation
  const { cases, deaths, recovered } = world
  const pCases = (cases - deaths - recovered) / everyone * 100

  return !isLoading && !error ? (
    <section>
      <h2>Worldwide per cent</h2>
      <dl>
        <div className="active">
          <dt>Active</dt>
          <dd>{cases && formatNum(pCases)}</dd>
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
  ) : null
}

export default WorldPercentage
