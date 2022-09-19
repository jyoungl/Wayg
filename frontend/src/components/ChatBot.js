import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import store from "../store"
import wayg from '../images/wayg.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";




function ChatBot({parentFunction, addFeed}) {
  const [greeting,setGreeting] = useState(false)
  const [send, setSend] = useState("")
  const [sends, setSends] = useState([])
  const [upfunc, setUpFunc] = useState(false)


  console.log(upfunc)
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
  const upAnotherFunction = () => {
    setUpFunc(current => !current)
  }
    

  // useEffect(() => {

  // },[upfunc])
  

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
          <img className={styles.chatbot_wayg} src={wayg} alt="character" />
          <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
        </div> ) : null}
      
        {upfunc ? <ul className={styles.anotherFunction}>
        <li>대화 새로 시작하기</li>
        <li>이번달 인기피드 보러가기</li>
        <li>내가 좋아요 누른 피드 보러가기</li>
        <li>내가 즐겨찾기한 관광지 보러가기</li>
        <li>내가 올린 피드보기</li>
        {addFeed ? <li onClick={parentFunction}>되돌아가기</li>:<li onClick={parentFunction}>피드작성하기</li>}
      </ul>: null}

      <div className={styles.chatting}> 
        <FontAwesomeIcon className="additionalBtn fa-2xl" onClick={upAnotherFunction} icon={faBars} />
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

    </div>
  );
}

export default ChatBot;