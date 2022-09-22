// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Login from "./routes/Login"
import Main from "./routes/Main"
import KakaoRedirectHandler from "./routes/KakaoRedirectHandler";

function App() {
  return (
  <Router>
    <Routes/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
    </Routes>
  </Router>
  );
}

export default App;
