import "./App.css";
import Login from "./components/Login";
import Query from "./components/Query";

function App() {
  return (
    <div className="app d-flex justify-content-center align-items-center bg-dark">
      <Login />
      <Query />
    </div>
  );
}

export default App;
