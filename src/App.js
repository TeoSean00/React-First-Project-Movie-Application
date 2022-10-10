import React from 'react'
import {useState, useEffect} from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

// Go to http://omdbapi.com/apikey.aspx to get your own API key
const APIKey = 'insert your generated API key here'
const APIURL = `http://www.omdbapi.com?apikey=${APIKey}`

// For static demo purposes,
// const movie1 = {
//     Poster: "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
//     Title: "Italian Spiderman",
//     Type: "movie",
//     Year: "2007",
//     imdbID: "tt2705436"  
// }

const App = () => {
    const[movies, setMovies] = useState([])
    const[searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${APIURL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('spiderman')
    }, [])

    return(
        <div className='app'>
            <h1>MovieApp</h1>

            <div className='search'>
                <input 
                placeholder = 'Search for movies'
                value = {searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
                />

                <img
                src={SearchIcon}
                alt="search"
                onClick = {() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    )
}

export default App