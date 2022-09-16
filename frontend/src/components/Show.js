import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import styles from './Show.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

function show({img_src, title, content }) {
  return (
    <div className={styles.show}>
      <div>
        <img className={styles.show_img} src={img_src} alt='img' />
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
            <p className={styles.show_title}>{title}</p>
            <p className={styles.show_content}>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default show;

