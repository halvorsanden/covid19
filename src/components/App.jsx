import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

const endpointCountries =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchCountries = async () => {
      await fetch(endpointCountries)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error')
          }
        })
        .then(response => setCountries(response))
        .catch(error => setError({ error }))
      setIsLoading(false)
    }
    fetchCountries()
  }, [])

  function round(value, precision) {
    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  return (
    <>
      <header className="header">
        <h1>COVID-19</h1>
      </header>
      <section>
        {!isLoading && !error ? (
          <>
            {countries.map((country, i) => (
              <React.Fragment key={i}>
                {country.country == 'Norway' ? (
                  <>
                    <h2>{country.country}</h2>
                    <dl>
                      <dt>Active cases</dt>
                      <dd>
                        {country.cases - country.deaths - country.recovered}
                      </dd>
                      <dt>Total cases</dt>
                      <dd>{country.cases}</dd>
                      <dt>New cases today</dt>
                      <dd>{country.todayCases}</dd>
                      <dt>Increase</dt>
                      <dd>
                        {round((country.todayCases / country.cases) * 100, 2)} %
                      </dd>
                      <dt>Critical</dt>
                      <dd>{country.critical}</dd>
                      <dt>Deaths</dt>
                      <dd>{country.deaths}</dd>
                      <dt>New deaths today</dt>
                      <dd>{country.todayDeaths}</dd>
                      <dt>Deadliness</dt>
                      <dd>{round(country.deaths / country.cases, 10)} %</dd>
                      <dt>Recovered</dt>
                      <dd>{country.recovered}</dd>
                    </dl>
                  </>
                ) : null}
              </React.Fragment>
            ))}
          </>
        ) : (
          <p>loading</p>
        )}
      </section>
      <footer>
        <p>
          API:{' '}
          <a href="https://github.com/NovelCOVID/API">
            github.com/NovelCOVID/API
          </a>
        </p>
        <p>
          Data:{' '}
          <a href="https://www.worldometers.info/coronavirus/">
            worldometers.info/coronavirus/
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
