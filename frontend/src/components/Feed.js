import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';

function Feed({feedNo, feedTitle, feedContent, feedNickname, userNo, feedFiles, feedLikeCnt, feedLike}) {
  return (
    // for map 사용
    <div className={styles.feed}>
      <div>
        <img className={styles.feed_img} src={feedFiles} alt='img' />
        <div>
          <div className={styles.feed_box}>
            <h2 className={styles.feed__title}>
              {feedTitle}
            </h2>
            <h3>피드번호: {feedNo}</h3>
          </div>
          <div className={styles.feed_box}>
            <p>{feedContent}</p>
            <input className={styles.feed_btn} type="button" value="공유하기"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed;
