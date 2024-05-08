import React, { useEffect, useState } from 'react'
import styles from './ChartTime.module.scss'
import CanvasTime from "../Canvas/CanvasTime"
import SliderVert from "../SliderVert/SliderVert"
import SliderHoriz from "../SliderHoriz/SliderHoriz"
import { ConcentrationPlotView, ReactionRateChartLayoutSettings, TimeChartLayoutSettings } from '../ConcentrationPlotView'
import { SizeStyle } from '../../helper/types'
import { ReactionSettings, ReactionType } from '../ConcentrationPlotView/constants'
import { ReactionComparisonViewModel, ReactionInput } from '../ConcentrationPlotView/ReactionComparisonViewModel'

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
  canvaTimeState,
  onTimeframeChange,
  colors,
  textVert,
}: ChartTimeProps) => {

  const chartSize: SizeStyle = { width: 212, height: 212 }
  const [reaction, setReaction] = useState<ReactionComparisonViewModel>(new ReactionComparisonViewModel())
  const reactionSetting = new ReactionRateChartLayoutSettings(
    chartSize.width!,
    ReactionSettings.Axis.minC,
    ReactionSettings.Axis.maxC,
    ReactionSettings.Axis.minT,
    ReactionSettings.Axis.maxT,
    true,
    {} as TimeChartLayoutSettings
  )

  useEffect(() => {
    const update = new ReactionComparisonViewModel()
    console.log({valuesC,valuesT})
    const inputParams: ReactionInput = {
      c1: valuesC[0] / 100,
      c2: valuesC[1] / 100,
      t1: valuesT[0],
      t2: valuesT[1],
    }
    update.initParams(inputParams)
    setReaction(update)

    console.log({ inputParams })
    console.log({ update })
  }, [valuesT, valuesC])

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
        <ConcentrationPlotView
          {...chartSize}
          settings={reactionSetting}
          concentrationA={reaction.zeroOrder}
          concentrationB={reaction.zeroOrderB}
          initialTime={valuesT[0]}
          finalTime={valuesT[1]}
          canSetCurrentTime={true}
          highlightChart={false}
          highlightLhsCurve={true}
          highlightRhsCurve={false}
          display={
            {
              reactant: {
                name: ReactionType.reactantName.A,
                color: ReactionType.reactantColor.A,
              },
              product: {
                name: ReactionType.productName.A,
                color: ReactionType.productColor.A,
              }
            }
          }
          includeAxis={true}
          timingState={0}
          onEndPlay={() => {
            console.log('&&& timer ended &&& ')
          }}
          order={0}
        />


        {/* <CanvasTime
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
        /> */}
      </div>
    </div>
  )
}

export default ChartTime
