import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import Stats from './Stats.jsx'
import World from './World.jsx'
import Loading from './Loading.jsx'

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
      <header>
        <h1>
          COVID-19 <span>status</span>
        </h1>
      </header>
      <main>
        {!isLoading && !error ? (
          countries.map((country, i) => (
            <React.Fragment key={i}>
              {country.country === 'Norway' ? <Stats {...country} /> : null}
              {country.country === 'Sweden' ? <Stats {...country} /> : null}
              {country.country === 'Denmark' ? <Stats {...country} /> : null}
              {country.country === 'Iceland' ? <Stats {...country} /> : null}
              {country.country === 'Finland' ? <Stats {...country} /> : null}
              {country.country === 'China' ? <Stats {...country} /> : null}
              {country.country === 'Italy' ? <Stats {...country} /> : null}
              {country.country === 'India' ? <Stats {...country} /> : null}
              {country.country === 'Macao' ? <Stats {...country} /> : null}
            </React.Fragment>
          ))
        ) : (
          <Loading />
        )}
        <World />
      </main>
      <footer>
        <p>
          Data:{' '}
          <a href="https://www.worldometers.info/coronavirus/">
            worldometers.info/coronavirus/
          </a>
        </p>
        <a className="devlogo" aria-label="D+D: 8 Yard" href="http://8yd.no">
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
