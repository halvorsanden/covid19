import * as React from 'react'
import { formatNum, round } from '../helpers/numberfuncs'
import monthsAbbr from '../helpers/months'

function formatDate(epochDate, yesterday) {
  let update = new Date(epochDate)
  if (yesterday == 'yesterday') {
    update.setDate(update.getDate() - 1)
  }
  const day = update.getDate()
  const monthIndex = update.getMonth()
  const month = monthsAbbr[monthIndex]
  const updateReadable = `${month} ${day}`
  return updateReadable
}

const CountryStats = ({ c, y }) => {
  return (
    <section className="country">
      <table className="table-view">
        <thead>
          <tr>
            <th></th>
            <th>Active</th>
            <th>New</th>
            <th>Increase</th>
            <th>Total</th>
            <th>Total/M</th>
            <th>Critical</th>
            <th>Died</th>
            <th>Dead</th>
            <th>Dead/M</th>
            <th>Deadliness</th>
            <th>Recovered</th>
            <th>Tests</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{formatDate(c.updated, 'today')}</th>
            <td>{formatNum(c.active)}</td>
            <td>{c.todayCases > 0 ? formatNum(c.todayCases) : '-'}</td>
            <td className="ws-nowrap">
              {c.todayCases > 0
                ? round((c.todayCases / c.cases) * 100, 3) + ' %'
                : '-'}
            </td>
            <td>{c.cases && formatNum(c.cases)}</td>
            <td>{c.casesPerOneMillion && formatNum(c.casesPerOneMillion)}</td>
            <td>{c.critical > 0 ? formatNum(c.critical) : '-'}</td>
            <td>{c.todayDeaths > 0 ? formatNum(c.todayDeaths) : '-'}</td>
            <td>{c.deaths > 0 && formatNum(c.deaths)}</td>
            <td>
              {c.deathsPerOneMillion > 0 && formatNum(c.deathsPerOneMillion)}
            </td>
            <td className="ws-nowrap">
              {c.deaths > 0 && round((c.deaths / c.cases) * 100, 4) + ' %'}
            </td>
            <td>{c.recovered > 0 && formatNum(c.recovered)}</td>
            <td>{c.tests > 0 && formatNum(c.tests)}</td>
          </tr>
          <tr>
            <th scope="row">{formatDate(c.updated, 'yesterday')}</th>
            <td>{formatNum(y.active)}</td>
            <td>{y.todayCases > 0 ? formatNum(y.todayCases) : '-'}</td>
            <td className="ws-nowrap">
              {y.todayCases > 0
                ? round((y.todayCases / y.cases) * 100, 3) + ' %'
                : '-'}
            </td>
            <td>{y.cases && formatNum(y.cases)}</td>
            <td>{y.casesPerOneMillion && formatNum(y.casesPerOneMillion)}</td>
            <td>{y.critical > 0 ? formatNum(y.critical) : '-'}</td>
            <td>{y.todayDeaths > 0 ? formatNum(y.todayDeaths) : '-'}</td>
            <td>{y.deaths > 0 && formatNum(y.deaths)}</td>
            <td>
              {y.deathsPerOneMillion > 0 && formatNum(y.deathsPerOneMillion)}
            </td>
            <td className="ws-nowrap">
              {y.deaths > 0 && round((y.deaths / y.cases) * 100, 4) + ' %'}
            </td>
            <td>{y.recovered > 0 && formatNum(y.recovered)}</td>
            <td>{y.tests > 0 && formatNum(y.tests)}</td>
          </tr>
        </tbody>
      </table>

      <div className="dl-view">
        <div>
          <h3>{formatDate(c.updated, 'today')}</h3>
          <dl>
            <dt>Active</dt>
            <dd>{formatNum(c.active)}</dd>
            <dt>New</dt>
            <dd>{c.todayCases > 0 ? formatNum(c.todayCases) : '-'}</dd>
            <dt>Increase</dt>
            <dd className="ws-nowrap">
              {c.todayCases > 0
                ? round((c.todayCases / c.cases) * 100, 3) + ' %'
                : '-'}
            </dd>
            <dt>Total</dt>
            <dd>{c.cases && formatNum(c.cases)}</dd>
            <dt>Total/M</dt>
            <dd>{c.casesPerOneMillion && formatNum(c.casesPerOneMillion)}</dd>
            <dt>Critical</dt>
            <dd>{c.critical > 0 ? formatNum(c.critical) : '-'}</dd>
            <dt>Died</dt>
            <dd>{c.todayDeaths > 0 ? formatNum(c.todayDeaths) : '-'}</dd>
            <dt>Dead</dt>
            <dd>{c.deaths > 0 && formatNum(c.deaths)}</dd>
            <dt>Dead/M</dt>
            <dd>
              {c.deathsPerOneMillion > 0 && formatNum(c.deathsPerOneMillion)}
            </dd>
            <dt>Deadliness</dt>
            <dd className="ws-nowrap">
              {c.deaths > 0 && round((c.deaths / c.cases) * 100, 4) + ' %'}
            </dd>
            <dt>Recovered</dt>
            <dd>{c.recovered > 0 && formatNum(c.recovered)}</dd>
            <dt>Tests</dt>
            <dd>{c.tests > 0 && formatNum(c.tests)}</dd>
          </dl>
        </div>
        <div>
          <h3>{formatDate(c.updated, 'yesterday')}</h3>
          <dl>
            <dt>Active</dt>
            <dd>{formatNum(y.active)}</dd>
            <dt>New</dt>
            <dd>{y.todayCases > 0 ? formatNum(y.todayCases) : '-'}</dd>
            <dt>Increase</dt>
            <dd className="ws-nowrap">
              {y.todayCases > 0
                ? round((y.todayCases / y.cases) * 100, 3) + ' %'
                : '-'}
            </dd>
            <dt>Total</dt>
            <dd>{y.cases && formatNum(y.cases)}</dd>
            <dt>Total/M</dt>
            <dd>{y.casesPerOneMillion && formatNum(y.casesPerOneMillion)}</dd>
            <dt>Critical</dt>
            <dd>{y.critical > 0 ? formatNum(y.critical) : '-'}</dd>
            <dt>Died</dt>
            <dd>{y.todayDeaths > 0 ? formatNum(y.todayDeaths) : '-'}</dd>
            <dt>Dead</dt>
            <dd>{y.deaths > 0 && formatNum(y.deaths)}</dd>
            <dt>Dead/M</dt>
            <dd>
              {y.deathsPerOneMillion > 0 && formatNum(y.deathsPerOneMillion)}
            </dd>
            <dt>Deadliness</dt>
            <dd className="ws-nowrap">
              {y.deaths > 0 && round((y.deaths / y.cases) * 100, 4) + ' %'}
            </dd>
            <dt>Recovered</dt>
            <dd>{y.recovered > 0 && formatNum(y.recovered)}</dd>
            <dt>Tests</dt>
            <dd>{y.tests > 0 && formatNum(y.tests)}</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default CountryStats
