import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import Stats from './Stats.jsx'
import World from './World.jsx'
import Loading from './Loading.jsx'

const endpointCountries =
  'https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/countries'

const Countries = ({ showAll }) => {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [showState, setShowState] = useState(showAll)

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

  useEffect(() => {
    setShowState(showAll);
  }, [showAll]);

  console.log(showState, showAll);

  return (
    <>
      {!showState &&
        (!isLoading && !error ? (
          countries.map((country, i) => (
            <React.Fragment key={i}>
              {country.country === 'Norway' ? <Stats {...country} /> : null}
              {country.country === 'Sweden' ? <Stats {...country} /> : null}
              {country.country === 'Denmark' ? <Stats {...country} /> : null}
              {country.country === 'Iceland' ? <Stats {...country} /> : null}
              {country.country === 'Finland' ? <Stats {...country} /> : null}
              {country.country === 'China' ? <Stats {...country} /> : null}
              {country.country === 'Italy' ? <Stats {...country} /> : null}
              {country.country === 'S. Korea' ? <Stats {...country} /> : null}
            </React.Fragment>
          ))
        ) : (
            <Loading />
          ))}
      <World />
      {showState &&
        (!isLoading && !error ? (
          countries.map((country, i) => <Stats key={i} {...country} />)
        ) : (
            <Loading />
          ))}
    </>
  )
}

export default Countries
