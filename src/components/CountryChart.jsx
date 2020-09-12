import * as React from 'react'
import { useState, Fragment } from 'react'
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
  return (100 * Math.log(caseInt)) / Math.log(100000) + '%'
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
      <h3>Total 30 days</h3>
      {!showLog ? (
        <>
          <div className="nav">
            <div className="btndeact">Linear</div>
            <button onClick={hideLine}>Logarithmic</button>
          </div>
          <div className="country-chart">
            <div className="linewrapper">
              <div className="chart-line-lin">24 000</div>
              <div className="chart-line-lin">22 000</div>
              <div className="chart-line-lin">20 000</div>
              <div className="chart-line-lin">18 000</div>
              <div className="chart-line-lin">16 000</div>
              <div className="chart-line-lin">14 000</div>
              <div className="chart-line-lin">12 000</div>
              <div className="chart-line-lin">10 000</div>
              <div className="chart-line-lin">8 000</div>
              <div className="chart-line-lin">6 000</div>
              <div className="chart-line-lin">4 000</div>
              <div className="chart-line-lin">2 000</div>
            </div>
            <div className="barwrapper">
              {tlCasesValue.map((caseValue, i) => (
                <div
                  key={i}
                  className="case-bar"
                  style={{ height: `calc(0.004175% * ${caseValue})` }}
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
  )
}

export default CountryChart
