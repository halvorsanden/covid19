import React from 'react'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

const WorldPercentage = props => {
  const {
    caseData: {
      cases,
      deaths,
      recovered,
    },
    population
  } = props

  const everyone = population[0].population
  const pCases = round((cases - deaths - recovered) / everyone * 100, 10)
  const pTotal = round(cases / everyone * 100, 10)
  const pDeaths = round(deaths / everyone * 100, 10)
  const pRecovered = round(recovered / everyone * 100, 10)

  return (
    <section>
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
          <div className="recovered">
            <dt>Recovered</dt>
            <dd>{pRecovered}&nbsp;%</dd>
          </div>
        )}
      </dl>
    </section>
  )
}

export default WorldPercentage
