import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";
import Shows from "../components/Shows"
import styles from "./Main.module.css"

function Main() {
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
        <ChatBot addFeed={addFeed} parentFunction={parentFunction}/>
      </div>
      <div className={styles.detail}>
        {addFeed ? <div className={styles.right}>
          <CreateFeed/>
        </div>:<div className="d-flex-row justify-content-center">
          <br />
          <Feeds/>
          <br />
          <Recommendations/>
        </div>}
        {/* <div>
          <Shows/>
        </div> */}
      </div>
    </div>
  );
}

export default Main;
