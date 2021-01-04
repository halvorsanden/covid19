import * as React from 'react'
import { useState, Fragment } from 'react'
import monthsAbbr from '../helpers/months'
import { formatNum } from '../helpers/numberfuncs'

function dateFormat(datestring, i) {
  const parts = datestring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2})/)
  const monthIndex = parts[1] - 1
  const month = monthsAbbr[monthIndex]
  const dateday = parts[2]
  if (i == 0) {
    return `${month} ${dateday}`
  } else if (dateday == 1) {
    return `${month} ${dateday}`
  }
  return dateday
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

const CountryChart = ({ tlCasesValue, tlCasesKeys }) => {
  const [showLog, setShowLog] = useState(false)
  function hideLine() {
    setShowLog(true)
  }
  function hideLog() {
    setShowLog(false)
  }

  return (
    <section className="country">
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
                    {dateFormat(tlCasesKeys[i], i)}
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
