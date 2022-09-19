import {useState} from 'react'
import woori from '../images/wayg2.png'
import bus from '../images/bus.png'
import styles from "./Login.module.css";
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import axios from 'axios';

function Login({toDos, addToDo}) {
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = "";

  const Login = async () => {
    axios.get( 'http://localhost:8080/api/oauth2/authorization/kakao', 
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
        <h1 className={styles.pjt_name}>우리어디가?</h1>
        <div className={styles.container}>
          <div className={styles.box}>
          <div className={styles.login_woori}>
              <img style={{width: "125px", height: "125px"}} src={woori} alt="woori"/>
            </div>
            <div className={styles.login_bus}>
              <img style={{width: "250px", height: "250px"}} src={bus} alt="bus"/>
            </div>
            
          </div>
        </div>
        <div className={styles.button}>
          <button onClick={() => navigate('/main')} className={styles.main_button}>카카오톡으로 로그인하기</button>
          <a onClick={clickLogin} className={styles.kakao_btn} role="button">Kakao Login</a>
          {/* <a href={KAKAO_AUTH_URL}>
            <div 
                className={styles.kakao_btn} 
                >
            </div>
          </a> */}
          <p onClick={() => navigate('/main')} className={styles.sub_button}>로그인없이 사용하기</p>
        </div>
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