// import {useEffect, useState} from 'react'
import logo from '../images/penguin.png'
import styles from "./Login.module.css";
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      <div className={styles.login_items}>
        <img src={logo} alt="logo"/>
        <h1 className={styles.pjt_name}>우리어디가?</h1>
        <br />
        <button onClick={() => navigate('/main')} className={styles.main_button}>카카오톡으로 로그인하기</button>
        <p onClick={() => navigate('/main')} className={styles.sub_button}>로그인없이 사용하기</p>
      </div>
    </div>
  );
}

export default Login;