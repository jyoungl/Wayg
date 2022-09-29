import Feed from "./Feed";
import axios from "axios";
import styles from "./Feeds.module.css"
import React, {useEffect, useState} from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { connect } from "react-redux";

function Feeds({counter}) {

  const [feeds, setFeeds] = useState([])
  // const [width, setWidth] = useState('')

  // console.log(counter)

  // useEffect(() => {
  //   let feed_swiper = document.getElementById('feed_swiper')
  //   setWidth(window.innerWidth - 400 + 'px')
  //   console.log(width)
  // }, [window.innderWidth])
  
  useEffect(()=> {
    // console.log(counter)

    const fetchFeeds = async () => {
      try {
          const response = await axios.get(process.env.REACT_APP_HOST+'feed'
          ,{
            params: {
              page: 0,
              size: 100,
              userNo: counter.userNo,
            }
          });
          console.log(response.data)
          setFeeds(response.data.feedList.content)
        } catch (e) {
          
        }
      };
    fetchFeeds();
  },[])

  return (
    <div className={styles.feeds}>
      <h2>사용자들이 올린 피드</h2>
      <Swiper
        // install Swiper modules
        className="feed_swiper"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView="auto"
        navigation = {true}
        // breakpoints={{
        //   // when window width is >= 640px
        //   768: {
        //     slidesPerView: 1,
        //   },
        //   // when window width is >= 768px
        //   992: {
        //     slidesPerView: 2,
        //   },
        //   1200: {
        //     slidesPerView: 3,
        //   }
        // }}
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {feeds.map((feed,idx) => (
          <SwiperSlide key={idx}>
            <Feed {...feed} key={idx}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Feeds);