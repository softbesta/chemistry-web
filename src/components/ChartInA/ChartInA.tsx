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
  canvaTimeSliderC,
  valuesT,
  canvaTimeSliderT,
  canvaTimeState: showTimeGraph,
  onTimeframeChange,
  colors,
  textVert,
  textHoriz,
}: ChartTimeProps) => {

  return (
    <div className={styles.chartTimeContainer}>
      {/* <button onClick={() => {
        const pointerC = showIndexC[1] > showIndexC[0] ? valuesC[1] : valuesC[0]
        console.log({ pointerC })
      }}>chartTest</button> */}

      {/* <SliderVert
        valuesC={valuesC}
        setValuesC={setValuesC}
        canvaTimeSliderC={canvaTimeSliderC}
      // minDistance={[13, 0]}
      />

      <SliderHoriz
        valuesT={valuesT}
        setValuesT={setValuesT}
        canvaTimeSliderT={canvaTimeSliderT}
      /> */}

      {textVert && <div className={styles.textVert}>
        {textVert}
      </div>}

      {textHoriz && <div className={styles.textHoriz}>
        {textHoriz}
      </div>}

      <div
        // id='tur_chartTime'
        className={styles.chartTime}
      >
        {/* <Canvas draw={drawChartTime} height={222} width={222} /> */}
        <CanvasTime
          // play={playAnimation}
          // play={showTimeGraph > 1}
          // show={false}
          // show={showTimeGraph > 0}
          showTimeGraph={showTimeGraph}
          onTimeframeChange={onTimeframeChange}
          // c1={0.5}
          // c2={0.8}
          // t1={16}
          // t2={3.2}
          c1={valuesC[1] / 100}
          c2={valuesC[0] / 100}
          t1={valuesT[1]}
          t2={valuesT[0]}
          pointerC={canvaTimeSliderC[1] > canvaTimeSliderC[0] ? valuesC[1] : valuesC[0]}
          pointerT={canvaTimeSliderT[0] > canvaTimeSliderT[1] ? valuesT[0] : valuesT[1]}
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
