// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Main from "./routes/Main"
import Login from "./routes/Login"
import Feed from "./routes/Feed"
import Course from "./routes/Course"
import Navigation from "./components/Navigation"


function App() {
  return (
  <Router>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  </Router>
  );
}

export default App;
