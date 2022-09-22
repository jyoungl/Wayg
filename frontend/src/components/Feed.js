import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Feed({feedNo, feedTitle, feedContent, feedNickname, userNo, feedFiles, feedLike, feedLikeYn}) {

  const [isLike, setIsLike] = useState({feedLikeYn}.feedLikeYn);

  const plusLike = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/api/feed/like`,{
          userNo: {userNo}.userNo,
          feedNo: {feedNo}.feedNo
        });
        console.log(response.data)
      } catch (e) {
        
      }
  };
  

  const deleteLike = async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/feed/like/1`,{
          params: {
            userNo: {userNo}.userNo,
            feedNo: {feedNo}.feedNo,
          }
        });
        console.log(response.data)
        if (response.data === 'success'){
          console.log('rerender')
          setIsLike(true)
        }
      } catch (e) {
        
      }
    };
  

  return (
    // for map 사용

    <div className={styles.feed}>
      <div>
        <img className={styles.feed_img} src={feedFiles} alt='img' />
        <div>
          <div className={styles.feed_box}>
            <div>
                {isLike ? 
                  <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
                  : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />} 
                <span> </span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <p className={styles.feed_writer}>{feedNickname} {userNo}</p>
          <div className={styles.feed_box}>
            <p className={styles.feed_title}>{feedNo} {feedTitle}</p>
            <p className={styles.feed_content}>{feedContent}</p>
          </div>
          <p>{feedLike}</p>
        </div>
      </div>
    </div>
  )
}

export default Feed;
