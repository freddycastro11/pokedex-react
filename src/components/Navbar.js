import React from 'react'
import FavoriteContext from '../contexts/favoriteContext';

const {useContext} = React

const Navbar = () => {
    const {favoritePokemon} = useContext(FavoriteContext)

    let imgPokeApi ="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

    return (
        <nav>
            <div/>
                <div>
                    <img 
                    src={imgPokeApi} 
                    alt="PokeApi" 
                    className="navbar-image"
                />
                </div>
                    <div>❤️{favoritePokemon.length}</div>
            <div/>
        </nav>
    )
}

export default Navbar
