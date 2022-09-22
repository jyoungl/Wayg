import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Show.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

function show({feedFiles, feedTitle, feedContent, feedLike, feedLikeCnt, feedNickname}) {
  return (
    
    <div className={styles.show}>
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
            <p>{feedNickname}</p>
            <p className={styles.show_title}>{feedTitle}</p>
            <p className={styles.show_content}>{feedContent}</p>
            <p>{feedLikeCnt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default show;

