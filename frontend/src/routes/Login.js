import {useState, useEffect} from 'react'
import woori from '../images/wayg2.png'
import bus from '../images/bus.png'
import kakaoBtn from "../images/kakao_login_large_narrow.png"
import styles from "./Login.module.css";

// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import axios from 'axios';

function Login({toDos, addToDo}) {
  const navigate = useNavigate();
  
  const REST_API_KEY = "f97c174637b7c5eb1ed49c135dcc8b7a"
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  
  // const LOGOUT_REDIRECT_URI = "http://localhost:3000"
  // const JS_KEY = 'f33b6403dcd4f32d57b46564676b0596'
  // window.Kakao.init(JS_KEY)

  // const kakaoLogin = () => {
  //   window.Kakao.Auth.login({
  //     scope: 'profile_nickname, profile_image, account_email, gender, age_range',
  //     success: (authObj) => {
  //       console.log(authObj);
  //       window.Kakao.API.request({
  //         url: '/v2/user/me',
  //         success: res => {
  //           const kakao_account = res.kakao_account;
  //           console.log(res);
  //           console.log(kakao_account.email)
  //           navigate('/main');
  //         }
  //       });
  //     }
  //   });
  // }

  // const clickLogin = () => {
  //   kakaoLogin();
  // }

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
          <a href={KAKAO_AUTH_URL}>
            <img
              src={kakaoBtn}
              className={styles.kakao_btn}
              alt="카카오 로그인 버튼"
            />
          </a>
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