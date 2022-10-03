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
  const [menuBar, setMenuBar] = useState(false)
  const [story, setStory] = useState([])
  const [send, setSend] = useState("")
  // 결과값 저장
  const [results, setResults] = useState({})
  // 채팅으로 보여줄 결과값
  // const [chatResults, setChatResults] = useState([])
  const [isPlace, setIsPlace] = useState(true)
  const [placeList, setPlaceList] = useState([])

  const createFeed = () => setHandle(true)
  const handleClose = () => setHandle(false);
  const onChange = (event) => setSend(event.target.value)

  // 더 많은 기능 사용하기에 필요한 카카오 로그인
  const REST_API_KEY = "bbe27fdfd6962e9fa7c41c8b3c99fb13"
  const REDIRECT_URI = process.env.REACT_APP_HOST+ "login"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  useEffect(() => {
    // console.log("penguin")
    // setGreeting((current) => !current)
    setChat([])
    setPlaceList([])
    setIsPlace(true)
    
    save(counter.token, counter.userNo, [])
    setChat((currentArray) => [...currentArray, ['woori', "안녕? 난 우리야 여행지를 추천해줄게!"]]);
    
    setTimeout(() => {
      setChat((currentArray) => [...currentArray, ['woori', "가고 싶은 지역이 있니?"]]);
    }, 1000)
    
  },[])

  useEffect(()=> {
    let chatScreen = document.getElementById("chatScreen"); 
    chatScreen.scrollTop = chatScreen.scrollHeight; 

    let chatInput = document.getElementById('chatInput');
    chatInput.value = '';
  },[chat]) 

  // useEffect(() => {
  //   if (loading) {
  //     setChat((currentArray) => [...currentArray, ['woori', "좀만 기다려봐..."]]);
  //   }
  //   else {
  //     let new_array = chat;
  //     new_array = new_array.slice(0, -1);
  //     setChat(new_array);
  //   }
  // },[loading])


  const onSubmit = async (event) => {
    event.preventDefault();
    
    await setSends((currentArray) => [...currentArray,send]);
    await setChat((currentArray) => [...currentArray, ['user', send]]);
    
    if (isPlace) {
      const res = await axios.post(process.env.REACT_APP_HOST + `chat/place`,{
        str: send
      });
      
      if (res.data){
        if (res.data.message === 'success') {
          console.log(res.data.placeList)
          if (isEmptyArr(res.data.placeList)){
            setChat((currentArray) => [...currentArray, ['woori', "휴.. 가고 싶은 지역이 있냐고?"]]);
          }
          else{
            setPlaceList(res.data.placeList)
            setIsPlace(false)
            setChat((currentArray) => [...currentArray, ['woori', "원하는 여행지를 알려줘!"]]);
          }
        }
      } else {
        console.log(res)
      }
    }
    else {
      // 검색시작
      // setLoading(true);
      setLoading(true)

      const res = await axios.post(process.env.REACT_APP_HOST + `chat`,{
        str: send
      });

      //검색 끝
      setLoading(false);
      
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
                if(place_results.hasOwnProperty(result) && placeList.includes(result)) {
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
            if (!isEmptyArr(sorted_results)){
              await setChat((currentArray) => 
                [...currentArray, ['woori2', [{placename: sorted_results[0], img_src: makeImgSrc(sorted_results[0])}, 
                {placename: sorted_results[1], img_src: makeImgSrc(sorted_results[1])}, 
                {placename: sorted_results[2], img_src: makeImgSrc(sorted_results[2])} ]]]);
              // redux에 결과값 저장
              save(counter.token, counter.userNo, sorted_results)
            }
            else {
              setChat((currentArray) => [...currentArray, ['woori', '미안.. 추천할 만한 곳이 없는걸...']]);
            }
            
          }
        }
      } else {
        console.log(res)
      }
    }
    
    await setSend("")
    // await setReturnMessage((event) => (!event))
  }

  const clickMenuBar = () => {
    setMenuBar(current => !current)
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

  const startNew = () => {
    setChat([]);
    setPlaceList([]);
    setIsPlace(true);
    save(counter.token, counter.userNo, []);

    setChat((currentArray) => [...currentArray, ['woori', "안녕? 난 우리야 여행지를 추천해줄게!"]]);
    
    setTimeout(() => {
      setChat((currentArray) => [...currentArray, ['woori', "가고 싶은 지역이 있니?"]]);
    }, 1000)
  }

  const isEmptyArr = (arr) => {
    if(Array.isArray(arr) && arr.length === 0)  {
      return true;
    }
    return false;
  }

  const closeMenuBar = () => {
    setMenuBar(false);
  }

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '우리! 어디가? 추천 여행지',
        description: `추천하는 여행지 3개`,
        imageUrl: ``,
        link: {
          // mobileWebUrl: 'https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0',
          // webUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
          mobileWebUrl: `https://j7c202.p.ssafy.io/`,
          webUrl: `https://j7c202.p.ssafy.io/`
        },
      },
      itemContent: {
        // profileText: 'Kakao',
        // profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      },
      social: {
        likeCount: 0,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            // mobileWebUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
            // webUrl: `https://j7c202.p.ssafy.io/main/detail/FeedShare/${feed.feedNo}/0`,
            mobileWebUrl: `https://j7c202.p.ssafy.io/`,
            webUrl: `https://j7c202.p.ssafy.io/`
          },
        },
      ],
    });
  }

  const share = async () => {
    try {
      console.log('share')
      shareKakaoLink()
      } catch (e) {
        
      }
  };

  return (
      <div id="chatScreen" className={styles.chatbot}>
        <div className={styles.chatbot_title}>
          <div>'우리'랑 대화</div>
        </div>
        {/* {greeting ? (
        <div>
          <img className={styles.chatbot_woori} src={woori} alt="character" />
          <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
        </div> ) : null} */}
      

      {menuBar ? 
      <ul className={styles.anotherFunction}>
        <li className={styles.menu} onClick={() => {startNew(); clickMenuBar();}} >대화 새로 시작하기</li>
        <li className={styles.menu} onClick={() => {goSearch(); clickMenuBar();}}>검색 결과 보기</li>
        {Boolean(counter.userNo) ?
        <>
        <li className={styles.menu} onClick={() => {goPopular(); clickMenuBar();}}>이번달 인기피드 보러가기</li>
        <li className={styles.menu} onClick={() => {goLikeFeed(); clickMenuBar();}}>내가 좋아요 누른 피드 보러가기</li>
        <li className={styles.menu} onClick={() => {goScrapPlace(); clickMenuBar();}}>내가 스크랩한 관광지 보러가기</li>
        <li className={styles.menu} onClick={() => {goMyFeed(); clickMenuBar();}}>내가 올린 피드보기</li>
        <li className={styles.menu} onClick={() => {createFeed(); clickMenuBar();}}>피드작성하기</li>
        <li style={{color: "aliceblue"}}>빈값</li>
        </> : <div><a style={{textDecoration:"none", color:"black"}} href={KAKAO_AUTH_URL}><li className={styles.menu}>더 많은 기능 사용하기</li></a><li style={{color: "aliceblue"}}>빈값</li></div>
        
      }
      </ul>: null}

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
                <div className={styles.chat_results}>
                {chat[1].map((place,idx) => (
                  <div key={idx} className={styles.chat_result}>
                    <img className={styles.chat_img} src={place.img_src} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; 
                      currentTarget.src='./noPhoto.png';
                      }} alt="" />
                    <div className={styles.chat_text}>{place.placename}</div>
                  </div>
                ))}
                </div>

                <input className={styles.chat_shareBtn} type="button" onClick={share} value={'공유하기'} />
                {/* <input className={styles.chat_shareBtn} type="button" value={'공유하기'} /> */}
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

      {/* 로딩 중 */}
      { loading ? 
      <div className={styles.message_woori}>
        <img className={styles.chatbot_wayg} src={woori} alt="character" />
        <div className={styles.receivedMessage}>
          <div className={styles.container}>
            <div className={`${styles.progress2} ${styles.progress_moved}`}>
              <div className={styles.progress_bar2}></div>
              {/* <div className={styles.loader}></div> */}
            </div>
          </div>
        </div>
      </div> 
      : null }

      <div className={styles.reply}> 
        <FontAwesomeIcon className="additionalBtn fa-2xl" onClick={clickMenuBar} icon={faBars} />
        <form onSubmit={onSubmit}>
          <input id="chatInput" className={styles.sendInput} onChange={onChange} value={send} type="text" placeholder="내용입력" />
          <button className={styles.chatBtn} onClick={() => {goSearch(); clickMenuBar(); closeMenuBar();}}>보내기</button>
        </form>
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