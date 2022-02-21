import axios from 'axios'
import { nanoid } from 'nanoid'
import { toCamelCase } from 'utils'

class PokemonService {
  async getOnePokemon(id) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.data)
      .then(data => {
        const types = Object.values(data?.types).map(type => type.type.name)
        data.types = types.join(', ') + '.'
        // hectograms to kg.
        data.weight = data?.weight / 10
        // decimetres to m.
        data.height = data?.height / 10

        // add object key.
        data.abilities = data?.abilities.map(item => {
          return { ...item, id: nanoid(5) }
        })

        // add object key.
        data.stats = data?.stats.map(item => {
          return { ...item, id: nanoid(5) }
        })

        // set data for state.
        return toCamelCase(data)
      })
  }

  async getEvolutionChain(url) {
    const species = await axios.get(url)

    const resEvolutionChain = await axios.get(
      `${toCamelCase(species.data).evolutionChain?.url}`
    )
    const data = toCamelCase(resEvolutionChain?.data).chain

    const speciesOne = data.species.name
    const urlOfSpeciesOne = data.species.url

    const speciesTwo = data.evolvesTo[0]?.species.name
    const urlOfSpeciesTwo = data.evolvesTo[0]?.species.url

    const speciesThree = data.evolvesTo[0]?.evolvesTo[0]?.species.name
    const urlOfSpeciesThree = data.evolvesTo[0]?.evolvesTo[0]?.species.url

    return [
      { id: nanoid(5), name: speciesOne, url: urlOfSpeciesOne },
      { id: nanoid(5), name: speciesTwo, url: urlOfSpeciesTwo },
      { id: nanoid(5), name: speciesThree, url: urlOfSpeciesThree }
    ]
  }

  async getAbilityOfPokemon(url) {
    // get Ability Of Pokemon.
    return (
      axios
        .get(url)
        // get effect entries.
        .then(response => {
          const effectEntries = toCamelCase(response.data).effectEntries
          // add object key.
          return effectEntries.map(effectEntry => {
            return { ...effectEntry, id: nanoid(5) }
          })
        })
    )
  }

  async getPokemonWithLimit(offset = 0, limit = 20) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return axios.get(url).then(response => response.data?.results)
  }

  async searchPokemonByType(keyword) {
    const trimmedKeyword = keyword.toString().trim()

    return (
      axios
        .get('https://pokeapi.co/api/v2/type/')
        .then(res => res.data.results)
        .then(types => {
          return types.filter(type => {
            return type.name.trim().includes(trimmedKeyword)
          })
        })
        // filter type and get all pokemon with type name.
        .then(resultTypeFilter => {
          return axios
            .get(`${resultTypeFilter[0]?.url}`)
            .then(response => response.data)
            .then(typeDetail => {
              const result = typeDetail?.pokemon.map(pokemon => pokemon.pokemon)
              // set result filter for display pokemon.
              return result
            })
        })
    )
  }
}

export default new PokemonService()
