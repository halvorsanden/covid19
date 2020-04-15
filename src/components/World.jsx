import * as React from 'react'
import { Suspense, lazy } from 'react'
import { formatNum, round } from '../helpers/numberfuncs.js'
const WorldPercentage = lazy(() => import('./WorldPercentage.jsx'))

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
