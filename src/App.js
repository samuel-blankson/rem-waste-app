import Skips from "./pages/Skips";
import "./index.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar currentStage="skip" />
      <Skips />
    </div>
  );
}

export default App;
