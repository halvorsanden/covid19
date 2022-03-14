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

const LineWrapper = ({ maxY }) => {
  const stepSize = maxY / 12

  let stepArr = []
  stepArr[0] = maxY
  let newStep = maxY

  for (let step = 1; step < 12; step++) {
    stepArr[step] = Math.round(newStep - stepSize)
    newStep = newStep - stepSize
  }

  return (
    <div className="linewrapper">
      {stepArr.map((stepLine, i) => (
        <div key={i + stepLine} className="chart-line-lin">
          {formatNum(stepLine)}
        </div>
      ))}
    </div>
  )
}

// 100 divide by max y to find the percentage to multiply with case value to get the height

function logHeight(caseInt) {
  return (100 * Math.log(caseInt)) / Math.log(200000) + '%'
}

const CountryChart = ({ tlCasesValue, tlCasesKeys }) => {
  const maxY = Math.ceil(tlCasesValue[0] / 1000000) * 1000000
  const stepFactor = 100 / maxY
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
            <LineWrapper maxY={maxY} />
            <div className="barwrapper">
              {tlCasesValue.map((caseValue, i) => (
                <div
                  key={i}
                  className="case-bar"
                  style={{ height: `calc(${stepFactor}% * ${caseValue})` }}
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
              <div className="chart-line-log">200 000</div>
              <div className="chart-line-log">20 000</div>
              <div className="chart-line-log">2 000</div>
              <div className="chart-line-log">200</div>
              <div className="chart-line-log">20</div>
            </div>
            <div className="barwrapper">
              {tlCasesValue.map((caseValue, i) => (
                <Fragment key={i}>
                  {caseValue === 1 && (
                    <div
                      key={i}
                      className="case-bar"
                      style={{
                        height: '10%'
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
                        {dateFormat(tlCasesKeys[i], i)}
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
