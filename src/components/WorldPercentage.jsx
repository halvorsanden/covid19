import * as React from 'react'
import { round } from '../helpers/numberfuncs'

const WorldPercentage = (props) => {
  const {
    caseData: { cases, deaths },
    population
  } = props

  const everyone = population[0].population
  const pTotal = round((cases / everyone) * 100, 6)
  const pDeaths = round((deaths / everyone) * 100, 6)

  return (
    cases &&
    population && (
      <section className="statcard">
        <h2>Percentage worldwide</h2>
        <dl>
          {cases > 0 && (
            <div className="cases cases__total">
              <dt>Total</dt>
              <dd className="ws-nowrap">{pTotal} %</dd>
            </div>
          )}
          {deaths > 0 && (
            <div className="cnd">
              <div className="cnd__dead">
                <dt>Dead</dt>
                <dd className="ws-nowrap">{pDeaths} %</dd>
              </div>
            </div>
          )}
        </dl>
      </section>
    )
  )
}

export default WorldPercentage
