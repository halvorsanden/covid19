import * as React from 'react'
import { formatNum } from '../helpers/numberfuncs'

function tenDayDiff(casesValue, lastDay) {
  const diff =
    casesValue[lastDay] -
    casesValue[lastDay - 9] -
    (casesValue[lastDay - 10] - casesValue[lastDay - 19])
  if (diff > 0) {
    return formatNum(diff) + ' more than previous ten days'
  } else if (diff < 0) {
    return formatNum(-diff) + ' fewer than previous ten days'
  }
  return 'Same as the previous ten days'
}

const CountrySummary = ({ tlCasesValue, country }) => {
  return (
    <section className="country">
      <h2>Last 30 days</h2>
      <h3>
        {formatNum(tlCasesValue[29] - tlCasesValue[0])} new cases in {country}
      </h3>
      <ul className="tenday">
        <li>
          <span>{formatNum(tlCasesValue[9] - tlCasesValue[0])}</span> new cases
          day 1–10
        </li>
        <li>
          <span>{formatNum(tlCasesValue[19] - tlCasesValue[10])}</span> new
          cases day 11–20 <br />
          {tenDayDiff(tlCasesValue, 19)}
        </li>
        <li>
          <span>{formatNum(tlCasesValue[29] - tlCasesValue[20])}</span> new
          cases day 21–30 <br />
          {tenDayDiff(tlCasesValue, 29)}
        </li>
      </ul>
    </section>
  )
}

export default CountrySummary
