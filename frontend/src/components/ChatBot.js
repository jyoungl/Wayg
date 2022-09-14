import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";

function ChatBot({parentFunction, addFeed}) {

  return (
    <div className={styles.chatbot}>
      <h2>ChatBot</h2>
      {addFeed ? <button onClick={parentFunction}>되돌아가기</button>:<button onClick={parentFunction}>피드작성하기</button>}


    </div>
  );
}

export default ChatBot;