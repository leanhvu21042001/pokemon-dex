import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import pokemonService from 'services/pokemonService'
import { ErrorFetchDataContext } from 'contexts/ErrorFetchDataContextProvider'

import './styles.css'
import defaultImagePokemon96x96 from 'assets/images/defaultImagePokemon96x96.png'

const VarietyOfPokemon = ({ pokemon, index }) => {
  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState({})

  const { handleErrorFetchData } = useContext(ErrorFetchDataContext)

  // get detail of pokemon.
  useEffect(() => {
    if (pokemon?.url) {
      const idSplitFromUrl = `${pokemon?.url}`
        .match(/\/\d+\//g)
        .join('')
        .replaceAll('/', '')
        .trim()
      pokemonService
        .getOnePokemon(idSplitFromUrl)
        .then(data => {
          setDetailPokemon(data)
        })
        .catch(() => {
          handleErrorFetchData()
        })
    }
  }, [pokemon])

  // render ui.
  return (
    <div className="col-4 text-center">
      <div>#{index + 1}</div>
      <Link to={`/detail/${detailPokemon?.id}`}>
        {detailPokemon?.sprites?.frontDefault &&
        detailPokemon?.sprites?.backDefault ? (
          <img
            src={`${
              detailPokemon?.sprites?.frontDefault ||
              detailPokemon?.sprites?.backDefault
            }`}
            alt={`${detailPokemon?.name}`}
          />
        ) : (
          <img src={defaultImagePokemon96x96} alt="default-pokemon-img" />
        )}
      </Link>

      <Link
        className="d-block h5 pokemon-variety"
        to={`/detail/${detailPokemon?.id}`}
      >
        {detailPokemon?.name}
      </Link>
    </div>
  )
}

export default VarietyOfPokemon
