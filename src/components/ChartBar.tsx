import styles from './ChartBar.module.scss'
import BarChartCanvas from './Canvas/CanvasBar'
import useAppData from '../hooks/useAppData'
import { themeColors } from '../constants'

interface ChartBarProps {
  colors: string[]
}
const ChartBar = ({ colors }: ChartBarProps) => {
  const { curStep, valuesC: concentrationAB, valuesT: reactionTime } = useAppData()
  const textA = 'A' + 1

  return (
    <div className={styles.chartBarContainer}>
      {/* <div className={styles.timeContainer}> */}
      <BarChartCanvas
        play={curStep === 4}
        // c2={0.8}
        // c1={0.5}
        // t2={3.2}
        // t1={16}
        c1={concentrationAB[1] / 100}
        c2={concentrationAB[0] / 100}
        t1={reactionTime[1]}
        t2={reactionTime[0]}
        height={212}
        width={212}
        colorA={colors[1]}
        colorB={colors[2]}
      />
    </div>
  )
}

export default ChartBar