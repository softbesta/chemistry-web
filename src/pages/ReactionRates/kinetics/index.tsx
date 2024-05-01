import useAppData from "../../../hooks/useAppData"
import styles from './kinetics.module.scss'
import { useCallback, useEffect, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Kinetics, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text, chooseMenuItems } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import { ChooseMenuSel } from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { dotColorList, sliderVertText } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import ChartInA from "../../../components/ChartInA/ChartInA"
import { convertExpToHtml } from "../../../helper/functions"
import { EnergyCatalystContainer, EnergyCatalystMoveableItem } from "../../../components/EnergyCatalyst"
import { BeakerSettings, BeakerShape } from "../../../components/CanvasBeaker/BeakerShape"
import BeakerWater from "../../../components/CanvasBeaker/BeakerShape/BeakerWater"
import { ChamberF } from "../../../components/CanvasBeaker/Chamber/ChamberF"
import Chamber from "../../../components/CanvasBeaker/Chamber/Chamber"
import SliderHoriz from "../../../components/CanvasBeaker/SliderHoriz/SliderHoriz"
import {
  ConcentrationPlotView,
  FirstOrderConcentration,
  ReactionRateChartLayoutSettings,
  TimeChartLayoutSettings,
  ZeroOrderConcentration
} from "../../../components/ConcentrationPlotView"
import { ReactionSettings, ReactionType } from "../../../components/ConcentrationPlotView/constants"
import Burner from "../../../components/CanvasBeaker/Burner/Burner"
import EnergyProfileChart from "../../../components/EnergyProfileChart/EnergyProfileChart"
import { EnergyRateChartSettings, ReactionOrder } from "../../../components/EnergyProfileChart"
import { EnergyProfileChatInput } from "../../../components/EnergyProfileChart/EnergyProfileChartInput"
import EnergyProfileRateChart from "../../../components/EnergyProfileRateChart/EnergyProfileRateChart"

