import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Recommendation.module.css'

function Recommendation({img_src, title, content }) {
  return (
    <div className={styles.recommendation}>
      <div>
        <img className={styles.recommendation_img} src={img_src} alt='img' />
        <div>
          <div className={styles.recommendation_box}>
            <h2 className={styles.recommendation__title}>
              {title}
            </h2>
            <h3>2022</h3>
          </div>
          <div className={styles.recommendation_box}>
            <p>{content}</p>
            <input className={styles.recommendation_btn} type="button" value="공유하기"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;

