import ReactSlider from "react-slider"
import styles from './chartTime.module.scss'
import ImgTime from '../assets/ReactionRates/reaction_boxes/time.png'

const ChartTime = () => {

  const handleChangeA = (value: number) => {
    console.log({value})
  }
  const handleChangeTime = (value: number) => {
    console.log({time: value})
  }

  return (
    <div className={styles.chartTimeContainer}>

      <div className={styles.sliceVertical}>
        <ReactSlider
          className={styles['vertical-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          onChange={(value) => handleChangeA(value)}
          invert
        />
      </div>

      <div className={styles.sliceHorizontal}>
        <ReactSlider
          className={styles['horizontal-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          onChange={(value) => handleChangeTime(value)}
          // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>

      {/* <div className={styles.timeContainer}> */}
        <img
          className={styles.timeImg}
          src={ImgTime}
          alt='Time'
          height={180}
          width={180}
        />
      {/* </div> */}
    </div>
  )
}

export default ChartTime