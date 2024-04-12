import styles from './ChartBar.module.scss'
import ImgBar from '../assets/ReactionRates/reaction_boxes/bar.png'
import BarChartCanvas from './CanvasBar'
import useAppData from '../hooks/useAppData'

const ChartBar = () => {
  const { curStep } = useAppData()

  return (
    <div className={styles.chartBarContainer}>
      {/* <div className={styles.timeContainer}> */}
      <BarChartCanvas
        play={curStep === 4}
        c2={0.8}
        c1={0.5}
        t2={3.2}
        t1={16}
        height={212}
        width={212}
      />
    </div>
  )
}

export default ChartBar