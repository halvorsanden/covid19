import React from 'react'

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

function dateEpoch(datestring) {
  const parts = datestring.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
  return Date.UTC(+parts[3], parts[2] - 1, +parts[1], +parts[4], +parts[5]);
}

function logHeight(caseInt) {
  const length = Math.log(caseInt) * Math.LOG10E + 1 | 0;
  switch (length) {
    case 1: return 19 + caseInt * 2 + '%'
    case 2: return 39 + caseInt * 0.2 + '%'
    case 3: return 59 + caseInt * 0.02 + '%'
    case 4: return 79 + caseInt * 0.002 + '%'
    case 5: return 99 + caseInt * 0.0002 + '%'
  }
}


const StatsCountry = ({
  current: { country, cases, todayCases, deaths, todayDeaths, recovered, active, critical, casesPerOneMillion, deathsPerOneMillion }, historical, historical: { timeline }
}) => {

  const tlCasesValue = []
  Object.keys(timeline.cases).forEach((key) => (
    timeline.cases[key] > 0 && tlCasesValue.push(timeline.cases[key])))

  const tlCasesKeys = []
  Object.keys(timeline.cases).forEach((key) => (
    timeline.cases[key] > 0 && tlCasesKeys.push(key)))

  return (
    <section className="country">
      <h2>{country}</h2>
      <h3>Linear</h3>
      <div className="country-chart">
        <div className="linewrapper">
          <div className="chart-line">5 000</div>
          <div className="chart-line">4 000</div>
          <div className="chart-line">3 000</div>
          <div className="chart-line">2 000</div>
          <div className="chart-line">1 000</div>
        </div>
        <div className="barwrapper">
          {tlCasesValue.map((caseValue, i) => (
            <div key={i} className="case-bar" style={{ height: `calc(0.02% * ${caseValue})` }}>{caseValue}</div>
          )
          )}
        </div>
        <div className="keys">
          {tlCasesKeys.map((tCase, i) => (
            <div key={i} className="case-key" >{tCase}</div>
          ))}
        </div>
      </div>
      <h3>Logarithmic</h3>
      <div className="country-chart">
        <div className="linewrapper">
          <div className="chart-line">10 000</div>
          <div className="chart-line">1 000</div>
          <div className="chart-line">100</div>
          <div className="chart-line">10</div>
          <div className="chart-line">1</div>
        </div>
        <div className="barwrapper">
          {tlCasesValue.map((caseValue, i) => (
            <React.Fragment key={i}>
              {caseValue === 1 && (
                <div key={i} className="case-bar" style={{
                  height: '20%'
                }}>{caseValue}</div>
              )
              }
              {caseValue > 1 && (
                <div key={i} className="case-bar" style={{
                  height: logHeight(caseValue)
                }}>{caseValue}</div>
              )
              }
            </React.Fragment>
          ))}
        </div>
        <div className="keys">
          {tlCasesKeys.map((tCase, i) => (
            <div key={i} className="case-key" >{tCase}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCountry
