import { useEffect, useState } from "react";
import Movie from "./components/Movie";

function App() {
  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(APIURL);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCHAPI + searchTerm);
      setSearchTerm("");
    }
  };

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="search"
            value={searchTerm}
            onChange={changeHandler}
          />
        </form>
      </header>
      <div className="movie-wrapper">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
