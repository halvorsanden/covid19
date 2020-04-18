import * as React from 'react'
import { formatNum, round } from '../helpers/numberfuncs.js'

const CountryStats = ({
  current: {
    country,
    cases,
    active,
    deaths,
    recovered,
    todayCases,
    critical,
    todayDeaths,
    casesPerOneMillion,
    deathsPerOneMillion,
    tests
  }
}) => {
  return (
    <section className="statcard">
      <h2>{country}</h2>
      <dl>
        <div className="active">
          {active != 1 ? <dt>Active cases</dt> : <dt>Active case</dt>}
          <dd>{formatNum(active)}</dd>
        </div>
        <div className="cases">
          {todayCases > 0 && (
            <div className="cases__new">
              <dt>Today</dt>
              <dd>
                {formatNum(todayCases)} ({round((todayCases / cases) * 100, 3)}{' '}
                %)
              </dd>
            </div>
          )}
          <div className="cases__total">
            <dt>Total</dt>
            <dd>{cases && formatNum(cases)}</dd>
          </div>
          <div className="cases__total">
            <dt>Total/M</dt>
            <dd>{casesPerOneMillion && formatNum(casesPerOneMillion)}</dd>
          </div>
        </div>
        {critical + deaths > 0 && (
          <div className="cnd">
            {critical > 0 && (
              <div className="cnd__critical">
                <dt>Critical</dt>
                <dd>{formatNum(critical)}</dd>
              </div>
            )}
            {todayDeaths > 0 && (
              <div className="cnd__died">
                <dt>Died today</dt>
                <dd>{formatNum(todayDeaths)}</dd>
              </div>
            )}
            {deaths > 0 && (
              <div className="cnd__dead">
                <dt>Dead</dt>
                <dd>{formatNum(deaths)}</dd>
              </div>
            )}
            {deathsPerOneMillion > 0 && (
              <div className="cnd__dead">
                <dt>Dead/M</dt>
                <dd>{formatNum(deathsPerOneMillion)}</dd>
              </div>
            )}
            {deaths > 0 && (
              <div className="cnd__deadly">
                <dt>Deadliness</dt>
                <dd>{round((deaths / cases) * 100, 4)} %</dd>
              </div>
            )}
          </div>
        )}
        {recovered > 0 &&
          (recovered === cases ? (
            <div className="rnt--all">
              <div className="rnt__recovered">
                <dt>Recovered</dt>
                <dd>{formatNum(recovered)}</dd>
              </div>
              {tests > 0 && (
                <div className="rnt__tests">
                  <dt>Tests</dt>
                  <dd>{formatNum(tests)}</dd>
                </div>
              )}
            </div>
          ) : (
            <div className="rnt">
              <div className="rnt__recovered">
                <dt>Recovered</dt>
                <dd>{formatNum(recovered)}</dd>
              </div>
              {tests > 0 && (
                <div className="rnt__tests">
                  <dt>Tests</dt>
                  <dd>{formatNum(tests)}</dd>
                </div>
              )}
            </div>
          ))}
      </dl>
    </section>
  )
}

export default CountryStats
