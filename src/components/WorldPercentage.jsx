import * as React from 'react'
import { round } from '../helpers/numberfuncs.js'

const WorldPercentage = (props) => {
  const {
    caseData: { cases, deaths, recovered },
    population
  } = props

  const everyone = population[0].population
  const pCases = round(((cases - deaths - recovered) / everyone) * 100, 10)
  const pTotal = round((cases / everyone) * 100, 10)
  const pDeaths = round((deaths / everyone) * 100, 10)
  const pRecovered = round((recovered / everyone) * 100, 10)

  return (
    cases &&
    population && (
      <section className="statcard">
        <h2>Percentage worldwide</h2>
        <dl>
          <div className="active percent">
            <dt>Active</dt>
            <dd>{pCases}&nbsp;%</dd>
          </div>
          {cases > 0 && (
            <div className="cases cases__total">
              <dt>Total</dt>
              <dd>{pTotal}&nbsp;%</dd>
            </div>
          )}
          {deaths > 0 && (
            <div className="cnd">
              <div className="cnd__dead">
                <dt>Dead</dt>
                <dd>{pDeaths}&nbsp;%</dd>
              </div>
            </div>
          )}
          {recovered > 0 && (
            <div className="rnt rnt__recovered">
              <dt>Recovered</dt>
              <dd>{pRecovered}&nbsp;%</dd>
            </div>
          )}
        </dl>
      </section>
    )
  )
}

export default WorldPercentage
