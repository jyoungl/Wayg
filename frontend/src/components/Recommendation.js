import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Recommendation.module.css'
import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faBookmark as solidMark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

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
        const response = await axios.post(`http://localhost:8080/api/place/scrap`,{
          userNo: 2,
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
        const response = await axios.delete(`http://localhost:8080/api/place/scrap/1`,{
          params: {
            userNo: 2,
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
        `http://localhost:8080/api/place/view?userNo=1&placeNo=${placeNo}`
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
    <div onClick={onClickRecommendation} className={styles.recommendation}>
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
            <p className={styles.recommendation_title}>{recommendation.placeNo} {recommendation.placeAddress}</p>
          </div>
          <p>{recommendation.placeScrap}</p>
          <p>{recommendation.placeScrapYn}</p>
        </div>
      </div>
    </div>
    {/* 모달 */}
    <Modal show={handle} onHide={handleClose}>
        <div className={styles.recommendation}>
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
        </div>
      </Modal>
    </>
    



  );
}

export default Recommendation;

