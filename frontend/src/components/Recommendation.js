import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Recommendation.module.css'

function Recommendation({img_src, title, content }) {
  return (
    <div className={styles.recommendation}>
      <div>
        <img className={styles.recommendation_img} src={img_src} alt='img' />
        <div>
          <h2 className={styles.recommendation__title}>
            {title}
          </h2>
          <h3>2022</h3>
          <p>{content}</p>
        </div>
      </div>
      <Button>공유하기</Button>
    </div>
  );
}

export default Recommendation;

