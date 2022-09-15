import {useState} from 'react'
import logo from '../images/penguin.png'
import styles from "./Login.module.css";
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import ToDo from '../components/ToDo';
import axios from 'axios';

function Login({toDos, addToDo}) {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  function onChange(event){
    setText(event.target.value)
  }
  function onSubmit(event){
    event.preventDefault();
    addToDo(text)
    setText("")
  }

  const Login = async () => {
    axios.get( 'http://localhost:8080/feed/', 
    ) 
      .then((response) => { console.log(response.data); }) 
      .catch((error) => { console.log(error) });
  };

  const clickLogin = () => {
    Login();
  }

  return (
    <div className={styles.login}>
      <div className={styles.login_items}>
        <form onSubmit={onSubmit}>
          <input type="text" value={text} onChange={onChange} />
          <button>Add</button>
        </form>
        <ul>{JSON.stringify(toDos)}</ul>
        <ul>
          {toDos.map(toDo => (
            <ToDo {...toDo} key={toDo.id}/>
          ))}
        </ul>
        <img src={logo} alt="logo"/>
        <h1 className={styles.pjt_name}>우리어디가?</h1>
        <br />
        <button onClick={() => navigate('/main')} className={styles.main_button}>카카오톡으로 로그인하기</button>
        <a onClick={clickLogin} class="btn btn-third active" role="button">Kakao Login</a>
        <p onClick={() => navigate('/main')} className={styles.sub_button}>로그인없이 사용하기</p>
      </div>
    </div>
  );
}

function mapStateToProps(state){
  return { toDos: state}
}

function mapDispatchToProps(dispatch){
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);