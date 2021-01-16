import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import {useState, useEffect } from 'react'
import {getPokemonData, getPokemons, searchPokemon} from './api'
import { FavoriteProvider } from './contexts/favoriteContext';

const localStorageKey = "favorite_pokemon"
function App() {

  const [pokemons, setPokemons] = useState ([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([""])
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(15, 16 * page);
      const promise = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promise)
      setPokemons(results)
      setLoading(false)
      setTotal(Math.ceil(data.count / 15 ))
      setNotFound(false)
    } catch (error) {
      
    }
  }

  const loadFavoritePokemon= () =>{
    const pokemon = 
    JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemon)
  }

  useEffect(() => {
    loadFavoritePokemon()
  }, [])

  useEffect(() => {
    if(!searching){
      fetchPokemons();
    }
  }, [page])


  const updateFavoritePokemon = (name) => {
    const updated = [...favorites]
    const isFavorite = updated.indexOf(name)
    if(isFavorite >= 0){
      updated.splice(isFavorite, 1)
    }else{
      updated.push(name)
    }
    setFavorites(updated)
    window.localStorage.setItem(localStorageKey,
      JSON.stringify(updated)
      )
  }

  const onSearch = async(pokemons) => {
    if(!pokemons){
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    setSearching(true)
    const result = await searchPokemon(pokemons)
    if(!result){
      setNotFound(true)
      setLoading(false)
      return         
    }else{
      setPokemons([result])
      setPage(0)
      setTotal(1)
    }
    
    setLoading(false)
    setSearching(false)
  }

  return (
    <FavoriteProvider 
    value={{
      favoritePokemon: favorites, 
      updateFavoritePokemon: updateFavoritePokemon
      }}>
      <div>
        <Navbar />
        <div className="App">
        <Searchbar onSearch={onSearch}  />
        {notFound ? (
        <h1 className="not.found-text">No se encontro el pokemon que buscabas 😭</h1>
        ):(
        <Pokedex 
        loading={loading}
        pokemons={pokemons} 
        page={page}
        setPage={setPage}
        total={total}
        />
        )}
      </div>
    </div>
    </FavoriteProvider>
  );
}

export default App;
