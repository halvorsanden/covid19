import React, { useState, useEffect } from 'react'
import Stats from './Stats.jsx'
import World from './World.jsx'

const Countries = ({ showAll, world, people, countries, loadingP, errorP }) => {
  const [showState, setShowState] = useState(showAll)

  useEffect(() => {
    setShowState(showAll)
  }, [showAll])

  return (
    <>
      {!showState &&
        countries.map((country, i) => (
          <React.Fragment key={i}>
            {country.country === 'Norway' ? <Stats {...country} /> : null}
            {country.country === 'Sweden' ? <Stats {...country} /> : null}
            {country.country === 'Denmark' ? <Stats {...country} /> : null}
            {country.country === 'China' ? <Stats {...country} /> : null}
            {country.country === 'Italy' ? <Stats {...country} /> : null}
            {country.country === 'USA' ? <Stats {...country} /> : null}
            {country.country === 'Spain' ? <Stats {...country} /> : null}
            {country.country === 'France' ? <Stats {...country} /> : null}
            {country.country === 'UK' ? <Stats {...country} /> : null}
          </React.Fragment>
        ))}
      <World
        people={people}
        world={world}
        loadingP={loadingP}
        errorP={errorP}
      />
      {showState &&
        countries.map((country, i) => <Stats key={i} {...country} />)}
    </>
  )
}

export default Countries
