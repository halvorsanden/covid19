import * as React from 'react'
import { formatNum, round } from '../helpers/numberfuncs.js'

const CountryStats = ({ c, y }) => {
  return (
    <section className="country">
      <table>
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
            <th scope="row">Today</th>
            <td>{formatNum(c.active)}</td>
            <td>{c.todayCases > 0 && formatNum(c.todayCases)}</td>
            <td>
              {c.todayCases > 0 && round((c.todayCases / c.cases) * 100, 3)} %
            </td>
            <td>{c.cases && formatNum(c.cases)}</td>
            <td>{c.casesPerOneMillion && formatNum(c.casesPerOneMillion)}</td>
            <td>{c.critical > 0 && formatNum(c.critical)}</td>
            <td>{c.todayDeaths > 0 && formatNum(c.todayDeaths)}</td>
            <td>{c.deaths > 0 && formatNum(c.deaths)}</td>
            <td>
              {c.deathsPerOneMillion > 0 && formatNum(c.deathsPerOneMillion)}
            </td>
            <td>{c.deaths > 0 && round((c.deaths / c.cases) * 100, 4)} %</td>
            <td>{c.recovered > 0 && formatNum(c.recovered)}</td>
            <td>{c.tests > 0 && formatNum(c.tests)}</td>
          </tr>
          <tr>
            <th scope="row">Yesterday</th>
            <td>{formatNum(y.active)}</td>
            <td>{y.todayCases > 0 && formatNum(y.todayCases)}</td>
            <td>
              {y.todayCases > 0 && round((y.todayCases / y.cases) * 100, 3)} %
            </td>
            <td>{y.cases && formatNum(y.cases)}</td>
            <td>{y.casesPerOneMillion && formatNum(y.casesPerOneMillion)}</td>
            <td>{y.critical > 0 && formatNum(y.critical)}</td>
            <td>{y.todayDeaths > 0 && formatNum(y.todayDeaths)}</td>
            <td>{y.deaths > 0 && formatNum(y.deaths)}</td>
            <td>
              {y.deathsPerOneMillion > 0 && formatNum(y.deathsPerOneMillion)}
            </td>
            <td>{y.deaths > 0 && round((y.deaths / y.cases) * 100, 4)} %</td>
            <td>{y.recovered > 0 && formatNum(y.recovered)}</td>
            <td>{y.tests > 0 && formatNum(y.tests)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default CountryStats
