import Recommendation from "./Recommendation";
import styles from "./Recommendations.module.css"

function Recommendations() {
  return (
    <div className={styles.container}>
      <h2>[팀명]이 추천해주는 여행지</h2>
      <div className={styles.recommendations}>
        <Recommendation/>
        <Recommendation/>
        <Recommendation/>
      </div>
    </div>
  );
}

export default Recommendations;