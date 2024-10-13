import "./App.css";
import Home from "./Pages/Home/Home";
function App() {
  console.log(window.globalCount++);
  return <div className="App container mx-auto">
      <Home />
    </div>;
}
export default App;