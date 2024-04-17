import ReactSlider from "react-slider"
import styles from './ChartTime.module.scss'
import { useCallback, useMemo, useState } from "react"
import useAppData from "../../hooks/useAppData"
import CanvasTime from "./CanvasTime"
import { themeColors } from "../../constants"
import SliderVert from "./SliderVert"
import SliderHoriz from "./SliderHoriz"

interface ChartTimeProps {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  valuesT: number[]
  setValuesT: (val: number[]) => void
  canvaTimeSliderC: number[]
  canvaTimeSliderT: number[]
  // playAnimation: boolean
  canvaTimeState: number   //  0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  onTimeframeChange: (val: number) => void
  colors: string[]
}

const ChartTime = ({
  valuesC,
  setValuesC,
  canvaTimeSliderC,
  valuesT,
  canvaTimeSliderT,
  setValuesT,
  canvaTimeState: showTimeGraph,
  onTimeframeChange,
  colors,
}: ChartTimeProps) => {

  return (
    <div className={styles.chartTimeContainer}>
      {/* <button onClick={() => {
        const pointerC = showIndexC[1] > showIndexC[0] ? valuesC[1] : valuesC[0]
        console.log({ pointerC })
      }}>chartTest</button> */}

      <SliderVert
        valuesC={valuesC}
        setValuesC={setValuesC}
        canvaTimeSliderC={canvaTimeSliderC}
      // minDistance={[13, 0]}
      />

      <SliderHoriz
        valuesT={valuesT}
        setValuesT={setValuesT}
        canvaTimeSliderT={canvaTimeSliderT}
      />

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

export default ChartTime
