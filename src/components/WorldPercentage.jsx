import * as React from 'react'
import { round } from '../helpers/numberfuncs.js'

const WorldPercentage = (props) => {
  const {
    caseData: { cases, deaths, recovered },
    population
  } = props

  const everyone = population[0].population
  const pCases = round(((cases - deaths - recovered) / everyone) * 100, 6)
  const pTotal = round((cases / everyone) * 100, 6)
  const pDeaths = round((deaths / everyone) * 100, 6)
  const pRecovered = round((recovered / everyone) * 100, 6)

  return (
    cases &&
    population && (
      <section className="statcard">
        <h2>Percentage worldwide</h2>
        <dl>
          <div className="active percent">
            <dt>Active</dt>
            <dd className="ws-nowrap">{pCases} %</dd>
          </div>
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
          {recovered > 0 && (
            <div className="rnt rnt__recovered">
              <dt>Recovered</dt>
              <dd className="ws-nowrap">{pRecovered} %</dd>
            </div>
          )}
        </dl>
      </section>
    )
  )
}

export default WorldPercentage
