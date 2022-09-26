import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function Feed({feedNo, feedTitle, feedContent, feedNickname, userNo, feedFiles, feedLike,feedLikeYn}) {
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
  const [detailContent,setDetailContent] = useState('')
  const [handle, setHandle] = useState(false);
  const handleClose = () => setHandle(false);

  const plusLike = async () => {
    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/like`
          ,{
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
        const response = await axios.delete(
          process.env.REACT_APP_HOST+`feed/like/1`
          
          ,
          {
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

  const share = () => {
    // shareKakaoLink()
    console.log('share')
  }
  
  const onClickFeed = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`feed/view?userNo=${userNo}&feedNo=${feedNo}`
      )
      console.log(response.data.feed.feedContent)
      await setDetailContent(response.data.feed.feedContent)
      await setHandle(true)
    }catch (e) {
      console.log(e)
    }
  } 

  return (
    // for map 사용
    <>
    <div className={styles.feed}>
      <div className={styles.feed_div}>
        <img onClick={onClickFeed} className={styles.feed_img} src={feed.feedFiles} alt='img' />
        <div>
          <div className={styles.feed_box}>
            {feed.feedLikeYn ? 
              <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
              : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
            &nbsp;&nbsp;
            <FontAwesomeIcon onClick={share()} icon={faPaperPlane} />
          </div>
          <div>
                <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          </div>
          <div className={styles.feed_box}> 
          <div className={styles.feed_writer}>{feed.feedNickname}</div>
          </div>
          <div className={styles.feed_title}>{feed.feedTitle}</div>
        </div>
        </div>
    </div>
    {/* 모달 */}
    <Modal className={styles.modal} size="lg" show={handle} onHide={handleClose}>
    <Card>
      <Card.Header as="h5">
        <img className={styles.cardImg} src={feed.feedFiles} alt='img' />
      </Card.Header>
      <Card.Body>
        {feed.feedLikeYn ? 
          <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
        : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
        &nbsp;&nbsp;
        <FontAwesomeIcon onClick={share()} icon={faPaperPlane} />
        <Card.Text>
          <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          <p className={styles.show_writer}>작성자</p>
          <div style={{fontSize:"15px", fontWeight:"bold"}}>{feedNickname}</div>
          <div style={{fontSize:'12px'}}>{feedContent}</div>
        </Card.Text>
      </Card.Body>
    </Card>
    {/* <div className={styles.show}>
      <div>{feedFiles}
        <img className={styles.show_img} src={feedFiles} alt='img' />
        <div>
          <div className={styles.show_box}>
            <div>
                <FontAwesomeIcon icon={faHeart} />
                <span> </span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <p className={styles.show_writer}>작성자</p>
          <div className={styles.show_box}>
            <div>{feedNickname}</div>
            <div className={styles.show_title}>{feedTitle}</div>
            <div className={styles.show_content}>{detailContent}</div>
            <p>{feedLike}</p>
            <p>{feedNo}</p>
          </div>
        </div>
      </div>
    </div> */}
      </Modal>
    </>
  )
}

export default Feed;
