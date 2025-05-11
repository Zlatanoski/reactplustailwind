import React, {useState , useEffect} from 'react'
import Search from "./components/search.jsx";
import MovieCard from "./components/MovieCard.jsx";

    //API - Application Programming Interface - a set of rules that allow one software to talk to another
    const API_BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const API_OPTIONS = {
      method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`Bearer ${API_KEY}`
        }
    }

const App = () => {

    //UseState hook
    const [searchTerm, setSearchTerm] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[movieList, setMovieList] = useState([]);
    const[isLoading,setIsLoading] = useState(false);



    const fetchMovies = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try{
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if(!response.ok){
                    throw new Error(`Failed to fetch movies `);
            }

            const data = await response.json();
            if(data.Response === 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies ');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);

        }catch(error){
            console.error(`Error fetching movies: ${error}`);

        }finally {
            setIsLoading(false); //Stop the loading no matter if we succeeded in fetching the API or failed.
        }
    }

    //UseEffect hook for something that happens outside of the component render cycle (Fetchind Data from API)
    useEffect(() => {
        fetchMovies();
    },[])

    return (
        <main>
            <div className="pattern">
                <div className="wrapper">
                     <header>
                         <img  src="./hero.png" alt="Hero Banner"/>
                         <h1>Find <span className="text-gradient">movies</span> You'll enjoy without the hassle  </h1>
                         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                     </header>
                    <section className="all-movies">
                        <h2>All movies</h2>
                        {isLoading?(
                            <p className="text-white">Loading...</p>
                        ): errorMessage?(
                            <p className="text-red-500">{errorMessage}</p>
                        ):(
                            <ul>
                                {movieList.map((movie)=>(
                                    <MovieCard key={movie.id} movie={movie}/>

                                ))}
                            </ul>
                        )}
                    </section>


                </div>
            </div>
        </main>
    )
}
export default App
