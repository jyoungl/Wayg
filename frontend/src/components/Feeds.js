import Feed from "./Feed";
import styles from "./Feeds.module.css"
import React, {useState} from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Feeds() {
  const [feeds, setFeeds] = useState([{"img_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpq7vtt_uu0b5iTOg_hSkAt-2CxW9uKnkjXQ&usqp=CAU", "title": "jeju", "content": "설명설명" }, {"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" },{"img_src": "https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no", "title": "jeju", "content": "설명설명" }])
  return (
    <div className="" style={{width: "70vw", height: "40vh"}}>
      <h2>사용자들이 올린 피드</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
          {feeds.map((feed,idx) => (
            <SwiperSlide>
              <Feed {...feed} key={idx}/>
            </SwiperSlide>
          ))}
        
      </Swiper>
    </div>
  );
}

export default Feeds;