const ReactionKinetics = () => {
  const {
    curStep,
    valuesC,
    setValuesC,
    valuesT,
    setValuesT,
    canvaTimeSliderC,
    setCanvaTimeSliderC,
    canvaTimeSliderT,
    setCanvaTimeSliderT,
    canvaTimeState,
    setCanvaTimeState,
    setCurStep,
    canvaBeakerState,
    setCanvaBeakerState,
    setTimeframe,
    isEnableChooseMenu,
    setIsEnableChooseMenu,
    activeDotIndex,
    setActiveDotIndex,
    catalystItemStates,
    setCatalystItemStates,
  } = useAppData()

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()

  // *** Setup tutorial actions here
  const tutorials = Array.from(Array(tur_Text.length).keys()).map(idx => {
    return {
      text: tur_Text[idx],
      highlight: tur_Hightlights[idx],
      actions: stepsActions[idx],
    }
  })

  // *** Tutorial-ACTIONS  - curStep changes
  const curActions = tutorials[curStep]?.actions as any
  useEffect(() => {
    console.log('*** Tutorial-ACTIONS  - curStep changes', { curStep })
    // console.log('curActions: ', { curActions, curStep })
    if (curActions) {
      if (curActions?.canvaTimeState !== undefined) {
        setCanvaTimeState(curActions.canvaTimeState)
      }
      if (curActions?.canvaBeakerState !== undefined) {
        setCanvaBeakerState(curActions.canvaBeakerState)
      }
      if (curActions?.isEnableChooseMenu !== undefined) {
        console.log('zzz curActions.isEnableChooseMenu', curActions.isEnableChooseMenu)
        setIsEnableChooseMenu(curActions.isEnableChooseMenu)
      }
      if (curActions?.activeDotIndex !== undefined) {
        console.log('zzz curActions.activeDotIndex', curActions.activeDotIndex)
        setActiveDotIndex(curActions.activeDotIndex)
      }
      if (Array.isArray(curActions?.canvaTimeSliderC)) {
        setCanvaTimeSliderC(curActions.canvaTimeSliderC)
      }
      if (Array.isArray(curActions?.canvaTimeSliderT)) {
        setCanvaTimeSliderT(curActions.canvaTimeSliderT)
      }
      if (Array.isArray(curActions?.catalystItemStates)) {
        setCatalystItemStates(curActions.catalystItemStates)
      }
      if (curActions?.curCatShakingOrderIdx !== undefined) {
        setCurCatShakingOrderIdx(curActions.curCatShakingOrderIdx)
      }
      if (curActions?.showCatalystMoveItem !== undefined) {
        setShowCatalystMoveItem(curActions.showCatalystMoveItem)
      }
      if (curActions?.isBurnerActive !== undefined) {
        console.log('zzz curActions.isBurnerActive', curActions.isBurnerActive, { curActions })
        setIsBurnerActive(curActions.isBurnerActive)
      }
      if (curActions?.energyProfileChartState !== undefined) {
        console.log('zzz curActions.energyProfileChartState', curActions.energyProfileChartState, { curActions })
        setEnergyProfileChartState(curActions.energyProfileChartState)
      }
    }
  }, [curStep, curActions])

  const handleClickChooseMenuItem = (index: number) => {
    setChooseMenuIndex(index)
  }

  const getFormula = () => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const At = c2
    const A0 = c1
    const k = ((1 / At) - (1 / A0)) / t1
    const t_12 = 1 / (k * A0)
    const rate = k * (At * At)

    const exp0 = `\\[ k = A e^{-Ea/RT}\\]`
    const exp1 = `\\[ ln(k) = ln(A) - \\frac{Ea}{RT}\\]`
    const exp2 = `\\[ ln(\\frac{k1}{k2}) = \\frac{Ea}{R}(\\frac{T_1 - T_2}{T_1T_2}) \\]`
    const exp4 = `\\[ ln(\\frac{1.3}{1.3}) = \\frac{9e3}{8.31}(\\frac{400 - 400}{400 x 400}) \\]`

    return {
      exp0,
      exp1,
      exp2,
      exp4,
    }
  }

  const getTurTextByStep = useCallback(() => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const At = c2
    const A0 = c1
    const k = ((1 / At) - (1 / A0)) / t1
    const t_12 = 1 / (k * A0)
    const rate = k * (At * At)
    // console.log({c1, c2, t1, t2, lnA0, lnAt, k, t_12, rate})

    // turText can be undefined on new page due to curStep(lazy changes of state variable)
    const turTxt = tur_Text[curStep]
    const turVal = [
      k.toFixed(3),   // val[0]
      t_12.toFixed(2),// val[1]
      k.toFixed(2),   // val[2]
    ]
    const update = turTxt?.map((item) => {
      // const update: string[] = []
      let res = ''
      if (typeof item === 'function') {
        res = item(turVal)
      } else {
        res = item
      }
      return convertExpToHtml(res)
    }) ?? []
    return update
  }, [curStep])

  // get available next step number
  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) {
      update = 0
      console.log('getNextStep 0', { update })
      updatePageFromMenu(getNextMenu(-1))
      return
    }
    else if (update >= maxStep_Kinetics) {
      update = maxStep_Kinetics - 1
      updatePageFromMenu(getNextMenu(1))
      return
    }

    return update
  }
  // call when click prev step
  const onStepChange = (step: number) => {
    console.log('===onStepChange===', { step })
    const nextStep = getNextStep(step)
    console.log({ nextStep })
    if (nextStep === undefined) return
    if (curStep === nextStep) return
    // Tutorial-Highlight
    removeHighlightElement(tutorials[curStep]?.highlight)
    if (tutorials[nextStep]?.highlight?.length > 0) {
      highlightElement(tutorials[nextStep].highlight)
    }

    console.log({ curStep })
    setCurStep(nextStep)
  }
  // remove highlighted elements when page opens
  useEffect(() => {
    return () => removeHighlightElement(tutorials[curStep]?.highlight)
  }, [])


  // ** Chamber control variables
  const initActiveGases = [
    {
      id: 1,
      particleSize: 4.5,  // ** control gas cirle size
      color: 0x00d0f0,  // ** control gas color
      // name: 'Oxygen',
      // symbol: <>O<sub>2</sub></>,
      // svgSymbol: <>O<tspan baselineShift="sub">2</tspan></>,
      mass: 1,
      particleType: 'circle',
    },
    {
      id: 2,
      particleSize: 4.5,  // ** control gas cirle size
      color: 0xff0000,  // ** control gas color
      // name: 'Hydrogen',
      // symbol: <>H<sub>2</sub></>,
      // svgSymbol: <>H<tspan baselineShift="sub">2</tspan></>,
      mass: 1,
      particleType: 'circle',
    },
    {
      id: 10,
      particleSize: 4,
      color: 0xffff00,
      mass: 1,
      particleType: 'pentagon',
    },
    {
      id: 11,
      particleSize: 4,
      color: 0x00ffff,
      mass: 1,
      particleType: 'pentagon',
    },
    {
      id: 12,
      particleSize: 4,
      color: 0xff00ff,
      mass: 1,
      particleType: 'pentagon',
    }
  ]
  const [activeGases, setActiveGases] = useState(initActiveGases)

  const initGasCounts = [15, 15, 5];  // ** control counts here
  const [gasCounts, setGasCounts] = useState(initGasCounts)

  const handleGasIncrease = () => {
    const update = [...gasCounts].map(g => g + 1)
    console.log('handleGasIncrease', update)
    setGasCounts(update)
  }
  const handleGasDecrease = () => {
    const update = [...gasCounts].map(g => g - 1)
    console.log('handleGasIncrease', update)
    setGasCounts(update)
  }
  const handleTest = () => {
    console.log('handleGasIncrease', { gasCounts })
  }

  const temperature = 0.01
  // Speed constant used to convert between matter.js speed and meters
  // per second (m/s)
  const particleSpeed = 0.05      // ** control movespeed here

  // ** Beaker control variables
  const settings = new BeakerSettings(290, true)
  // console.log({ settings })
  const beakerSize = { width: 240, height: 270 }
  const waterLevel = 0.4          // ** control waterlevel here

  // ** Graph Chart control variables
  const graphChartSize = { width: 220, height: 220 }

  const concentrationA = new ZeroOrderConcentration()
  concentrationA.init4Params(0, 0.8, 10, 0.2)
  const concentrationB = new ZeroOrderConcentration()
  concentrationB.init4Params(0, 0.2, 10, 0.8)
  // const concentrationA = new FirstOrderConcentration()
  // concentrationA.init3Params(1, 3, 10)
  // const concentrationB = new FirstOrderConcentration()
  // concentrationB.init3Params(1, 3, 10)

  // ** Beaker Burner state ;  'false': disable Burner, 'true': active Burner
  const [isBurnerActive, setIsBurnerActive] = useState(false)
  const [valueFire, setValueFire] = useState(400)

  // ** Control Catalyst State
  const [catShakingOrder, setCatShakingOrder] = useState<number[]>([0, 1, 2])
  const [curCatShakingOrderIdx, setCurCatShakingOrderIdx] = useState<number>(0)
  const [showCatalystMoveItem, setShowCatalystMoveItem] = useState<boolean>(false)
  const onCatalystItemShake = (shakingCount: number, itemIndex: number) => {
    console.log('===onCatalystItemShake===', { shakingCount, itemIndex, curCatShakingOrderIdx, catShakingOrder })
    if (shakingCount > 10) {
      // // if (!shakedOrder.includes(itemIndex)) {
      // const restOrders = catShakingOrder.filter(s => s !== itemIndex)
      // const update = [
      //   ...restOrders.slice(0, curCatShakingOrderIdx),
      //   itemIndex,
      //   ...restOrders.slice(curCatShakingOrderIdx),
      // ]
      // console.log({ update })
      // setCatShakingOrder(update)
      // // }
      onStepChange(1)
    }
  }
  const onCatalystMenuItemClick = (index: number) => {
    const others = [...catalystItemStates]
    others.splice(index, 1)
    const normalState = Math.max(...others) // find normal state from other which is disabled(2) or active(3)
    const updatedState = [3, 3, 3]
    updatedState[index] = 1  // change current state[index] as moveable(hide menu item and show moveable item).

    // console.log('clicked catalyst menu item', { id, origin: catalystItemStates, update })
    setCatalystItemStates(updatedState)

    const restOrders = catShakingOrder.filter(s => s !== index)
    const updatedOrder = [
      ...restOrders.slice(0, curCatShakingOrderIdx),
      index,
      ...restOrders.slice(curCatShakingOrderIdx),
    ]
    console.log({ updatedOrder })
    setCatShakingOrder(updatedOrder)
    onStepChange(1)
  }
  const curCatalystItemState = catalystItemStates.map((state, index) => {
    // hide menu item for shaking.
    if (showCatalystMoveItem && index === catShakingOrder[curCatShakingOrderIdx]) {
      return 1
    }
    // hide menu item which is completed shaking.
    if (catShakingOrder.slice(0, curCatShakingOrderIdx).includes(index)) return 0
    return state
  })

  const [chartTimingState, setChartTimingState] = useState(0)


  enum Catalyst {
    A = 1,
    B,
    C,
  }

  const [chooseMenuIndex, setChooseMenuIndex] = useState(0)

  // ** EnergyProfileChart variables.
  const energyProfileInput = new EnergyProfileChatInput(ReactionOrder[chooseMenuIndex], valueFire, chooseMenuIndex + 1)
  const [energyProfileChartState, setEnergyProfileChartState] = useState(0)

  // ** EnergyProfileRateChart variables
  const concentrationC = new ZeroOrderConcentration()
  concentrationC.init2Params(0.1, 0.1)

  return <div className={styles.container}>
    <ChapterMenu />
    <ChooseMenuSel
      selectedIndex={chooseMenuIndex}
      menuItems={chooseMenuItems}
      isEnable={isEnableChooseMenu}
      onClickItem={handleClickChooseMenuItem}
    />
    {/* <WatchMenu /> */}

    <div className={styles.reactionDrawContainer}>
      <EnergyCatalystContainer
        catalystTypes={[0, 1, 2]}
        catalystItemStates={curCatalystItemState}
        setCatalystItemStates={(val) => setCatalystItemStates(val)}
        onCatalystMenuItemClick={onCatalystMenuItemClick}
        activeCatIdx={showCatalystMoveItem ? catShakingOrder[curCatShakingOrderIdx] : -1}
        regionWidth={300}
        regionHeight={150}
        maxShakingCount={10}
        onChangeShakingCount={(val, index) => onCatalystItemShake(val, index)}
      />
      <div className={styles.reactionBeaker}>
        <div className={styles.beakerShape}>
          <BeakerShape
            {...beakerSize}
            settings={settings}
            waterlevel={waterLevel}
          />
          {/* <ChamberF
            width={width}
            height={height}
            activeGases={activeGases}
            gasProportions={gasProportions}
            isPlaying={isPlaying}
            allowEscape={allowEscape}
            escapeSpeed={escapeSpeed}
            temperature={temperature}
          /> */}
          {/* <Chamber
            {...beakerSize}
            waterLevel={waterLevel}
            activeGases={activeGases}
            gasCounts={gasCounts}
            isPlaying={true}
            allowEscape={false}
            escapeSpeed={1000}
            temperature={temperature}
          /> */}
          <ChamberF
            {...beakerSize}
            waterLevel={waterLevel}
            activeGases={activeGases}
            gasCounts={gasCounts}
            isPlaying={true}
            allowEscape={false}
            escapeSpeed={1000}
            temperature={temperature}
            gasSpeed={particleSpeed}
          />
        </div>
        {/* <SliderHoriz
          className={styles.sliderHoriz}
          // width={300}
          max={100}
          distance={0}
          values={[valueFire, 100]}
          setValues={(val) => setValueFire(val[0])}
          showThumbIndex={[2, 0]}
        /> */}
        <Burner
          isActive={isBurnerActive}
          min={400}
          max={600}
          fireVal={valueFire}
          onChange={(val) => {
            setValueFire(val)
          }}
        />

        {/* <EnergyProfile
          valuesC={valuesC}
          valuesT={valuesT}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          onEndPlay={() => onStepChange(1)}
        /> */}
      </div>
      {/* <div style={{ position: 'relative', top: 50 }}>
        <button onClick={handleGasIncrease}>Increase Gas</button>
        <button onClick={handleGasDecrease}>Decrease Gas</button>
        <button onClick={handleTest}>LogGas</button>
      </div> */}
    </div>
    <div className={styles.reactionContentContainer}>
      <div className={styles.reactionChartRow}>
        {/* <button onClick={() => {
          console.log({chartTimingState: chartTimingState + 1})
          setChartTimingState(v => v + 1)
        }}>Test start</button>
        <button onClick={() => {
          console.log({chartTimingState: chartTimingState - 1})
          setChartTimingState(v => v - 1)
        }}>Test stop</button> */}
        <div className={styles.chartInA}>
          <EnergyProfileRateChart
            {...graphChartSize}
            // width={250}
            // height={250}
            settings={new EnergyRateChartSettings(graphChartSize.width)}
            equation={concentrationC}
            currentTempInverse={1 / 500}
            highlightChart={true}
          />
          <div>
            <span className={styles.txtInK}> In(k) </span>
            <span className={styles.txtT}> 1/T </span>
            <span className={styles.txtSlope}> Slope=-Ea/R </span>
          </div>
          {/* <ConcentrationPlotView
            {...graphChartSize}
            settings={
              new ReactionRateChartLayoutSettings(
                graphChartSize.width,
                ReactionSettings.Axis.minC,
                ReactionSettings.Axis.maxC,
                ReactionSettings.Axis.minT,
                ReactionSettings.Axis.maxT,
                true,
                {} as TimeChartLayoutSettings
              )
            }
            concentrationA={concentrationA}
            concentrationB={concentrationB}
            initialTime={5}
            finalTime={10}
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
            timingState={chartTimingState}
            onEndPlay={() => {
              console.log('&&& timer ended &&& ')
            }}
          /> */}
        </div>
        <div className={styles.chartInA}>
          <EnergyProfileChart
            kind={chooseMenuIndex}
            // width={250}
            // height={250}
            {...graphChartSize}
            settings={new EnergyRateChartSettings(graphChartSize.width)}
            state={energyProfileChartState}
            chartInput={energyProfileInput}
          />
          <div>
            <span className={styles.txtEnergy}> Energy </span>
            <span className={styles.txtReactants}> Reactants </span>
            <span className={styles.txtProducts}> Products </span>
          </div>
        </div>
      </div>
      <div className={styles.reactionContentRow}>
        <MathContent
          className={styles.mathContent}
          {...getFormula()}
          blanks={tur_MathBlanks[curStep]}
          blanksCount={11}
        />
        <TutorialControl
          turText={getTurTextByStep()}
          onStepChange={onStepChange}
          isDisableNextButton={false}
        />
      </div>
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionKinetics
