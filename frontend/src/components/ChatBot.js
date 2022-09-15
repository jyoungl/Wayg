import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import store from "../store"
import logo from '../images/penguin.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";




function ChatBot({parentFunction, addFeed}) {
  const [greeting,setGreeting] = useState(false)
  const [send, setSend] = useState("")
  const [sends, setSends] = useState([])

  const onChange = (event) => setSend(event.target.value)
  const onSubmit = (event) => {
    event.preventDefault();
    if (send ==="") {
      return
    }
    setSends((currentArray) => [...currentArray,send])
    setSend("")
  }
  console.log(sends)
  

  useEffect(() => {
    console.log("penguin")
    setGreeting((current) => !current)
  },[])
  return (
    <div className={styles.chatbot}>
      <div className={styles.chatbot_title}>
        <div>wayg</div>
      </div>
      <br />
      {greeting ? (
        <div>
          <img className={styles.penguin} src={logo} alt="penguin" />
          <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
        </div> ) : null}

      <div className={styles.chatting}> 
        <FontAwesomeIcon icon={faBars} />
        <form onSubmit={onSubmit}>
          <input className={styles.sendInput} onChange={onChange} value={send} type="text" placeholder="내용입력" />
          <button className={styles.chatBtn}>보내기</button>
        </form>
      </div>
      
      <ul>
        {sends.map((send, idx) => (
            <div className={styles.sendMessage} key={idx}>
              {send}
            </div>
        ))}
      </ul>


      {addFeed ? <button onClick={parentFunction}>되돌아가기</button>:<button onClick={parentFunction}>피드작성하기</button>}


    </div>
  );
}

export default ChatBot;