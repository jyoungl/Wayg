import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Show from "./Show";
import Recommendation from "./Recommendation";
import Result from "./Result";
import Feed from "./Feed";
import styles from "./Shows.module.css";
import axios from "axios";
import { connect } from "react-redux";
import woori2 from '../images/wayg.png';
import sunguri from '../images/sunguri.png';

import WordCloud from "./WordCloud";


function Shows({load, search, scrapPlace ,likeFeed, myFeed, counter}) {
  

  const [items, setItems] = useState([])
  const [page,setPage] = useState(null)
  const [length,setLength] = useState(null)
  const [divide,setDivide] = useState(null)
  const [newArray2, setNewArray] = useState([])
    // 무한 스크롤
  

  // 전체 리스트 array로 나누어주는 코드
  useEffect(() => {
    
    const division = async(resultsList, n) => {
      const length = resultsList.length;
      const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);
      for (let i = 0; i <=divide; i++) {
        newArray.push(resultsList.splice(0,n))
      }
      console.log(newArray)
      await setPage(newArray.legnth)
    }
    const newArray = [];
    const resultsList = counter.results
    division(resultsList,10)
  },[page])

  return (
    <div className="">

      {/* <WordCloud></WordCloud> */}

      {myFeed ? 
        <>
          <h2>내가 작성한 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Feed {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {likeFeed ? 
        <>
          <h2>내가 좋아요 누른 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Feed {...item} key={idx}/>
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
      {search ? 
      <>
        <div className={styles.search_title}>
          <img style={{width: "60px", height: "60px"}} src={sunguri} alt="img"/>
          <h2>검색 결과</h2>
        </div>
        <div className={styles.shows_list}>
          {counter.results.map((result,idx) => (
            <Result placeName={result} key={idx} />
          ))}
        </div>
        { load ? 
          <div className={styles.container}>
            <img style={{width: "125px", height: "125px"}} className={styles.icon} src={woori2} alt="woori"/>
            <div className={`${styles.progress2} ${styles.progress_moved}`}>
              <div className={styles.progress_bar2}></div>
            </div>
          </div>
          : <div className={styles.shows_list}>
              {counter.results.map((result,idx) => (
                <Result placeName={result} key={idx} />
              ))}
            </div> }
        
      </> : null}

    </div>
    
      
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Shows);