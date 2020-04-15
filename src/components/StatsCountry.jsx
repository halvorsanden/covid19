import * as React from 'react'
import { useState, Fragment } from 'react'
import Stats from './Stats.jsx'
import monthsAbbr from '../helpers/months.js'
import { formatNum } from '../helpers/numberfuncs.js'

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
  const length = (Math.log(caseInt) * Math.LOG10E + 1) | 0
  switch (length) {
    case 1:
      return 11.5 + caseInt * 1.25 + '%'
    case 2:
      return 24 + caseInt * 0.125 + '%'
    case 3:
      return 36.5 + caseInt * 0.0125 + '%'
    case 4:
      return 49 + caseInt * 0.00125 + '%'
    case 5:
      return 61.5 + caseInt * 0.000125 + '%'
    case 6:
      return 74 + caseInt * 0.0000125 + '%'
    case 7:
      return 86.5 + caseInt * 0.0000125 + '%'
    case 8:
      return 99 + caseInt * 0.00000125 + '%'
  }
}

const StatsCountry = ({ current, historical: { timeline } }) => {
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
    <>
      <Stats {...current} />
      <section className="country">
        <h3>Total 30 days</h3>
        {!showLog ? (
          <>
            <div className="nav">
              <div className="btndeact">Linear</div>
              <button onClick={hideLine}>Logarithmic</button>
            </div>
            <div className="country-chart">
              <div className="linewrapper">
                <div className="chart-line-lin">10 000</div>
                <div className="chart-line-lin">9 000</div>
                <div className="chart-line-lin">8 000</div>
                <div className="chart-line-lin">7 000</div>
                <div className="chart-line-lin">6 000</div>
                <div className="chart-line-lin">5 000</div>
                <div className="chart-line-lin">4 000</div>
                <div className="chart-line-lin">3 000</div>
                <div className="chart-line-lin">2 000</div>
                <div className="chart-line-lin">1 000</div>
              </div>
              <div className="barwrapper">
                {tlCasesValue.map((caseValue, i) => (
                  <div
                    key={i}
                    className="case-bar"
                    style={{ height: `calc(0.01% * ${caseValue})` }}
                  >
                    {formatNum(caseValue)}
                  </div>
                ))}
              </div>
              <div className="keys">
                {tlCasesKeys.map((date, i) => (
                  <time key={i} dateTime={dateTime(date)} className="case-key">
                    {dateFormat(date)}
                  </time>
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
                <div className="chart-line-log">10 000 000</div>
                <div className="chart-line-log">1 000 000</div>
                <div className="chart-line-log">100 000</div>
                <div className="chart-line-log">10 000</div>
                <div className="chart-line-log">1 000</div>
                <div className="chart-line-log">100</div>
                <div className="chart-line-log">10</div>
                <div className="chart-line-log">1</div>
              </div>
              <div className="barwrapper">
                {tlCasesValue.map((caseValue, i) => (
                  <Fragment key={i}>
                    {caseValue === 1 && (
                      <div
                        key={i}
                        className="case-bar"
                        style={{
                          height: '12.5%'
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
                        {formatNum(caseValue)}
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
              <div className="keys">
                {tlCasesKeys.map((date, i) => (
                  <time key={i} dateTime={dateTime(date)} className="case-key">
                    {dateFormat(date)}
                  </time>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default StatsCountry
