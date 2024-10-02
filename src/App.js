import { memo } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
const App = memo(function App() {
  return <div className="App container mx-auto">
      <Home />
    </div>;
});
export default App;