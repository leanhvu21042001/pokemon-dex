import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import './home.css'

export default function HomePage() {
  const [pokemonsPaginateData, setPokemonsPaginateData] = useState([])

  const fetchPokemonsPaginateData = useCallback((offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}=1&limit=${limit}`
    return axios.get(url).then(response => response.data)
  }, [])

  useEffect(() => {
    fetchPokemonsPaginateData().then(pokemonsPaginateData => {
      setPokemonsPaginateData(pokemonsPaginateData?.results)
    })
  }, [fetchPokemonsPaginateData])

  return (
    <div className="container">
      {/* Logo */}
      <h1 className="text-center mb-5" id="logo-page">
        Pokemon Dex
      </h1>
      {/* ! Search Form*/}
      <form id="form-search" className="mb-5">
        <label htmlFor="search-pokemon-input" className="form-label">
          Search pokemon
        </label>
        <input
          type="text"
          className="form-control"
          id="search-pokemon-input"
          aria-describedby="search-pokemon-input"
        />
      </form>

      {/* List Carts Of Pokemon */}
      <div className="row mb-5" id="list-of-pokemon">
        {pokemonsPaginateData.map((pokemon, index) => (
          <CardPokemon
            key={index + Date.now()}
            pokemon={pokemon}
            fetchPokemonsPaginateData={fetchPokemonsPaginateData}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="row" id="pokemon-pagination">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#!"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#!">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

function CardPokemon({ pokemon, fetchPokemonsPaginateData }) {
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
  }, [fetchDetailPokemon, pokemon?.url])

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
