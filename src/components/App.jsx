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
                    {country.country}
                    <dl>
                      <dt>Cases</dt>
                      <dd>{country.cases}</dd>
                      <dt>New cases today</dt>
                      <dd>{country.todayCases}</dd>
                      <dt>Deaths</dt>
                      <dd>{country.deaths}</dd>
                      <dt>New deaths today</dt>
                      <dd>{country.todayDeaths}</dd>
                      <dt>Recovered</dt>
                      <dd>{country.recovered}</dd>
                      <dt>Critical</dt>
                      <dd>{country.critical}</dd>
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
