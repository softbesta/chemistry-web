import useAppData from "../../../hooks/useAppData"
import styles from './comparison.module.scss'
import { useEffect } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Second, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import ChooseMenu from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { dotColorList } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import ChartInA from "../../../components/ChartInA/ChartInA"
import { SizeStyle } from "../../../helper/types"
import OrderCardItem from "../../../components/OrderCardItem"

const ReactionComparison = () => {
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
        setIsEnableChooseMenu(curActions.isEnableChooseMenu)
      }
      if (curActions?.activeDotIndex !== undefined) {
        setActiveDotIndex(curActions.activeDotIndex)
      }
      if (Array.isArray(curActions?.canvaTimeSliderC)) {
        setCanvaTimeSliderC(curActions.canvaTimeSliderC)
      }
      if (Array.isArray(curActions?.canvaTimeSliderT)) {
        setCanvaTimeSliderT(curActions.canvaTimeSliderT)
      }
    }
  }, [curStep, curActions])

  // get available next step number
  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) {
      update = 0
      updatePageFromMenu(getNextMenu(-1))
      return
    }
    else if (update >= maxStep_Second) {
      update = maxStep_Second - 1
      updatePageFromMenu(getNextMenu(1))
      return
    }

    return update
  }
  // call when click prev step
  const onStepChange = (step: number) => {
    console.log('===onStepChange===', { step })
    const nextStep = getNextStep(step)
    console.log({ curStep, nextStep })
    if (nextStep === undefined) return
    if (curStep === nextStep) return
    // Tutorial-Highlight
    removeHighlightElement(tutorials[curStep]?.highlight)
    if (tutorials[nextStep]?.highlight?.length > 0) {
      highlightElement(tutorials[nextStep].highlight)
    }

    setCurStep(nextStep)
  }
  // remove highlighted elements when page opens
  useEffect(() => {
    return () => removeHighlightElement(tutorials[curStep]?.highlight)
  }, [])

  const getOrderListItems = () => {
    const order0 = {
      title: 'Order: 0',
      // exp0: `[A<span class="sm_botom">t</span>] = [A<span class="sm_botom">0</span>] - kt`,
      exp0: `&nbsp;[A__t__] = [A__0__] - kt`,
      exp1: `**1.00** = 1.0 - 0.07 (**0.0**)`,
      exp2: `&nbsp;Rate = k[A]^0^`,
      exp3: `**0.070** = 0.07(**1.00**)^0^`,
    }
    const order1 = {
      title: 'Order: 1',
      exp0: `&nbsp;[A__t__] = [A__0__]e^-kt^`,
      exp1: `**1.00** = 1.0e^0.07 (**0.0**)^`,
      exp2: `&nbsp;Rate = k[A]^1^`,
      exp3: `**0.069** = 0.07(**1.00**)^1^`,
    }
    const order2 = {
      title: 'Order: 2',
      exp0: `&nbsp;[A__t__] = [A__0__]([A__0__]kt+1)`,
      exp1: `**1.00** = 1.0/(1.0(0.14)(**0.0**)+1)`,
      exp2: `&nbsp;Rate = k[A]^2^`,
      exp3: `**0.143** = 0.14(**1.00**)^2^`,
    }
    return [order0, order1, order2]
  }
  const orderListItems = getOrderListItems()

  const beakerSize: SizeStyle = { width: 170, height: 170 }
  const timeInASize: SizeStyle = { width: 130, height: 130 }

  return <div className={styles.container}>
    <ChapterMenu />

    <div className={styles.reactionDrawContainer}>
      <div className={styles.chartBeakerCol}>
        <EnergyProfile
          valuesC={valuesC}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          canvasSize={beakerSize}
        />
        <EnergyProfile
          valuesC={valuesC}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          canvasSize={beakerSize}
        />
        <EnergyProfile
          valuesC={valuesC}
          beakerDotColor={dotColorList[activeDotIndex]}
          beakerState={canvaBeakerState}
          canvasSize={beakerSize}
        />
      </div>
      <div className={styles.chartTimeCol}>
        <ChartInA
          className={styles.chartInA}
          valuesC={valuesC}
          canvaTimeSliderC={canvaTimeSliderC}
          valuesT={valuesT}
          canvaTimeSliderT={canvaTimeSliderT}
          canvaTimeState={canvaTimeState}
          onTimeframeChange={val => setTimeframe(val)}
          colors={dotColorList[activeDotIndex]}
          textVert={`[${'A'}]`}
          textHoriz={`Time`}
          canvasSize={timeInASize}
        />
        <ChartInA
          className={styles.chartInA}
          valuesC={valuesC}
          canvaTimeSliderC={canvaTimeSliderC}
          valuesT={valuesT}
          canvaTimeSliderT={canvaTimeSliderT}
          canvaTimeState={canvaTimeState}
          onTimeframeChange={val => setTimeframe(val)}
          colors={dotColorList[activeDotIndex]}
          textVert={`[${'A'}]`}
          textHoriz={`Time`}
          canvasSize={timeInASize}
        />
        <ChartInA
          className={styles.chartInA}
          valuesC={valuesC}
          canvaTimeSliderC={canvaTimeSliderC}
          valuesT={valuesT}
          canvaTimeSliderT={canvaTimeSliderT}
          canvaTimeState={canvaTimeState}
          onTimeframeChange={val => setTimeframe(val)}
          colors={dotColorList[activeDotIndex]}
          textVert={`[${'A'}]`}
          textHoriz={`Time`}
          canvasSize={timeInASize}
        />
      </div>
    </div>
    <div className={styles.reactionContentContainer}>
      <div className={styles.orderListContainer}>
        {orderListItems.map((item, index) => <OrderCardItem
          key={index}
          orderType={index}
          {...item}
        />)}
      </div>
      <TutorialControl
        className={styles.tutorial}
        turText={tur_Text[curStep]}
        onStepChange={onStepChange}
        isDisableNextButton={isEnableChooseMenu}
      />
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionComparison
