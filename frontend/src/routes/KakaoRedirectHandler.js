import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './KakaoRedirectHandler.module.css'
import woori from '../images/wayg2.png'
import bus from '../images/bus.png'


const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(()=> {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "f97c174637b7c5eb1ed49c135dcc8b7a";
    let REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
    let client_secret = 'VaCa6ODUTqQetoam3pifNb0Ac3zsPiVK';

    axios.post(`https://kauth.kakao.com/oauth/token?&grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}&client_secret=${client_secret}`, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        } 
      }).then((res) => {
      console.log(res)
      console.log(res.data['access_token'])
      // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
      setTimeout(() => {navigate('/main')}, 2000)
  })
    // setTimeout(() => {navigate('/main')}, 6000)
  }, [])

  return (
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
  );
};

export default KakaoRedirectHandler;