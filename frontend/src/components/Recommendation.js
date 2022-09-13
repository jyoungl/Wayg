import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Recommendation.module.css'

function Recommendation() {
  return (
    <div className={styles.recommendation}>
      <img className={styles.recommendation_img} src='https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no' alt='alt' />
      <div>
        <h2 className={styles.recommendation__title}>
          제주곶자왈도립공원
        </h2>
        <h3>2022</h3>
        <p>제주도 대표 휴양지. 4가지 코스로 이루어진 공원</p>
      </div>
      <Button>공유하기</Button>
    </div>
  );
}

export default Recommendation;

