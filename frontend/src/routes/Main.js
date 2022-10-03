import React, {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";
import Shows from "../components/Shows";
import LikeShows from "../components/LikeShows";
import Loading from "../components/Loading";
import styles from "./Main.module.css";
import { connect } from "react-redux";


function Main({counter}) {

  // useEffect(()=> {
  //   let params = new URL(document.location.toString()).searchParams;
  //   let access_token = params.get("access_token"); // 토큰 받는 부분
  //   let user_no = params.get("id"); // userNo 받는 부분
  //   console.log(access_token)
  //   console.log(user_no)

  // }, [])
  
  // 기본 화면(로딩화면?)으로 돌아가기
  const [search, setSearch] = useState(true)
  const goSearch = () => {
    setSearch((current)=> true)
    setPopular(false)
    setLikeFeed(false)
    setMyFeed(false)
    setAddFeed(false)
    setScrapPlace(false)
  }

  //인기 항목
  const [popular, setPopular] = useState(false)
  const goPopular = () => {
    setPopular((current)=> true)
    setSearch(false)
    setLikeFeed(false)
    setMyFeed(false)
    setAddFeed(false)
    setScrapPlace(false)
  }

  // 피드 작성하기
  const [addFeed, setAddFeed] = useState(false)
  const parentFunction = () => {
    if (counter.userNo !==0) {
    setAddFeed((current)=> true)
    setLikeFeed(false)
    setMyFeed(false)
    setPopular(false)
    setScrapPlace(false)
    setSearch(false)
  } else {
    alert('로그인 후 이용해주세요')
  }
}

  // 좋아요 누른 피드 보러가기
  const [likeFeed, setLikeFeed] = useState(false)
  const goLikeFeed = () => {
    if (counter.userNo !==0) {
    setLikeFeed((current)=> true)
    setAddFeed(false)
    setMyFeed(false)
    setPopular(false)
    setScrapPlace(false)
    setSearch(false)
  } else {
    alert('로그인 후 이용해주세요')
  }
}
  //내가 작성한 피드 보러가기
  const [myFeed, setMyFeed] = useState(false)
  const goMyFeed = () => {
  if (counter.userNo !==0) {
    setMyFeed((current) => true)
    setLikeFeed(false)
    setAddFeed(false)
    setPopular(false)
    setScrapPlace(false)
    setSearch(false)
  } else {
    alert('로그인 후 이용해주세요')
  }
}

  //내가 스크랩한 여행지 보러가기
  const [scrapPlace, setScrapPlace] = useState(false)
  const goScrapPlace = () => {
    if (counter.userNo !==0) {
    setScrapPlace((current) => true)
    setMyFeed(false)
    setLikeFeed(false)
    setAddFeed(false)
    setPopular(false)
    setSearch(false)
  } else {
    alert('로그인 후 이용해주세요')
  }
}

  return (

    <div className={styles.main}>
      <div className={styles.ChatBot}>
        <ChatBot addFeed={addFeed} parentFunction={parentFunction} goSearch={goSearch} goLikeFeed={goLikeFeed} goPopular={goPopular} goMyFeed={goMyFeed} goScrapPlace={goScrapPlace}/>
      </div>
      <div className={styles.right}>
      <div className={styles.detail}>
        {search ?
        <div>
          <Shows search={search} scrapPlace={scrapPlace} likeFeed={likeFeed} myFeed={myFeed}/>
        </div> 
        : null }

        {popular ? 
          // <Loading />
        <div className={styles.popular}>
          <br />
          <Feeds/>
          <br />
          <Recommendations/>
        </div>
           : null}

        {/* {addFeed ?  <CreateFeed/>: null } */}
        {likeFeed ? 
        <div>
          <Shows search={search} scrapPlace={scrapPlace} likeFeed={likeFeed} myFeed={myFeed}/>
        </div> : null}
        {myFeed ?
        <div><Shows search={search} crapPlace={scrapPlace} myFeed={myFeed} likeFeed={likeFeed} />
        </div> : null 
        }
        {scrapPlace ? 
        <div>
          <Shows search={search} scrapPlace={scrapPlace} likeFeed={likeFeed} myFeed={myFeed}/>
        </div> : null}
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});
export default connect(
  mapStateToProps,
)(Main);