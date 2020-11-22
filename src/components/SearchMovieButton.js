import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchMovieButton = ({ isLoading, onClickHandler }) => {
  if (isLoading)
    return (
      <Button disabled size="large" variant="outlined" color="primary">
        <CircularProgress color="secondary" />
      </Button>
    );
  return (
    <Button
      size="large"
      startIcon={<Search />}
      variant="outlined"
      color="secondary"
      onClick={onClickHandler}
    >
      Let it be!
    </Button>
  );
};

export default SearchMovieButton;
