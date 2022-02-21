import { Suspense, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { history, renderRouteConfigs, routes } from 'config/router'
import { ErrorFetchDataContext } from 'contexts/ErrorFetchDataContextProvider'

import ErrorFetchData from './components/ErrorFetchData'

function App() {
  const { isError } = useContext(ErrorFetchDataContext)
  return (
    <>
      {
        // ErrorFetchData
        isError ? (
          <ErrorFetchData />
        ) : (
          <div className="App">
            <Suspense fallback={<p>Loading ...</p>}>
              <BrowserRouter history={history}>
                {renderRouteConfigs(routes)}
              </BrowserRouter>
            </Suspense>
          </div>
        )
      }
    </>
  )
}

export default App
