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
  showIndexC: number[]
  showIndexT: number[]
  // playAnimation: boolean
  showTimeGraph: number   //  0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  onTimeframeChange: (val: number) => void
}

const ChartTime = ({
  valuesC,
  setValuesC,
  showIndexC,
  valuesT,
  showIndexT,
  setValuesT,
  showTimeGraph,
  onTimeframeChange,
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
        showIndexC={showIndexC}
      // minDistance={[13, 0]}
      />

      <SliderHoriz
        valuesT={valuesT}
        setValuesT={setValuesT}
        showIndexT={showIndexT}
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
          pointerC={showIndexC[1] > showIndexC[0] ? valuesC[1] : valuesC[0]}
          pointerT={showIndexT[0] > showIndexT[1] ? valuesT[0] : valuesT[1]}
          height={212}
          width={212}
          colorA={themeColors.A}
          colorB={themeColors.B}
          colorA_blur={themeColors.none}
        />
      </div>
    </div>
  )
}

export default ChartTime
