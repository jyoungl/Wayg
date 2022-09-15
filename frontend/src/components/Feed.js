import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';

function Feed({img_src, title, content }) {
  return (
    // for map 사용
    <div className={styles.feed}>
      <div>
        <img className={styles.feed_img} src={img_src} alt='img' />
        <div>
          <div className={styles.feed_box}>
            <h2 className={styles.feed__title}>
              {title}
            </h2>
            <h3>2022</h3>
          </div>
          <div className={styles.feed_box}>
            <p>{content}</p>
            <input className={styles.feed_btn} type="button" value="공유하기"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed;
