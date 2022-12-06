import "./App.css";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
