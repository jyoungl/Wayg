import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import store from "../store"

function ChatBot() {
  const [createFeed, setCreateFeed] = useState(false)
  const makeFeed = () => {
    setCreateFeed((current) => !current)
    console.log("create Feed")
  }
  return (
    <div className={styles.chatbot}>
      <h2>ChatBot</h2>
      <button onClick={makeFeed}>피드작성하기</button>
    </div>
  );
}

export default ChatBot;