import CanvasTime from '../Canvas/CanvasTime'
import styles from './ChartInA.module.scss'

interface ChartTimeProps {
  valuesC: number[]
  valuesT: number[]
  canvaTimeSliderC: number[]
  canvaTimeSliderT: number[]
  canvaTimeState: number   //  0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  onTimeframeChange: (val: number) => void
  colors: string[]
  textVert?: string,
  textHoriz?: string
}

const ChartInA = ({
  valuesC,
  valuesT,
  canvaTimeState: showTimeGraph,
  onTimeframeChange,
  colors,
  textVert,
  textHoriz,
}: ChartTimeProps) => {

  return (
    <div className={styles.chartTimeContainer}>

      {textVert && <div className={styles.textVert}>
        {textVert}
      </div>}

      {textHoriz && <div className={styles.textHoriz}>
        {textHoriz}
      </div>}

      <div
        id='tur_chartInA'
        className={styles.chartTime}
      >
        <CanvasTime
          showTimeGraph={showTimeGraph}
          onTimeframeChange={onTimeframeChange}
          c1={valuesC[0]}
          c2={valuesC[1]}
          t1={valuesT[0]}
          t2={valuesT[1]}
          maxC={100}
          maxT={20}
          height={212}
          width={212}
          colorA={colors[1]}
          colorB={colors[2]}
          colorA_blur={colors[0]}
        />
      </div>
    </div>
  )
}

export default ChartInA
