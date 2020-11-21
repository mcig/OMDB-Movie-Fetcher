import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const MovieSearchForm = ({ setSearchRes, id }) => {
  //States
  const [searchedStr, setSearchedStr] = useState("");
  //Handlers
  const handleSearchSubmit = async () => {
    const str = searchedStr;
    setSearchedStr("");
    const res = await searchApiCall(str);
    console.log("Made an Api Call");
    setSearchRes(res);
  };
  //Helpers
  const searchApiCall = async (searchedStr) => {
    const respSearch = await fetch(
      `https://www.omdbapi.com/?s=${searchedStr}&apikey=300dade0`
    );
    const jsonSearch = await respSearch.json();
    if (jsonSearch.Response === "False") return null;
    const respId = await fetch(
      `https://www.omdbapi.com/?i=${jsonSearch.Search[0].imdbID}&apikey=300dade0`
    );
    const jsonId = await respId.json();
    return jsonId || null;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
      <Button
        size="large"
        endIcon={<Search />}
        variant="outlined"
        color="secondary"
        onClick={handleSearchSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default MovieSearchForm;
