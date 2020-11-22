import { useState } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import PopUpDialog from "./PopUpDialog";
import SearchMovieButton from "./SearchMovieButton";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

const MovieSearchForm = ({ setSearchRes, id }) => {
  //States
  const [searchedStr, setSearchedStr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [couldNotFound, setCouldNotFound] = useState(false);

  //Event Handlers
  const handleSearchSubmit = async () => {
    setIsLoading(true);
    const str = searchedStr;
    setSearchedStr("");
    const res = await searchApiCall(str);
    console.log("Made an Api Call");
    setSearchRes(res);
    setIsLoading(false);
  };
  const handleResponseType = (Response) => {
    if (Response === "True") {
      setCouldNotFound(false);
    } else {
      setCouldNotFound(true);
    }
  };

  //Helpers
  const searchApiCall = async (searchedStr) => {
    const respSearch = await fetch(
      `https://www.omdbapi.com/?s=${searchedStr}&apikey=300dade0`
    );
    const jsonSearch = await respSearch.json();
    handleResponseType(jsonSearch.Response);
    if (jsonSearch.Response === "False") return null;
    const respId = await fetch(
      `https://www.omdbapi.com/?i=${jsonSearch.Search[0].imdbID}&apikey=300dade0`
    );
    const jsonId = await respId.json();
    handleResponseType(jsonId.Response);
    if (jsonId.Response === "False") return null;
    return jsonId;
  };

  //Style
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Search For a Movie or Series:</h2>
      <TextField
        style={{ marginBottom: "2px" }}
        id={id}
        color="secondary"
        placeholder="Inception, Doctor Who..."
        label="Start Searching!!!"
        variant="outlined"
        value={searchedStr}
        onChange={(e) => setSearchedStr(e.target.value)}
        onKeyDown={(e) => (e.target.keycode === 13 ? handleSearchSubmit : null)}
      />
      <SearchMovieButton
        isLoading={isLoading}
        onClickHandler={handleSearchSubmit}
      />
      <PopUpDialog open={couldNotFound} setOpen={setCouldNotFound}>
        There is not a movie nor a series like that in our Database. Please
        Check Your Spelling and Try Again.
      </PopUpDialog>
    </div>
  );
};

export default MovieSearchForm;
