import React from 'react'

const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language} }) => {
    return (
        <div className="movie-card">

            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} />
            <h3 className="text-white">{title}</h3>
            <p className="text-white">{release_date}</p>
            <p className="text-white">{original_language}</p>
            <p className="text-white">{vote_average}</p>

        </div>
    )
}
export default MovieCard
