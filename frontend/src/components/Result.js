import Button from 'react-bootstrap/Button';
import styles from './Recommendation.module.css'
import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faBookmark as solidMark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import wayg from '../images/wayg.png'

import { connect } from "react-redux";

function Result({placeName}) {
    const [placeImg, setPlaceImg] = useState("");

    useEffect(()=>{
        const placeImg = makeImgSrc(placeName);
        setPlaceImg(placeImg)
    },[])

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '제목',
        description: '내용',
        imageUrl:
          'https://j7c202.p.ssafy.io/static/media/wayg2.ffea7454ef416b4ccb29.png',
        link: {
          mobileWebUrl: 'https://j7c202.p.ssafy.io',
          webUrl: 'https://j7c202.p.ssafy.io',
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
            mobileWebUrl: 'https://j7c202.p.ssafy.io',
            webUrl: 'https://j7c202.p.ssafy.io',
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

  
  return (
    <>
        <div className={styles.recommendation}>
            <div>
                <img className={styles.recommendation_img} src={placeImg} onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src='./noPhoto.png';
                }}/>
                <div className={styles.recommendation_description}>
                <div className={styles.recommendation_box}>
                    <FontAwesomeIcon onClick={share} icon={faPaperPlane} />
                </div>
                <p className={styles.recommendation_title}>{placeName}</p>
                </div>
            </div>
        </div>
    </>
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Result);
