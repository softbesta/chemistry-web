import React from 'react'
import styles from './ChartTime.module.scss'
import CanvasTime from "../Canvas/CanvasTime"
import SliderVert from "../SliderVert/SliderVert"
import SliderHoriz from "../SliderHoriz/SliderHoriz"

interface ChartTimeProps {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  valuesT: number[]
  setValuesT: (val: number[]) => void
  canvaTimeSliderC: number[]
  canvaTimeSliderT: number[]
  canvaTimeState: number   //  0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  onTimeframeChange: (val: number) => void
  colors: string[]
  textVert?: string
  textHoriz?: string
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
  textVert,
}: ChartTimeProps) => {

  return (
    <div className={styles.chartTimeContainer}>
      <SliderVert
        valuesC={valuesC}
        setValuesC={setValuesC}
        canvaTimeSliderC={canvaTimeSliderC}
        textVert={textVert}
        // minDistance={[13, 0]}
      />

      <SliderHoriz
        valuesT={valuesT}
        setValuesT={setValuesT}
        showThumbIndex={canvaTimeSliderT}
      />

      <div className={styles.chartTime}>
        <CanvasTime
          showTimeGraph={showTimeGraph}
          onTimeframeChange={onTimeframeChange}
          c1={valuesC[0]}
          c2={valuesC[1]}
          t1={valuesT[0]}
          t2={valuesT[1]}
          maxC={130}
          maxT={25.9}
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
