import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";
import styles from "./Main.module.css"

function Main() {

  const [addFeed, setAddFeed] = useState(false)
  const parentFunction = () => {
    setAddFeed((current)=> !current)
  }
  return (

    <div className={styles.main}>
      <div className={styles.ChatBot}>
        <ChatBot addFeed={addFeed} parentFunction={parentFunction}/>
      </div>
      <div className={styles.detail}>
        {addFeed ?  <CreateFeed></CreateFeed>:<div className="d-flex-row justify-content-center">
          <br />
          <Feeds/>
          <br />
          <Recommendations/>
        </div>}
      </div>
    </div>
  );
}

export default Main;
