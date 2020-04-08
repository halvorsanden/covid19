import React, { Suspense, lazy } from 'react'
const WorldPercentage = lazy(() => import('./WorldPercentage.jsx'))

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function formatNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const World = ({ world, people, loadingP, errorP }) => {
  const { cases, deaths, recovered } = world

  return (
    <>
      <section className="statcard">
        <h2>Worldwide</h2>
        <dl>
          <div className="active">
            <dt>Active cases</dt>
            <dd>{cases && formatNum(cases - deaths - recovered)}</dd>
          </div>
          {cases > 0 && (
            <div className="cases cases__total">
              <dt>Total</dt>
              <dd>{formatNum(cases)}</dd>
            </div>
          )}
          {deaths > 0 && (
            <div className="cnd">
              <div className="cnd__dead">
                <dt>Dead</dt>
                <dd>{formatNum(deaths)}</dd>
              </div>
              <div className="cnd__deadly">
                <dt>Deadliness</dt>
                <dd>{round((deaths / cases) * 100, 4)} %</dd>
              </div>
            </div>
          )}
          {world.recovered > 0 && (
            <div className="rnt rnt__recovered">
              <dt>Recovered</dt>
              <dd>{formatNum(recovered)}</dd>
            </div>
          )}
        </dl>
      </section>
      {!loadingP && !errorP && (
        <Suspense fallback={null}>
          <WorldPercentage
            caseData={world}
            population={people.total_population}
          />
        </Suspense>
      )}
    </>
  )
}

export default World
