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
  return 'Same increase as the previous ten days'
}

const CountrySummary = ({ tlCasesValue }) => {
  return (
    <section className="country">
      <p className="thirtyday">
        {formatNum(tlCasesValue[29] - tlCasesValue[0])} new cases in the last 30
        days
      </p>
      <ul className="tenday">
        <li>
          {formatNum(tlCasesValue[29] - tlCasesValue[20])} new cases day 21–30 (
          {tenDayDiff(tlCasesValue, 29)})
        </li>
        <li>
          {formatNum(tlCasesValue[19] - tlCasesValue[10])} new cases day 11–20 (
          {tenDayDiff(tlCasesValue, 19)})
        </li>
        <li>
          {formatNum(tlCasesValue[9] - tlCasesValue[0])} new cases day 1–10
        </li>
      </ul>
    </section>
  )
}

export default CountrySummary
