import styles from './ChartBar.module.scss'
import ImgBar from '../assets/ReactionRates/reaction_boxes/bar.png'
import BarChartCanvas from './CanvasBar'
import useAppData from '../hooks/useAppData'
import { Colors } from '../constants'

const ChartBar = () => {
  const { curStep, concentrationAB, reactionTime } = useAppData()

  return (
    <div className={styles.chartBarContainer}>
      {/* <div className={styles.timeContainer}> */}
      <BarChartCanvas
        play={curStep === 4}
        // c2={0.8}
        // c1={0.5}
        // t2={3.2}
        // t1={16}
        c1={concentrationAB[1]/100}
        c2={concentrationAB[0]/100}
        t1={reactionTime[1]}
        t2={reactionTime[0]}
        height={212}
        width={212}
        colorA={Colors.A}
        colorB={Colors.B}
      />
    </div>
  )
}

export default ChartBar