import React, { useContext, useEffect, useState } from 'react'

import { LANG } from './constants'
import pokemonService from 'services/pokemonService'
import { ErrorFetchDataContext } from 'contexts/ErrorFetchDataContextProvider'

const AbilityOfPokemon = ({ url }) => {
  const [effect, setEffect] = useState('')

  const { handleErrorFetchData } = useContext(ErrorFetchDataContext)

  useEffect(() => {
    pokemonService
      .getAbilityOfPokemon(url)
      .then(effectEntries => {
        const effectEntriesElements = effectEntries.map(effectEntry => {
          if (effectEntry?.language?.name === LANG) {
            return <li key={effectEntry.id}>{effectEntry.effect}</li>
          }
          return null
        })
        setEffect(effectEntriesElements)
      })
      .catch(() => {
        handleErrorFetchData()
      })
  }, [url])

  return <React.Fragment>{effect}</React.Fragment>
}
export default AbilityOfPokemon
