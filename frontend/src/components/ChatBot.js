import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import woori from '../images/wayg.png'
import woori2 from '../images/wayg2.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import CreateFeed from './CreateFeed'

function ChatBot({parentFunction, addFeed, goLikeFeed, goLoadingScreen, goMyFeed, goScrapPlace}) {
  // 데이터전송 axios를 위한 useState()
  const [receives, setReceives] = useState([]);
  const [receive, setReceive] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [greeting,setGreeting] = useState(false)
  const [send, setSend] = useState("")
  const [sends, setSends] = useState([])
  const [upfunc, setUpFunc] = useState(false)
  const [story, setStory] = useState([])
  const [returnMessage, setReturnMessage] = useState(false)
  const [handle, setHandle] = useState(false);
  const [chat, setChat] = useState([])

  const createFeed = () => setHandle(true)
  const handleClose = () => setHandle(false);
  const onChange = (event) => setSend(event.target.value)
  
  useEffect( () => {
    // console.log("penguin")
    // setGreeting((current) => !current)
    setChat((currentArray) => [...currentArray, ['woori', "안녕? 추천받고 싶은 여행지가 있니?"]]);
    
    setStory(story.concat(
      <div>
        <img className={styles.chatbot_woori} src={woori} alt="character" />
        <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
      </div>
    ))
  },[])
/////////////////////////////////
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     console.log(sends)
  //     if (greeting ===true) {

      
  //     try {
  //       // setError(null);
  //       // // setUsers(null)
  //       // setReceive('');
  //       // setReceives([]);
  //       // setLoading(false);
  
  //       const response = await axios.get(
  //         // process.env.REACT_APP_HOST_FLASK+`morph?text=${sends[sends.length-1]}`
  //         process.env.REACT_APP_HOST + `/place/search?keyword=${sends[sends.length-1]}`
  //       );
  //       console.log(response.data)
  //       // if (response.data[0][0]==='undefined') {
  //       //   return
  //       //     // response.data.pop()
  //       // }
  //       setReceive(() => setReceive(JSON.stringify(response.data.placeList)))
  //       setReceives((currentArray) => [...currentArray,receive])
  //       console.log(receive)
  //       console.log(receives)
  //       console.log(response.data.placeList[0])
  //       console.log(response.data.message)
  //       ///
  //       if (response.data.message === 'succeess') {
  //         console.log('hihi')
  //         setStory(story.concat(
  //           <div>
  //             <div className={styles.receivedMessage}>{response.data.placeList[0]}</div>
  //           </div>
  //         ))
  //       }
  //     } catch (e) {
  //       setError(e);
  //     }
  //     setLoading(false)
  //   } 
  // }

  //   fetchUsers();

  // }, [greeting, returnMessage])

  // const search = async () => {
  //   const res = await axios.get(process.env.REACT_APP_HOST + `/place/search?keyword=${send}`);
  //   if (res.data){
  //     console.log(res.data)
  //     if (res.data.message === 'succeess') {
  //       await setChat((currentArray) => [...currentArray, ['woori', res.data.placeList[0]]]);
  //       setStory(story.concat(
  //         <div>
  //           <div className={styles.receivedMessage}>{res.data.placeList[0]}</div>
  //         </div>
  //       ))
  //     }
  //   } else {
  //     console.log(res)
  //   }
  // }

  const onSubmit = async (event) => {
    event.preventDefault();
    
    await setSends((currentArray) => [...currentArray,send]);
    await setChat((currentArray) => [...currentArray, ['user', send]]);
    // await setStory(story.concat(
    //   <div>
    //     <div className={styles.sendMessage}>{send}</div>
    //   </div>
    // ))
    // await search()
    const res = await axios.get(process.env.REACT_APP_HOST + `/place/search?keyword=${send}`);
    if (res.data){
      console.log(res.data)
      if (res.data.message === 'success') {
        await setChat((currentArray) => [...currentArray, ['woori', res.data.placeList[0]]]);
        // setStory(story.concat(
        //   <div>
        //     <div className={styles.receivedMessage}>{res.data.placeList[0]}</div>
        //   </div>
        // ))
      }
    } else {
      console.log(res)
    }
    setSend("")
    // await setReturnMessage((event) => (!event))
  }




  const upAnotherFunction = () => {
    setUpFunc(current => !current)
  }
    




  if (loading) return <div>로딩중..</div>
  // if (error) return <div>에러가 발생 하였습니다.</div>
  return (
      <div className={styles.chatbot}>
        <div className={styles.chatbot_title}>
          <div>'우리'랑 대화</div>
        </div>
        
        <br />
        {/* {greeting ? (
        <div>
          <img className={styles.chatbot_woori} src={woori} alt="character" />
          <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
        </div> ) : null} */}
      
        {upfunc ? <ul className={styles.anotherFunction}>
        <li>대화 새로 시작하기</li>
        <li onClick={() => {goLoadingScreen()}}>이번달 인기피드 보러가기</li>
        <li onClick={() => {goLikeFeed();}}>내가 좋아요 누른 피드 보러가기</li>
        <li onClick={() => {goScrapPlace();}}>내가 스크랩한 관광지 보러가기</li>
        <li onClick={() => {goMyFeed();}}>내가 올린 피드보기</li>
        <li onClick={() => {createFeed(); }}>피드작성하기</li>


      </ul>: null}
      
      <div className={styles.chatting}> 
        <FontAwesomeIcon className="additionalBtn fa-2xl" onClick={upAnotherFunction} icon={faBars} />
        <form onSubmit={onSubmit}>
          <input className={styles.sendInput} onChange={onChange} value={send} type="text" placeholder="내용입력" />
          <button className={styles.chatBtn}>보내기</button>
        </form>
      </div>
      {/* 여기는 채팅 내용 ui */}
      {/* <ul>
        {story}
      </ul> */}

      <div>
        {chat.map((chat,idx) => (
          <div key={idx}>
            { chat[0] === "woori" ? 
            <div className={styles.message_woori}>
              <img className={styles.chatbot_wayg} src={woori} alt="character" />
              <span className={styles.receivedMessage}>{chat[1]}</span>
            </div> 
            : null }
            { chat[0] === "user" ? 
            <div className={styles.message_user}>
              <span className={styles.sendMessage}>{chat[1]}</span>
              <img className={styles.chatbot_wayg} src={woori2} alt="character" />
            </div> 
            : null }
          </div>
        ))}
      </div>

      {/* 모달 */}
      <Modal show={handle} onHide={handleClose}>
        <CreateFeed></CreateFeed>
      </Modal>
    </div>
  );
}

export default ChatBot;