// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Main from "./routes/Main"

function App() {
  return (
  <Router>
    <Routes/>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </Router>
  );
}

export default App;
