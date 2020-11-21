import MiniDrawer from "./components/MiniDrawer";
import MovieContainer from "./components/MovieContainer";
function App() {
  return (
    <div className="App">
      <MiniDrawer>
        <MovieContainer />
      </MiniDrawer>
    </div>
  );
}

export default App;
