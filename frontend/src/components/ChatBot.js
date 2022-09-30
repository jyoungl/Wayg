import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import woori from '../images/wayg.png'
import woori2 from '../images/wayg2.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import CreateFeed from './CreateFeed'

import { connect } from "react-redux";
import { save } from "../index";

function ChatBot({parentFunction, addFeed, counter, save, goSearch ,goLikeFeed, goPopular, goMyFeed, goScrapPlace}) {
  // 데이터전송 axios를 위한 useState()
  const [receives, setReceives] = useState([]);
  const [receive, setReceive] = useState('');
  const [error, setError] = useState(null);
  const [greeting,setGreeting] = useState(false)
  const [sends, setSends] = useState([])
  const [returnMessage, setReturnMessage] = useState(false)
  const [loading, setLoading] = useState(false);

  const [handle, setHandle] = useState(false);
  const [chat, setChat] = useState([])
  const [upfunc, setUpFunc] = useState(false)
  const [story, setStory] = useState([])
  const [send, setSend] = useState("")
  // 결과값 저장
  const [results, setResults] = useState({})
  // 채팅으로 보여줄 결과값
  // const [chatResults, setChatResults] = useState([])

  const createFeed = () => setHandle(true)
  const handleClose = () => setHandle(false);
  const onChange = (event) => setSend(event.target.value)
  
  useEffect( () => {
    // console.log("penguin")
    // setGreeting((current) => !current)
    
    save(counter.token, counter.userNo, [])
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
    const res = await axios.post(process.env.REACT_APP_HOST + `chat`,{
      str: send
    });
    
    if (res.data){
      if (res.data.message === 'success') {
        // 검색결과가 없는 경우 -> "다시 질문"
        const isEmptyObj = (obj) => {
          if(obj.constructor === Object
             && Object.keys(obj).length === 0)  {
            return true;
          }
          return false;
        }
        console.log(res.data.content)
        if (isEmptyObj(res.data.content)){
          setChat((currentArray) => [...currentArray, ['woori', '흠.. 다시 한 번 말해줄래?']]);
        }
        // 검색결과가 있는 경우
        else {
          let place_results = res.data.content
          let new_results = results
          console.log(place_results)
          // 결과값 점수 합쳐주기, 정렬
          const combineResult = async () => {
            for (let result in place_results) {
              if(place_results.hasOwnProperty(result)) {
                if (new_results.hasOwnProperty(result)){
                  new_results[result] += place_results[result]
                }
                else {
                  new_results[result] = place_results[result]
                }
                await setResults(new_results)
              }
            }
          }
          await combineResult()
          await console.log('합한 결과', results)
          let sorted_results = Object.keys(results).sort(function(a, b){return results[b]-results[a]});
          // await console.log(sorted_results)
          console.log(sorted_results)
          // await setChatResults(sorted_results)
          // await console.log('정렬한 배열값', chatResults)
          await setChat((currentArray) => 
            [...currentArray, ['woori2', [{placename: sorted_results[0], img_src: makeImgSrc(sorted_results[0])}, 
            {placename: sorted_results[1], img_src: makeImgSrc(sorted_results[1])}, 
            {placename: sorted_results[2], img_src: makeImgSrc(sorted_results[2])} ]]]);
          // redux에 결과값 저장
          save(counter.token, counter.userNo, sorted_results)
          // setStory(story.concat(
          //   <div>
          //     <div className={styles.receivedMessage}>{res.data.placeList[0]}</div>
          //   </div>
          // ))
        }
      }
    } else {
      console.log(res)
    }
    
    await setSend("")
    // await setReturnMessage((event) => (!event))
  }

  const upAnotherFunction = () => {
    setUpFunc(current => !current)
  }
    
  const makeImgSrc = (src) => {
    let new_src = src
    if (new_src[0] === '(') {
      new_src = new_src.replace('(', '')
    }
    new_src = new_src.replace(/ /g, '_');
    new_src = new_src.replace(')', '_');
    new_src = new_src.replace('(', '_');
    new_src = 'https://res.cloudinary.com/dcd6ufnba/image/upload/v1664293859/placefile/' + new_src +'_1.jpg'
    // console.log(new_src)
    return new_src
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
        <li className={styles.menu} >대화 새로 시작하기</li>
        <li className={styles.menu} onClick={() => {goSearch();}}>검색 결과 보기</li>
        <li className={styles.menu} onClick={() => {goPopular();}}>이번달 인기피드 보러가기</li>
        <li className={styles.menu} onClick={() => {goLikeFeed();}}>내가 좋아요 누른 피드 보러가기</li>
        <li className={styles.menu} onClick={() => {goScrapPlace();}}>내가 스크랩한 관광지 보러가기</li>
        <li className={styles.menu} onClick={() => {goMyFeed();}}>내가 올린 피드보기</li>
        <li className={styles.menu} onClick={() => {createFeed(); }}>피드작성하기</li>
        <li style={{color: "aliceblue"}}>빈값</li>
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
              <div className={styles.receivedMessage}>
                {chat[1]}
              </div>
            </div> 
            : null }
            { chat[0] === "woori2" ? 
            <div className={styles.message_woori}>
              <img className={styles.chatbot_wayg} src={woori} alt="character" />
              <div className={styles.receivedMessage}>
                {/* {chat[1][0]} {chat[1][1]} {chat[1][2]} */}

              {chat[1].map((place,idx) => (
                <div key={idx} className={styles.chat_result}>
                  <img className={styles.chat_img} src={place.img_src} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src='./noPhoto.png';
                    }} alt="" />
                  <br />
                  {place.placename}
                </div>
              ))}
              </div>
            </div> 
            : null }
            { chat[0] === "user" ? 
            <div className={styles.message_user}>
              <span className={styles.sendMessage}>{chat[1]}</span>
              {/* <img className={styles.chatbot_wayg} src={woori2} alt="character" /> */}
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

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});
const mapDispatchToProps = dispatch => ({
  save: (token, userNo, results) => dispatch(save(token, userNo, results))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBot);