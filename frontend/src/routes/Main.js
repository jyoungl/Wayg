import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";
import Shows from "../components/Shows"
import LikeShows from "../components/LikeShows"
import Loading from "../components/Loading"
import styles from "./Main.module.css"




function Main() {
  
  // 기본 화면(로딩화면?)으로 돌아가기
  const [loadingScreen, setLoadingScreen] = useState(true)
  const goLoadingScreen = () => {
    setLoadingScreen((current)=> true)
    setLikeFeed(false)
    setMyFeed(false)
    setAddFeed(false)
    setScrapPlace(false)
  }

  // 피드 작성하기
  const [addFeed, setAddFeed] = useState(false)
  const parentFunction = () => {
    setAddFeed((current)=> true)
    setLikeFeed(false)
    setMyFeed(false)
    setLoadingScreen(false)
    setScrapPlace(false)
  }

  // 좋아요 누른 피드 보러가기
  const [likeFeed, setLikeFeed] = useState(false)
  const goLikeFeed = () => {
    setLikeFeed((current)=> true)
    setAddFeed(false)
    setMyFeed(false)
    setLoadingScreen(false)
    setScrapPlace(false)
  }
  //내가 작성한 피드 보러가기
  const [myFeed, setMyFeed] = useState(false)
  const goMyFeed = () => {
    setMyFeed((current) => true)
    setLikeFeed(false)
    setAddFeed(false)
    setLoadingScreen(false)
    setScrapPlace(false)
  }

  //내가 스크랩한 여행지 보러가기
  const [scrapPlace, setScrapPlace] = useState(false)
  const goScrapPlace = () => {
    setScrapPlace((current) => true)
    setMyFeed(false)
    setLikeFeed(false)
    setAddFeed(false)
    setLoadingScreen(false)
  }

  return (

    <div className={styles.main}>
      <div className={styles.ChatBot}>
        <ChatBot addFeed={addFeed} parentFunction={parentFunction} goLikeFeed={goLikeFeed} goLoadingScreen={goLoadingScreen} goMyFeed={goMyFeed} goScrapPlace={goScrapPlace}/>
      </div>
      <div className={styles.detail}>
        {loadingScreen ? 
          // <Loading />
        <div className="d-flex-row justify-content-center">

          <br />
          <Feeds/>
          <br />
          <Recommendations/>
        </div>
           : null}

        {/* {addFeed ?  <CreateFeed/>: null } */}
        {likeFeed ? 
        <div>
          <Shows scrapPlace={scrapPlace} likeFeed={likeFeed} myFeed={myFeed}/>
        </div> : null}
        {myFeed ?
        <div><Shows scrapPlace={scrapPlace} myFeed={myFeed} likeFeed={likeFeed} />
        </div> : null 
        }
        {scrapPlace ? 
        <div>
          <Shows scrapPlace={scrapPlace} likeFeed={likeFeed} myFeed={myFeed}/>
        </div> : null}
      </div>

    </div>
  );
}

export default Main;
