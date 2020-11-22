import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Movie from "./Movie";
import MovieSearchForm from "./MovieSearchForm";

const MovieContainer = () => {
  //States
  const [movies, setMovies] = useState([]);
  const [searchRes, setSearchRes] = useState(null);

  useEffect(() => {
    if (searchRes) {
      setMovies([...movies, searchRes]);
    }
  }, [searchRes]);

  return (
    <div>
      <MovieSearchForm setSearchRes={setSearchRes} id="input-home" />
      <Grid style={{ marginTop: "20px" }} spacing={3} container>
        {movies.map((movie, idx) => (
          <Grid key={idx} item>
            <Movie movie={movie} />
          </Grid>
        ))}
      </Grid>
      <h6>
        These movie datas are fetched from{" "}
        <a href="http://www.omdbapi.com/">OMDB APi</a>
      </h6>
    </div>
  );
};

export default MovieContainer;
