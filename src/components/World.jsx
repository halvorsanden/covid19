import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

const endpointWorld =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/all'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const World = () => {
  const [world, setWorld] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
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
    fetchWorld()
  }, [])

  return !isLoading && !error ? (
    <section>
      <h2>Worldwide</h2>
      <dl>
        <div className="active">
          <dt>Active cases</dt>
          <dd>{formatNum(world.cases - world.deaths - world.recovered)}</dd>
        </div>
        {world.cases > 0 && (
          <div className="cases cases__total">
            <dt>Total</dt>
            <dd>{formatNum(world.cases)}</dd>
          </div>
        )}
        {world.deaths > 0 && (
          <div className="cnd">
            <div className="cnd__dead">
              <dt>Dead</dt>
              <dd>{formatNum(world.deaths)}</dd>
            </div>
            <div className="cnd__deadly">
              <dt>Deadliness</dt>
              <dd>{round(world.deaths / world.cases, 6)} %</dd>
            </div>
          </div>
        )}
        {world.recovered > 0 && (
          <div className="recovered">
            <dt>Recovered</dt>
            <dd>{formatNum(world.recovered)}</dd>
          </div>
        )}
      </dl>
    </section>
  ) : null
}

export default World
