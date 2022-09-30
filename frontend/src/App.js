// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom"
import Login from "./routes/Login"
import Main from "./routes/Main"
import KakaoRedirectHandler from "./routes/KakaoRedirectHandler";
import Recommendation from "./components/Recommendation"
import FeedShare from "./components/FeedShare"
import { connect } from "react-redux";
import { save } from ".";

function App({counter, save}) {
  let { placeNo } =useParams(); 
  let { feedNo } =useParams();
  return (
  <Router>
    <Routes/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/loginHandler" element={<KakaoRedirectHandler />} />
      <Route path="/main/detail/Recommendation/:placeNo" element={<Recommendation />} />
      <Route path="/main/detail/FeedShare/:feedNo" element={<FeedShare />}/>
    </Routes>
  </Router>
  );
}

// export default App;

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});
const mapDispatchToProps = dispatch => ({
  save: () => dispatch(save())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
