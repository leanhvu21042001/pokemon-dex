import React, { lazy } from 'react'

import { nanoid } from 'nanoid'
import { createBrowserHistory } from 'history'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('../../pages/Home'))
const DetailPage = lazy(() => import('../../pages/Detail'))

export const history = createBrowserHistory()

export const routes = {
  homePage: {
    id: nanoid(5),
    path: '/pokemon-dex',
    exact: true,
    component: HomePage
  },
  detailPage: {
    id: nanoid(5),
    path: '/pokemon-dex/detail/:id',
    exact: true,
    component: DetailPage
  },
  default: {
    id: nanoid(5),
    path: '*',
    component: () => <Navigate to={`/pokemon-dex`} />
  }
}

export const renderRouteConfigs = routes => {
  return (
    <Routes>
      {Object.values(routes).map(route => {
        const Layout = route.layout || React.Fragment

        return (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            element={
              <Layout>
                <route.component />
              </Layout>
            }
          />
        )
      })}
    </Routes>
  )
}
