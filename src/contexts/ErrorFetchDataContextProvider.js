import React from 'react'

export const ErrorFetchDataContext = React.createContext()

export default function ErrorFetchDataContextProvider({ children }) {
  const [isError, setIsError] = React.useState(false)

  const handleErrorFetchData = () => {
    if (isError) {
      return
    }
    setIsError(true)
  }

  return (
    <ErrorFetchDataContext.Provider value={{ handleErrorFetchData, isError }}>
      {children}
    </ErrorFetchDataContext.Provider>
  )
}
