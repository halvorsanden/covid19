import * as React from 'react'
import { formatNum, round } from '../helpers/numberfuncs'

const Stats = ({
  country,
  cases,
  deaths,
  todayCases,
  critical,
  todayDeaths,
  casesPerOneMillion,
  deathsPerOneMillion,
  tests
}) => (
  <section className="statcard">
    <h2>{country}</h2>
    <dl>
      <div className="cases">
        {todayCases > 0 && (
          <div className="cases__new">
            <dt>Today</dt>
            <dd>
              {formatNum(todayCases)} ({round((todayCases / cases) * 100, 3)} %)
            </dd>
          </div>
        )}
        <div className="cases__total">
          <dt>Total</dt>
          <dd>{cases && formatNum(cases)}</dd>
        </div>
        {casesPerOneMillion > 0 && casesPerOneMillion < cases && (
          <div className="cases__total">
            <dt>Total/M</dt>
            <dd>{casesPerOneMillion && formatNum(casesPerOneMillion)}</dd>
          </div>
        )}
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
          {deathsPerOneMillion > 0 && deathsPerOneMillion < deaths && (
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
    </dl>
  </section>
)

export default Stats
