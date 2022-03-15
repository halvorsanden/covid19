import * as React from 'react'
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

const LinLines = ({ maxY }) => {
  const stepFactor = 12
  const stepSize = maxY / stepFactor
  const stepFlex = 100 / stepFactor

  let stepArr = []
  stepArr[0] = maxY
  let newStep = maxY

  for (let step = 1; step < stepFactor; step++) {
    stepArr[step] = Math.round(newStep - stepSize)
    newStep = newStep - stepSize
  }

  return (
    <div className="linewrapper">
      {stepArr.map((stepLine, i) => (
        <div
          key={i + stepLine}
          className="chart-line-lin"
          style={{ flex: `0 0 ${stepFlex}%` }}
        >
          {formatNum(stepLine)}
        </div>
      ))}
    </div>
  )
}

const CountryChart = ({ tlCasesValue, tlCasesKeys }) => {
  const maxY = Math.ceil(tlCasesValue[0] / 1000000) * 1000000
  const stepFactor = 100 / maxY

  return (
    <section className="country">
      <h3>Total cases</h3>
      <div className="country-chart">
        <LinLines maxY={maxY} />
        <div className="barwrapper">
          {tlCasesValue.map((caseValue, i) => (
            <div
              key={i}
              className="case-bar"
              style={{ height: `calc(${stepFactor}% * ${caseValue})` }}
            >
              <div>{formatNum(caseValue)}</div>
              <time dateTime={dateTime(tlCasesKeys[i])} className="case-key">
                {dateFormat(tlCasesKeys[i], i)}
              </time>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CountryChart
