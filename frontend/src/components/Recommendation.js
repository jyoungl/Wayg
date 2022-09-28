import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Recommendation.module.css'
import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faBookmark as solidMark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Container, Grid } from '@material-ui/core';
import React from 'react';

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
      var placeInfo = await response.data.place.placeInfo
      // var res = placeInfo
      // var res = await placeInfo.replace(/<br>/g, ' ');

      var res = await placeInfo.replace(/<br\s*[\/]?>/gi, " ")
      




      await setDetailContent(res)
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
    <Modal show={handle} size="xl" onHide={handleClose}>
    <Container style={{maxHeight:'650px'}} className={styles.Container}>
      <Grid container style={{maxHeight:'650px'}}>
        {/* 사진용 왼쪽 컴포넌트 */}
        <Grid style={{backgroundColor:"gray", width:"300px", height:"auto"}} item xs={12} md={6}>
            <img style={{}} className={styles.detail_img} src={recommendation.placeFiles} alt='img' />
        </Grid>
        {/* 글용 오른쪽 컴포넌트 */}
        <Grid style={{maxHeight:'650px'}} className={styles.info} item xs={12} md={6}>
          <div>
            {recommendation.placeScrapYn ? 
            <FontAwesomeIcon onClick={deleteScrap} className={styles.scrapY} icon={solidMark} /> 
            : <FontAwesomeIcon onClick={plusScrap} icon={faBookmark} />}
             &nbsp;&nbsp;
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
          <p className={styles.detail_title}>{recommendation.placeName}</p>
          <p className={styles.detail_address}>{recommendation.placeAddress}</p>
          <p style={{overflow:'auto'}}>{detailContent}</p>
          </Grid>
      </Grid>
    </Container>
    </Modal>
    </>
    



  );
}

export default Recommendation;
