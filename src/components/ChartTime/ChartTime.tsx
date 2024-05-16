import React, { useEffect, useMemo, useState } from 'react'
import styles from './ChartTime.module.scss'
import CanvasTime from "../Canvas/CanvasTime"
import SliderVert from "../SliderVert/SliderVert"
import SliderHoriz from "../SliderHoriz/SliderHoriz"
import { ConcentrationPlotView, FirstOrderConcentration, ReactionRateChartLayoutSettings, SecondOrderConcentration, TimeChartLayoutSettings, ZeroOrderConcentration } from '../ConcentrationPlotView'
import { SizeStyle } from '../../helper/types'
import { ReactionSettings, ReactionType } from '../ConcentrationPlotView/constants'
import { ReactionComparisonViewModel, ReactionInput } from '../ConcentrationPlotView/ReactionComparisonViewModel'
import TimeSlider from '../TimeSlider'
import ConcentrationSlider from '../ConcentrationSlider'

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
  order: number
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
  order,
}: ChartTimeProps) => {

  const chartSize: SizeStyle = { width: 212, height: 212 }
  // const [reaction, setReaction] = useState<ReactionComparisonViewModel>(new ReactionComparisonViewModel())
  const [concentrationA, setConcentrationA] = useState<any>(new ZeroOrderConcentration() )
  const [concentrationB, setConcentrationB] = useState<any>(new ZeroOrderConcentration() )

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
    const inputParams: ReactionInput = {
      c1: valuesC[0] / 100,
      c2: valuesC[1] / 100,
      t1: valuesT[0],
      t2: valuesT[1],
    }
    update.initParams(inputParams, order)
    switch(order) {
      case 0:
        const zeroOrderConcentration = new ZeroOrderConcentration()
        zeroOrderConcentration.init4Params(inputParams.t1, inputParams.c1, inputParams.t2, inputParams.c2)
        setConcentrationA(zeroOrderConcentration)
        setConcentrationB(update.concentrationB(zeroOrderConcentration, inputParams.c1))
        break;
      case 1:
        const firstOrderConcentration = new FirstOrderConcentration()        
        firstOrderConcentration.init3Params(inputParams.c1, inputParams.t1, firstOrderConcentration.getRate(inputParams.t1, inputParams.c1, inputParams.t2, inputParams.c2))
        setConcentrationA(firstOrderConcentration)
        setConcentrationB(update.concentrationB(firstOrderConcentration, inputParams.c1))
        break;
      case 2:
        const secondOrderConcentration = new SecondOrderConcentration()
        secondOrderConcentration.init3Params(inputParams.c1, inputParams.t1, secondOrderConcentration.getRate(inputParams.t1, inputParams.c1, inputParams.t2, inputParams.c2))
        setConcentrationA(secondOrderConcentration)
        setConcentrationB(update.concentrationB(secondOrderConcentration, inputParams.c1))
        break;
    }
  }, [valuesT, valuesC, order])
  const {minDisabled, maxDisabled} = useMemo(() => {    
    const minDisabled = canvaTimeSliderT[0] === 1 ? true : false
    const maxDisabled = canvaTimeSliderT[1] === 1 ? true : false
    console.log({minDisabled, maxDisabled})
    return {minDisabled, maxDisabled}
  }, [canvaTimeSliderT])
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(0)
  useEffect(() => {
    const updateT = [...valuesT]
    updateT[0] = min
    setValuesT(updateT)
  }, [min])
  useEffect(() => {
    const updateT = [...valuesT]
    updateT[1] = max
    setValuesT(updateT)
  }, [max])
  return (
    <div className={styles.chartTimeContainer}>
      <SliderVert
        valuesC={valuesC}
        setValuesC={setValuesC}
        canvaTimeSliderC={canvaTimeSliderC}
        textVert={textVert}
      />

      {/* <SliderHoriz
        valuesT={valuesT}
        setValuesT={setValuesT}
        showThumbIndex={canvaTimeSliderT}
        distance={25}
      /> */}

      {/* <ConcentrationSlider disabled={false} /> */}
      <TimeSlider disabled={minDisabled} onChange={setMin}/>
      {minDisabled && <TimeSlider min={min + 2} max={20} disabled={maxDisabled} onChange={setMax}/>}

      <div className={styles.chartTime}>
        <ConcentrationPlotView
          {...chartSize}
          settings={reactionSetting}
          concentrationA={concentrationA}
          concentrationB={concentrationB}
          initialTime={valuesT[0]}
          finalTime={valuesT[1]}
          initialConcentration={valuesC[0]}
          finalConcentration={valuesC[1]}
          canSetCurrentTime={true}
          highlightChart={false}
          highlightLhsCurve={true}
          highlightRhsCurve={false}
          display={
            {
              reactant: {
                name: ReactionType.reactantName.A,
                color: colors[1],
              },
              product: {
                name: ReactionType.productName.A,
                color: colors[2],
              }
            }
          }
          includeAxis={true}
          tempLine={canvaTimeState > 0}
          timingState={canvaTimeState}
          onEndPlay={() => {
            console.log('&&& timer ended &&& ')
          }}
          canvaTimeSliderC={canvaTimeSliderC}
          canvaTimeSliderT={canvaTimeSliderT}
          order={order}
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
