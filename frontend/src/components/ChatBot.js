import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import logo from '../images/penguin.png'


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
      <h2>ChatBot</h2>
      {greeting ? <div><img className={styles.penguin} src={logo} alt="penguin" /><span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span></div>: null}
      <form className={styles.chatting} onSubmit={onSubmit}>
        <input className={styles.sendInput} onChange={onChange} value={send} type="text" placeholder="내용입력" />
        <button className={styles.chatBtn}>보내기</button>
      </form>
      <ul>
        {sends.map((item, index) => (

            <div className={styles.sentMessage} key={index}>
              {item}
            </div>


        ))}
      </ul>


      {addFeed ? <button onClick={parentFunction}>되돌아가기</button>:<button onClick={parentFunction}>피드작성하기</button>}


    </div>
  );
}

export default ChatBot;