import React from 'react'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
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
  <section>
    <h2>{country}</h2>
    <dl>
      <div className="active">
        <dt>Active cases</dt>
        <dd>{formatNum(cases - deaths - recovered)}</dd>
      </div>
      <div className="cases">
        <div className="cases__total">
          <dt>Total</dt>
          <dd>{cases}</dd>
        </div>
        {todayCases > 0 && (
          <div className="cases__new">
            <dt>Today</dt>
            <dd>
              {formatNum(todayCases)} / {round((todayCases / cases) * 100, 3)} %
            </dd>
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

          {deaths > 0 && (
            <div className="cnd__deadly">
              <dt>Deadliness</dt>
              <dd>{round(deaths / cases, 6)} %</dd>
            </div>
          )}
        </div>
      )}
      {recovered > 0 &&
        (recovered === cases ? (
          <div className="recovered--all">
            <dt>Recovered</dt>
            <dd>{formatNum(recovered)}</dd>
          </div>
        ) : (
          <div className="recovered">
            <dt>Recovered</dt>
            <dd>{formatNum(recovered)}</dd>
          </div>
        ))}
    </dl>
  </section>
)

export default Stats
