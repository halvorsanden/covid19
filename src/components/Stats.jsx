import React from 'react'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

const Stats = ({
  country,
  cases,
  deaths,
  recovered,
  todayCases,
  critical,
  todayDeaths
}) => (
  <div className="stat">
    <h2>{country}</h2>
    <dl>
      <div className="active">
        <dt>Active cases</dt>
        <dd>{cases - deaths - recovered}</dd>
      </div>
      <div className="cases">
        <div className="cases__total">
          <dt>Total</dt>
          <dd>{cases}</dd>
        </div>
        <div className="cases__new">
          <dt>New today</dt>
          <dd>{todayCases}</dd>
        </div>
        <div className="cases__total">
          <dt>Total increase</dt>
          <dd>{round((todayCases / cases) * 100, 2)} %</dd>
        </div>
      </div>
      <div className="cnd">
        <div className="cnd__critical">
          <dt>Critical</dt>
          <dd>{critical}</dd>
        </div>
        <div className="cnd__dead">
          <dt>Dead</dt>
          <dd>{deaths}</dd>
        </div>
        <div className="cnd__died">
          <dt>Died today</dt>
          <dd>{todayDeaths}</dd>
        </div>
        <div className="cnd__deadly">
          <dt>Deadliness</dt>
          <dd>{round(deaths / cases, 6)} %</dd>
        </div>
      </div>
      <div className="recovered">
        <dt>Recovered</dt>
        <dd>{recovered}</dd>
      </div>
    </dl>
  </div>
)

export default Stats
