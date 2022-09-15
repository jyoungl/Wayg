import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Recommendation from "./Recommendation";
import styles from "./Recommendations.module.css"
import axios from "axios"

function Recommendations() {
  const [items, setItems] = useState([{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" }, {"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" }])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [ref, inView] = useInView()

  const server_url = "aa"
  //서버에서 아이템(추천여행지) 가지고 오는 함수
  const getItems = useCallback(async () => {
    setLoading(true)
    await axios.get(`${server_url}/page=${page}`).then((res)=>{
      setItems(prevState => [...prevState, res])
    })
    setLoading(false)
  }, [page])

  // getItems가 바뀔때마다 함수 실행
  useEffect(()=> {
    // getItems()
    console.log(items)
  }, [getItems])

  // 사용자가 마지막 요소를 보고있고, 로딩 중이 아니라면
  useEffect(()=>{
    if (inView && !loading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])

  return (
    <div className="spot-list">
      <h2>WAYG가 추천해주는 여행지</h2>
      <div className={styles.recommendations_list}>
        {items.map((item,idx) => (
          <Recommendation {...item} key={idx}/>
        ))}
      </div>
      

      {/* <div className={styles.recommendations}>
        <Recommendation/>
      </div> */}
    </div>
  );
}

export default Recommendations;