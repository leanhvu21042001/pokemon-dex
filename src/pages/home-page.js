import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useWindowPosition from '../hooks/useWindowPosition'
import './home.css'

export default function HomePage() {
  // state search keywords.
  const [keywords, setKeywords] = useState('')
  const [searchType, setSearchType] = useState({ type: 'name' })

  // save all pokemons.
  const [pokemons, setPokemons] = useState([])
  // Pokemon for display to screen.
  const [pokemonsDisplay, setPokemonsDisplay] = useState([])

  const limit = 1118
  const [offset, setOffset] = useState(0)
  // Hook for get scroll position.
  const pageScrollData = useWindowPosition()
  const divListPokemonRef = useRef()

  // Fetch pokemons with params are offset and limit.
  const fetchPokemons = useCallback((offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return axios.get(url).then(response => response.data)
  }, [])

  // Running when scroll, to check is end of data. For call new data.
  useEffect(() => {
    const contentHeight = divListPokemonRef.current.offsetHeight
    const y = pageScrollData + window.innerHeight

    if (
      y > contentHeight &&
      pageScrollData > 0 &&
      contentHeight > 0 &&
      keywords.length <= 0
    ) {
      setOffset(prev => prev + 20)
    }
  }, [pageScrollData])

  // Fetch all pokemons fist load.
  useEffect(() => {
    fetchPokemons(0, limit).then(resPokemons => {
      setPokemons(resPokemons?.results)
    })
  }, [fetchPokemons])

  // Slice pokemons when offset changed.
  useEffect(() => {
    const pokemonSlice = pokemons.slice(offset, offset + 20)
    setPokemonsDisplay(prePokemons => [...prePokemons, ...pokemonSlice])
  }, [pokemons, offset])

  // Start search when form submit.
  const handleSubmitSearchForm = e => {
    e.preventDefault()
    if (keywords.trim().length > 0) {
      const stn = 'name'
      const stt = 'type'

      // check is search by NAME or TYPE
      if (searchType.type === stn) {
        const resultFilter = pokemons.filter(pokemon => {
          return pokemon.name.trim().includes(`${keywords}`.trim())
        })
        setPokemonsDisplay(resultFilter)
      }
      if (searchType.type === stt) {
        // get all types.
        axios
          .get('https://pokeapi.co/api/v2/type/')
          .then(res => res.data.results)
          .then(types => {
            return types.filter(type => {
              return type.name.trim().includes(`${keywords}`.trim())
            })
          })
          // filter type and get all pokemon with type name.
          .then(resultTypeFilter => {
            axios
              .get(`${resultTypeFilter[0]?.url}`)
              .then(response => response.data)
              .then(typeDetail => {
                const result = typeDetail?.pokemon.map(
                  pokemon => pokemon.pokemon
                )
                // set result filter for display pokemon.
                setPokemonsDisplay(result)
              })
          })
      }
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
              onChange={e => {
                setKeywords(e.target.value)

                // reset pokemons while input search form is empty.
                if (e.target.value.trim() === '') {
                  const pokemonSlice = pokemons.slice(0, 0 + 20)
                  setPokemonsDisplay(pokemonSlice)
                }
              }}
            />
          </div>

          <div className="col-2 d-flex align-items-end">
            <select
              style={{
                minWidth: '100px',
                height: '50px',
                borderRadius: '50px'
              }}
              className="form-select"
              aria-label="Default select example"
              defaultValue={`name`}
              onChange={e => setSearchType({ type: e.target.value })}
            >
              <option value="name">Name</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>
      </form>

      {/* List Carts Of Pokemon */}
      <div className="row mb-5" id="list-of-pokemon" ref={divListPokemonRef}>
        {pokemonsDisplay.map((pokemon, index) => (
          <CardPokemon key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

// Sub component for homepage render Pokemon Card.
function CardPokemon({ pokemon }) {
  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    front_default: '',
    types: ''
  }))

  // get detail of pokemon.
  const fetchDetailPokemon = useCallback(url => {
    return axios.get(url).then(response => response.data)
  }, [])

  useEffect(() => {
    fetchDetailPokemon(`${pokemon?.url}`).then(response => {
      // assignment data.
      let data = {}
      data.id = response?.id
      data.name = response?.name
      data.types = response?.types
      data.front_default = response?.sprites.front_default
      const types = Object.values(response?.types).map(type => type.type.name)
      data.types = types.join(', ') + '.'

      // set data for state.
      setDetailPokemon(data)
    })
  }, [pokemon?.url, fetchDetailPokemon])

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
      <div className="card card-pokemon">
        <img
          src={`${detailPokemon.front_default}`}
          className="card-img-top"
          alt={`${detailPokemon.name}`}
        />
        <div className="card-body">
          <h5 className="card-title">{detailPokemon.name}</h5>
          <p className="card-text">
            <b>Types</b>: {detailPokemon.types}
          </p>
          <div className="d-flex justify-content-end">
            <a href={`#${detailPokemon.id}`} className="btn btn-purple">
              Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
