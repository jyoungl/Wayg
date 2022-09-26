import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Recommendation.module.css'
import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faBookmark as solidMark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import * as React from 'react';
// import { styled } from '@mui/material/styles';

function Recommendation({placeNo,placeName,placeAddress,placeInfo,placeHoliday,placeExperience,placeTime,placePark,placeAnimal,placeMore,placeScrapYn,placeScrap,placeFiles }) {
  
  const [recommendation, setRecommendation] = useState({
    placeNo: {placeNo}.placeNo,
    placeName: {placeName}.placeName,
    placeAddress: {placeAddress}.placeAddress,
    placeInfo: {placeInfo}.placeInfo,
    placeHoliday: {placeHoliday}.placeHoliday,
    placeExperience: {placeExperience}.placeExperience,
    placeTime: {placeTime}.placeTime,
    placePark: {placePark}.placePark,
    placeAnimal: {placeAnimal},
    placeMore: {placeMore}.placeMore,
    placeScrapYn: {placeScrapYn}.placeScrapYn,
    placeScrap: {placeScrap}.placeScrap,
    placeFiles: {placeFiles}.placeFiles,
  })
  const [handle, setHandle] = useState(false);
  const [detailContent, setDetailContent] = useState()
  const handleClose = () => setHandle(false);

  const plusScrap = async () => {
    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`place/scrap`
          
          ,{
          userNo: 1,
          placeNo: {placeNo}.placeNo
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          recommendation.placeScrapYn = true;
          setRecommendation(recommendation)
          console.log('aaaaa')
          
        }
      } catch (e) {
        
      }
  };
  
  const deleteScrap = async () => {
    try {
        const response = await axios.delete(
          process.env.REACT_APP_HOST+`place/scrap/1`
          
          ,{
          params: {
            userNo: 1,
            placeNo: {placeNo}.placeNo,
          }
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          recommendation.placeScrapYn = true;
          setRecommendation(recommendation)
          console.log('ww')
          
        }
      } catch (e) {
        
      }
    };

  const onClickRecommendation = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`place/view?userNo=1&placeNo=${placeNo}`
        
      )
      await console.log(response.data.place)
      await setDetailContent(response.data.place.placeInfo)
      await setHandle(true)
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <>
    <div className={styles.recommendation}>
      <div>
        <img onClick={onClickRecommendation} className={styles.recommendation_img} src={recommendation.placeFiles} alt='img' />
        <div className={styles.recommendation_description}>
          <div className={styles.recommendation_box}>
            {recommendation.placeScrapYn ? 
              <FontAwesomeIcon onClick={deleteScrap} className={styles.scrapY} icon={solidMark} /> 
              : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />} 
            &nbsp;<small>{recommendation.placeScrap}</small>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
          <p className={styles.recommendation_title}>{recommendation.placeName}</p>
          <p className={styles.recommendation_writer}>{recommendation.placeNo} {recommendation.placeAddress}</p>
          <p>{recommendation.placeScrapYn}</p>
        </div>
      </div>
    </div>
    {/* 모달 */}
    <Modal container className={styles.modal} size="lg" show={handle} onHide={handleClose}>
      {/* <Card.Header className={styles.Header} as="h5">
        <img  className={styles.cardImg} src={recommendation.placeFiles} alt='img' />
      </Card.Header>
      <Card.Body>
      {recommendation.placeScrapYn ? 
                      <FontAwesomeIcon onClick={deleteScrap} className={styles.likeY} icon={solidMark} /> 
                      : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />} 
                    <span> </span>
                    <FontAwesomeIcon icon={faPaperPlane} />
        &nbsp;&nbsp;
        </Card.Body> */}
        {/* <FontAwesomeIcon onClick={share()} icon={faPaperPlane} />
        <Card.Text>
          <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          <p className={styles.show_writer}>작성자</p>
          <div style={{fontSize:"15px", fontWeight:"bold"}}>{feedNickname}</div>
          <div style={{fontSize:'12px'}}>{feedContent}</div>
        </Card.Text> */}
{/* //////////////////////////////////////////////////////////////////////////// */}



{/* //////////////////////////////////////////////////////////////////////////// */}
      {/* <div style={{backgroundColor:"red", width:"30%", height:"auto"}}>
        <img src={recommendation.placeFiles} alt='img' />
      </div> */}
        {/* <div className={styles.recommendation}>
          <div>
            <img className={styles.recommendation_img} src={recommendation.placeFiles} alt='img' />
            <div>
              <div className={styles.recommendation_box}>
                <div>
                    {recommendation.placeScrapYn ? 
                      <FontAwesomeIcon onClick={deleteScrap} className={styles.likeY} icon={solidMark} /> 
                      : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />} 
                    <span> </span>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
              </div>
              <p className={styles.recommendation_writer}>{recommendation.placeName}</p>
              <div className={styles.recommendation_box}>
                <div>{detailContent}</div>
                <p className={styles.recommendation_title}>{recommendation.placeNo} {recommendation.placeAddress}</p>
              </div>
              <p>{recommendation.placeScrap}</p>
              <p>{recommendation.placeScrapYn}</p>
            </div>
          </div>
        </div> */}
      </Modal>
    </>
    



  );
}

export default Recommendation;

