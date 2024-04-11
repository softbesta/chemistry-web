import styles from './ChartBar.module.scss'
import ImgBar from '../assets/ReactionRates/reaction_boxes/bar.png'

const ChartBar = () => {

  return (
    <div className={styles.chartBarContainer}>
      {/* <div className={styles.timeContainer}> */}
        <img
          className={styles.barImg}
          src={ImgBar}
          alt='Bar'
          height={180}
          width={180}
        />
    </div>
  )
}

export default ChartBar