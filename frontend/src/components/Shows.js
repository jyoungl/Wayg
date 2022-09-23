import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Show from "./Show";
import Recommendation from "./Recommendation";
import Feed from "./Feed"
import styles from "./Shows.module.css"
import axios from "axios"

function Shows({scrapPlace ,likeFeed, myFeed}) {
  const [items, setItems] = useState([])
  // const [page, setPage] = useState(1)
  // const [loading, setLoading] = useState(false)
 

  // const [ref, inView] = useInView()

  // const server_url = "aa"
  //서버에서 아이템(추천여행지) 가지고 오는 함수
  // const getItems = useCallback(async () => {
  //   setLoading(true)
  //   await axios.get(`${server_url}/page=${page}`).then((res)=>{
  //     setItems(prevState => [...prevState, res])
  //   })
  //   setLoading(false)
  // }, [page])

  // getItems가 바뀔때마다 함수 실행
  // useEffect(()=> {
  //   // getItems()
  //   console.log(items)
  // }, [getItems])

  // 사용자가 마지막 요소를 보고있고, 로딩 중이 아니라면
  // useEffect(()=>{
  //   if (inView && !loading) {
  //     setPage(prevState => prevState + 1)
  //   }
  // }, [inView, loading])
  ////////////////////////////////////////////////////

  useEffect(() => {
    if (likeFeed) {
      const fetchLikeFeeds = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/feed/myLikeList?page=0&size=10&userNo=1`);
            console.log(response.data)
            setItems(response.data.myLikeList.content)
          } catch (e) {
            
          }
        };
      fetchLikeFeeds();
    }
    else if (myFeed) {
      const fetchMyFeeds = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/feed/myFeed?page=0&size=10&userNo=1`);
          console.log(response.data)
          setItems(response.data.myFeedList.content)
        } catch (e) {
  
        }
      }
      fetchMyFeeds()
    }
    else if (scrapPlace) {
      const fetchMyPlaces = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/place/myScrapList?page=0&size=10&userNo=1`);
          console.log(response.data)
          setItems(response.data.myScrapList.content)
        } catch (e) {
  
        }
      }
      fetchMyPlaces()
    }
  },[])

  return (
    <div className="">
      {myFeed ? 
        <>
          <h2>내가 작성한 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Show {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {likeFeed ? 
        <>
          <h2>내가 좋아요 누른 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Show {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {scrapPlace ? 
        <>
          <h2>내가 스크랩한 관광지</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Recommendation {...item} key={idx}/>
            ))}
          </div>
        </> : null}
    
    </div>
    
      
  );
}

export default Shows;