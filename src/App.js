import MiniDrawer from "./components/MiniDrawer";
import MovieContainer from "./components/MovieContainer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const NetflixLightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#e50914",
    },
  },
  fontFamily: "Roboto",
});

function App() {
  return (
    <ThemeProvider theme={NetflixLightTheme}>
      <div className="App">
        <MiniDrawer>
          <MovieContainer />
        </MiniDrawer>
      </div>
    </ThemeProvider>
  );
}

export default App;
