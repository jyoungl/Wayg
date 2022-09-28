import React, { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer"
import Recommendation from "./Recommendation";
import styles from "./Recommendations.module.css"
import axios from "axios"
import { connect } from "react-redux";

function Recommendations({counter}) {
  const [recommendations, setRecommendations] = useState([])
  // 무한 스크롤
  const obsRef = useRef(null);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);

  useEffect(()=>{
    // fetchFeeds();
    const observer = new IntersectionObserver(obsHandler, {threshold : 0.5});
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {observer.disconnect();}
  },[])

  useEffect(()=>{
    fetchFeeds();
  }, [page])

  const obsHandler = ((entries) => {
    const target = entries[0];
    if(target.isIntersecting ){
      setPage(prev => prev + 1);
    }
  })

  // useEffect(()=>{
  //   const observer = new IntersectionObserver(
  //     entries => {
  //       if (entries[0].isIntersecting) {
  //         setPage(prev => prev + 1);
  //         console.log(page)
  //       }
  //     },
  //     { threshold: 0.25, rootMargin: '80px'},
  //   );
  //   obsRef.current = observer
  // },[])

  // place 불러오기
  const fetchFeeds = useCallback( async () => {
    setLoad(true);

    const res = await axios.get(
      process.env.REACT_APP_HOST+`place`
      ,{
      params: {
        page: page,
        size: 10,
        userNo: counter.userNo,
      }
    });
    if (res.data){
      console.log(res.data)
      setRecommendations(prev => [...prev, ...res.data.placeList.content]);
    } else {
      console.log(res)
    }
      setLoad(false);
    }, [page]);


  
  // const [page, setPage] = useState(1)
  // const [loading, setLoading] = useState(false)

  // const [ref, inView] = useInView()

  // const server_url = process.env.REACT_APP_HOST+`place`
  // //서버에서 아이템(추천여행지) 가지고 오는 함수
  // const getItems = useCallback(async () => {
  //   setLoading(true)
  //   await axios.get(`${server_url}?page=${page}&size=10&userNo=${counter.userNo}`).then((res)=>{
  //     setRecommendations(prevState => [...prevState, res.data.placeList.content])
  //   })
  //   setLoading(false)
  // }, [page])

  // // getItems가 바뀔때마다 함수 실행
  // useEffect(()=> {
  //   // getItems()
  //   console.log(recommendations)
  // }, [getItems])

  // // 사용자가 마지막 요소를 보고있고, 로딩 중이 아니라면
  // useEffect(()=>{
  //   if (inView && !loading) {
  //     setPage(prevState => prevState + 1)
  //   }
  // }, [inView, loading])

  return (
    <div className={styles.recommendations}>
      <h2>WAYG가 추천해주는 여행지</h2>
      <div className={styles.recommendations_list}>
        {recommendations.map((recommendation,idx) => (
          <Recommendation {...recommendation} key={idx}/>
        ))}
      </div>
      <div ref={obsRef}>observer</div>
    </div>
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Recommendations);