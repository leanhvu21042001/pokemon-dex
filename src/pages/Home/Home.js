import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useRef, useState } from 'react'

import pokemonService from 'services/pokemonService'
import useWindowPosition from 'hooks/useWindowPosition'
import { ErrorFetchDataContext } from 'contexts/ErrorFetchDataContextProvider'

import CardPokemon from './components/CardPokemon'
import { LIMIT_POKEMONS_LIST_COUNT, searchMode } from './constants'

import './styles.css'

export default function Home() {
  // state search keywords.
  const [keywords, setKeywords] = useState('')
  const [searchType, setSearchType] = useState({ type: searchMode.NAME })

  const { handleErrorFetchData } = useContext(ErrorFetchDataContext)

  // save all pokemons.
  const [listPokemon, setListPokemon] = useState([])
  // Pokemon for display to screen.
  const [listPokemonDisplay, setListPokemonDisplay] = useState([])

  const [offset, setOffset] = useState(0)
  // Hook for get scroll position.
  const pageScrollData = useWindowPosition()
  const divListPokemonRef = useRef()

  // Running when scroll, to check is end of data. For call new data.
  useEffect(() => {
    const contentHeight = divListPokemonRef.current.offsetHeight
    const y = pageScrollData + window.innerHeight

    if (y > contentHeight && pageScrollData > 0 && contentHeight > 0) {
      setOffset(prev => prev + 20)
    }
  }, [pageScrollData])

  // Fetch all pokemons on first load.
  useEffect(() => {
    pokemonService
      .getPokemonWithLimit(0, LIMIT_POKEMONS_LIST_COUNT)
      .then(resListPokemon => {
        const result = resListPokemon.map(pokemon => ({
          ...pokemon,
          id: nanoid(5)
        }))
        setListPokemon(result)
      })
      .catch(() => {
        handleErrorFetchData()
      })
  }, [])

  // Slice pokemons when offset changed.
  useEffect(() => {
    const pokemonSlice = listPokemon.slice(offset, offset + 20)
    setListPokemonDisplay(preListPokemon => [
      ...preListPokemon,
      ...pokemonSlice
    ])
  }, [listPokemon, offset])

  // Start search when form submit.
  const handleSubmitSearchForm = e => {
    e.preventDefault()
    if (keywords.trim().length > 0) {
      // check is search by NAME or TYPE
      if (searchType.type === searchMode.NAME) {
        const resultFilter = listPokemon.filter(pokemon => {
          return pokemon.name.trim().includes(`${keywords}`.trim())
        })
        setListPokemonDisplay(resultFilter)
      }
      if (searchType.type === searchMode.TYPE) {
        // get all types.
        pokemonService
          .searchPokemonByType(keywords)
          .then(resListPokemon => {
            const result = resListPokemon.map(pokemon => ({
              ...pokemon,
              id: nanoid(5)
            }))
            setListPokemonDisplay(result)
          })
          .catch(() => {
            handleErrorFetchData()
          })
      }
    }
  }

  const handleInputSearchChange = e => {
    setKeywords(e.target.value)
    // reset pokemons while input search form is empty.
    if (e.target.value.trim() === '') {
      const pokemonSlice = listPokemon.slice(0, 0 + 20)
      setListPokemonDisplay(pokemonSlice)
    }
  }

  return (
    <div className="container">
      {/* Logo */}
      <h1 className="text-center mb-5" id="logo-page">
        Pokemon Dex
      </h1>
      {/* ! Search Form*/}
      <form id="form-search" className="mb-5" onSubmit={handleSubmitSearchForm}>
        <div className="row">
          <div className="col-10">
            <label htmlFor="search-pokemon" className="form-label">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="search-pokemon"
              aria-describedby="search-pokemon"
              onChange={handleInputSearchChange}
            />
          </div>

          <div className="col-2 d-flex align-items-end">
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={searchMode.NAME}
              onChange={e => setSearchType({ type: e.target.value })}
            >
              <option value={searchMode.NAME}>Name</option>
              <option value={searchMode.TYPE}>Type</option>
            </select>
          </div>
        </div>
      </form>

      {/* List Carts Of Pokemon */}
      <div className="row mb-5" id="list-of-pokemon" ref={divListPokemonRef}>
        {listPokemonDisplay.map(pokemon => {
          return <CardPokemon key={pokemon?.id} pokemon={pokemon} />
        })}
      </div>
    </div>
  )
}
