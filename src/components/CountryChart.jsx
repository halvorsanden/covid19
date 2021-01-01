import * as React from 'react'
import { useState, Fragment } from 'react'
import monthsAbbr from '../helpers/months'
import { formatNum } from '../helpers/numberfuncs'

function dateFormat(datestring) {
  const parts = datestring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2})/)
  const monthIndex = parts[1] - 1
  const month = monthsAbbr[monthIndex]
  const dateday = parts[2]
  if (dateday == 1) {
    return `${dateday}. ${month}`
  } else {
    return dateday
  }
}

function dateTime(datestring) {
  const parts = datestring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2})/)
  const epoch = Date.UTC(20 + parts[3], +parts[1], +parts[2])
  const date = new Date(epoch)
  const year = date.getFullYear()
  const month = date.getMonth()
  const months = (month < 10 ? '0' : '') + month
  const dateDay = date.getDate()
  const dateDays = (dateDay < 10 ? '0' : '') + dateDay
  return `${year}-${months}-${dateDays}`
}

function logHeight(caseInt) {
  return (100 * Math.log(caseInt)) / Math.log(100000) + '%'
}

function tenDayDiff(casesValue, lastDay) {
  const diff =
    casesValue[lastDay] -
    casesValue[lastDay - 9] -
    (casesValue[lastDay - 10] - casesValue[lastDay - 19])
  if (diff > 0) {
    return formatNum(diff) + ' more than previous ten days'
  } else if (diff < 0) {
    return formatNum(-diff) + ' fewer than previous ten days'
  } else {
    return 'Same increase as the previous ten days'
  }
}

const CountryChart = ({ historical: { timeline } }) => {
  const [showLog, setShowLog] = useState(false)
  function hideLine() {
    setShowLog(true)
  }
  function hideLog() {
    setShowLog(false)
  }

  const tlCasesValue = []
  Object.keys(timeline.cases).forEach(
    (key) => timeline.cases[key] > 0 && tlCasesValue.push(timeline.cases[key])
  )

  const tlCasesKeys = []
  Object.keys(timeline.cases).forEach(
    (key) => timeline.cases[key] > 0 && tlCasesKeys.push(key)
  )

  return (
    <section className="country">
      <h3>
        {formatNum(tlCasesValue[29] - tlCasesValue[0])} new cases in the last 30
        days
      </h3>
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
      {!showLog ? (
        <>
          <div className="nav">
            <div className="btndeact">Linear</div>
            <button onClick={hideLine}>Logarithmic</button>
          </div>
          <div className="country-chart">
            <div className="linewrapper">
              <div className="chart-line-lin">96 000</div>
              <div className="chart-line-lin">88 000</div>
              <div className="chart-line-lin">80 000</div>
              <div className="chart-line-lin">72 000</div>
              <div className="chart-line-lin">64 000</div>
              <div className="chart-line-lin">56 000</div>
              <div className="chart-line-lin">48 000</div>
              <div className="chart-line-lin">40 000</div>
              <div className="chart-line-lin">32 000</div>
              <div className="chart-line-lin">24 000</div>
              <div className="chart-line-lin">16 000</div>
              <div className="chart-line-lin">8 000</div>
            </div>
            <div className="barwrapper">
              {tlCasesValue.map((caseValue, i) => (
                <div
                  key={i}
                  className="case-bar"
                  style={{ height: `calc(0.00104375% * ${caseValue})` }}
                >
                  <div>{formatNum(caseValue)}</div>
                  <time
                    dateTime={dateTime(tlCasesKeys[i])}
                    className="case-key"
                  >
                    {dateFormat(tlCasesKeys[i])}
                  </time>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="nav">
            <button onClick={hideLog}>Linear</button>
            <div className="btndeact">Logarithmic</div>
          </div>
          <div className="country-chart">
            <div className="linewrapper">
              <div className="chart-line-log">100 000</div>
              <div className="chart-line-log">10 000</div>
              <div className="chart-line-log">1 000</div>
              <div className="chart-line-log">100</div>
              <div className="chart-line-log">10</div>
            </div>
            <div className="barwrapper">
              {tlCasesValue.map((caseValue, i) => (
                <Fragment key={i}>
                  {caseValue === 1 && (
                    <div
                      key={i}
                      className="case-bar"
                      style={{
                        height: '20%'
                      }}
                    >
                      {caseValue}
                    </div>
                  )}
                  {caseValue > 1 && (
                    <div
                      key={i}
                      className="case-bar"
                      style={{
                        height: logHeight(caseValue)
                      }}
                    >
                      <div>{formatNum(caseValue)}</div>
                      <time
                        dateTime={dateTime(tlCasesKeys[i])}
                        className="case-key"
                      >
                        {dateFormat(tlCasesKeys[i])}
                      </time>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default CountryChart
