import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Recommendation from "./Recommendation";
import styles from "./Recommendations.module.css"
import axios from "axios"

function Recommendations() {
  const [recommendations, setRecommendations] = useState([])
  
  useEffect(()=> {

    const fetchFeeds = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/place`,{
            params: {
              page: 0,
              size: 10,
              userNo: 2,
            }
          });
          console.log(response.data)
          setRecommendations(response.data.placeList.content)
        } catch (e) {
          
        }
      };
    fetchFeeds();
  },[])
  
  // const [page, setPage] = useState(1)
  // const [loading, setLoading] = useState(false)

  // const [ref, inView] = useInView()

  // const server_url = "aa"
  // //서버에서 아이템(추천여행지) 가지고 오는 함수
  // const getItems = useCallback(async () => {
  //   setLoading(true)
  //   await axios.get(`${server_url}/page=${page}`).then((res)=>{
  //     setItems(prevState => [...prevState, res])
  //   })
  //   setLoading(false)
  // }, [page])

  // // getItems가 바뀔때마다 함수 실행
  // useEffect(()=> {
  //   // getItems()
  //   console.log(items)
  // }, [getItems])

  // // 사용자가 마지막 요소를 보고있고, 로딩 중이 아니라면
  // useEffect(()=>{
  //   if (inView && !loading) {
  //     setPage(prevState => prevState + 1)
  //   }
  // }, [inView, loading])

  return (
    <div className="spot-list">
      <h2>WAYG가 추천해주는 여행지</h2>
      <div className={styles.recommendations_list}>
        {recommendations.map((recommendation,idx) => (
          <Recommendation {...recommendation} key={idx}/>
        ))}
      </div>
      

      {/* <div className={styles.recommendations}>
        <Recommendation/>
      </div> */}
    </div>
  );
}

export default Recommendations;