import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";
import Shows from "../components/Shows"
import Loading from "../components/Loading"
import styles from "./Main.module.css"


function Main() {
  
  // 기본 화면(로딩화면?)으로 돌아가기
  const [loadingScreen, setLoadingScreen] = useState(true)
  const goLoadingScreen = () => {
    setLoadingScreen((current)=> !current)
  }

  // 피드 작성하기
  const [addFeed, setAddFeed] = useState(false)
  const parentFunction = () => {
    setAddFeed((current)=> !current)
  }

  // 좋아요 누른 피드 보러가기
  const [likeFeed, setLikeFeed] = useState(false)
  const goLikeFeed = () => {
    setLikeFeed((current)=> !current)
  }

  return (

    <div className={styles.main}>
      <div className={styles.ChatBot}>
        <ChatBot addFeed={addFeed} parentFunction={parentFunction} goLikeFeed={goLikeFeed} goLoadingScreen={goLoadingScreen}/>
      </div>
      <div className={styles.detail}>
        {/* <button className={styles.logout_button} onclick={kakaoLogout()}>로그아웃</button> */}
        {loadingScreen ? 
        <div className="d-flex-row justify-content-center">
          <br />
          <Feeds/>
          <br />
          <Recommendations/>
        </div>
           : null}

        {addFeed ?  <CreateFeed/>: null }
        {likeFeed ? 
        <div>
          <Shows/>
        </div> : null}
      </div>

    </div>
  );
}

export default Main;
