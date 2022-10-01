import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
// import { counter } from '@fortawesome/fontawesome-svg-core';

import { connect } from "react-redux";

function FeedShare({counter, feedNo, feedTitle, feedContent, feedNickname, userNo, feedFile, feedLike,feedLikeYn}) {
  const [feed, setFeed] = useState({
    feedNo: {feedNo}.feedNo,
    feedTitle: {feedTitle}.feedTitle,
    feedContent: {feedContent}.feedContent,
    feedNickname: {feedNickname}.feedNickname, 
    userNo: {userNo}.userNo, 
    feedFile: {feedFile}.feedFile === null ? './noPhoto.png' : {feedFile}.feedFile , 
    feedLike: {feedLike}.feedLike, 
    feedLikeYn: {feedLikeYn}.feedLikeYn,
  })
  // const detailList = [
  //   {id: feedNo}
  // ]
  console.log(feedNo)
  console.log(feedTitle)
  console.log(feedContent)
  console.log(feedNickname)


  // let { placeNo } =useParams(); 
  // let { feedNo } =useParams();
  const [detailContent,setDetailContent] = useState('')
  const [handle, setHandle] = useState(false);

  const [likeYn, setLikeYn] = useState(null)

  const plusLike = async () => {
    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/like`
          ,{
          // userNo: {userNo}.userNo,
          userNo: counter.userNo,
          feedNo: {feedNo}.feedNo
        });
        // console.log(response.data)
        if (response.data.message === 'success'){
          let new_feed = feed
          new_feed.feedLikeYn = true;
          new_feed.feedLike+=1
          
          await setFeed(new_feed)
          await setLikeYn(true)
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
            userNo: counter.userNo,
            feedNo: {feedNo}.feedNo,
          }
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          let new_feed = feed
          new_feed.feedLikeYn = false;
          new_feed.feedLike-=1
          
          await setFeed(new_feed)
          await setLikeYn(false)


          
        }
      } catch (e) {
        
      }
    };

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: feed.feedTitle,
        description: feed.feedContent,
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
        likeCount: feed.feedLike,
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
    <Card>
      <Card.Header as="h5">
        <img className={styles.cardImg} src={feed.feedFile} alt='img' />
      </Card.Header>
      <Card.Body>
        {feed.feedLikeYn ? 
          <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
        : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
        &nbsp;&nbsp;
        <FontAwesomeIcon onClick={share} icon={faPaperPlane} />
        <Card.Text>
          <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          <p className={styles.show_writer}>작성자</p>
          <div style={{fontSize:"15px", fontWeight:"bold"}}>{feedNickname}</div>
          <div style={{fontSize:'12px'}}>{feedContent}</div>
        </Card.Text>
      </Card.Body>
    </Card>

    </>
  )
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(FeedShare);
