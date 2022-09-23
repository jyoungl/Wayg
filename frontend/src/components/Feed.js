import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Feed({feedNo, feedTitle, feedContent, feedNickname, userNo, feedFiles, feedLike, feedLikeYn}) {
  const [feed, setFeed] = useState({
    feedNo: {feedNo}.feedNo,
    feedTitle: {feedTitle}.feedTitle,
    feedContent: {feedContent}.feedContent,
    feedNickname: {feedNickname}.feedNickname, 
    userNo: {userNo}.userNo, 
    feedFiles: {feedFiles}.feedFiles, 
    feedLike: {feedLike}.feedLike, 
    feedLikeYn: {feedLikeYn}.feedLikeYn,
  })

  const plusLike = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/api/feed/like`,{
          // userNo: {userNo}.userNo,
          userNo: 1,
          feedNo: {feedNo}.feedNo
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          feed.feedLikeYn = true;
          setFeed(feed)
          console.log('aaaaa')
          
        }
      } catch (e) {
        
      }
  };
  

  const deleteLike = async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/feed/like/1`,{
          params: {
            userNo: 1,
            feedNo: {feedNo}.feedNo,
          }
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          feed.feedLikeYn = false;
          setFeed(feed)
          console.log('ww')
          
        }
      } catch (e) {
        
      }
    };

  const shareKakaoLink = () => {
    // @ts-ignore
    // window.Kakao.Link.createCustomButton({
    //   container: "#kakao-link-btn",
    //   templateId: 83280,
    //   templateArgs: {
    //     userId: `1`,
    //   },
    // });
    window.Kakao.Share.sendCustom({
      templateId: 83280,
      templateArgs: {
        title: '제목 영역입니다.',
        description: '설명 영역입니다.',
      },
    });
  };
  
  const onShareKakaoClick = () => {
    shareKakaoLink();
  };

  return (
    // for map 사용

    <div className={styles.feed}>
      <div>
        <img className={styles.feed_img} src={feed.feedFiles} alt='img' />
        <div>
          <div className={styles.feed_box}>
            <div>
                {feed.feedLikeYn ? 
                  <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
                  : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />} 
                <span> </span>
                <FontAwesomeIcon onClick={onShareKakaoClick} icon={faPaperPlane} />
            </div>
          </div>
          <p className={styles.feed_writer}>{feed.feedNickname} {feed.userNo}</p>
          <div className={styles.feed_box}>
            <p className={styles.feed_title}>{feed.feedNo} {feed.feedTitle}</p>
            <p className={styles.feed_content}>{feed.feedContent}</p>
          </div>
          <p>{feed.feedLike}</p>
        </div>
      </div>
    </div>
  )
}

export default Feed;
