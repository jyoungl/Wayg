import Feed from "./Feed";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Feeds() {
  return (
    <div className="" style={{width: "70vw", height: "40vh"}}>
      <h2>사용자들이 올린 피드</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide><Feed/></SwiperSlide>
        <SwiperSlide><Feed/></SwiperSlide>
        <SwiperSlide><Feed/></SwiperSlide>
        <SwiperSlide><Feed/></SwiperSlide>
        
      </Swiper>
    </div>
  );
}

export default Feeds;