import useAppData from "../../../hooks/useAppData"
import styles from './first.module.scss'
import { useEffect } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_First, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import ChooseMenu from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { dotColorList } from "../../../constants"
import ChapterMenu from "../../../layout/ChapterMenu"
import CanvasTime from "../../../components/Canvas/CanvasTime"
import ChartInA from "../../../components/ChartInA/ChartInA"

const ReactionFirst = () => {
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
    }

  }, [curStep, curActions])

  const handleClickChooseMenuItem = () => {
    onStepChange(1)
  }

  const getFormula = () => {
    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const t2 = valuesT[1]

    const lnA0 = Math.log(c1)
    const lnAt = Math.log(c2)
    const k = (lnA0 - lnAt) / t1
    const t_12 = Math.log(2) / k
    const rate = k * c1

    console.log({ c1, c2, lnA0, lnAt, t1 })

    const exp0 = `\\[ k = \\frac{In[A_0] - In[A_t]}{t}\\]`
    const exp1 = `\\[ ${k.toFixed(2)} = \\frac{(${lnA0.toFixed(2)}) - (${lnAt.toFixed(2)})}{${t1.toFixed(2)}}\\]`
    const exp2 = `\\[ t_{1/2} = In(2)/k \\]`
    const exp3 = `\\[ ${t_12.toFixed(2)} = ${Math.log(2).toFixed(2)} / ${k.toFixed(2)} \\]`
    const exp4 = `\\[ Rate = k[A]^1 \\]`
    const exp5 = `\\[ ${rate.toFixed(2)} = ${k.toFixed(3)}(${c1.toFixed(2)})^1 \\]`

    return {
      exp0,
      exp1,
      exp2,
      exp3,
      exp4,
      exp5,
    }
  }

  // get available next step number
  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) {
      update = 0
      console.log('getNextStep 0', { update })
      updatePageFromMenu(getNextMenu(-1))
      return
    }
    else if (update >= maxStep_First) {
      update = maxStep_First - 1
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

  return <div className={styles.container}>
    <ChapterMenu />
    <ChooseMenu isEnable={isEnableChooseMenu} onClickItem={() => handleClickChooseMenuItem()} />
    <WatchMenu />

    <div className={styles.reactionDrawContainer}>
      <EnergyProfile
        valuesC={valuesC}
        beakerDotColor={dotColorList[activeDotIndex]}
        beakerState={canvaBeakerState}
        onEndPlay={() => { }}
      />
      <ChartTime
        valuesC={valuesC}
        setValuesC={val => setValuesC(val)}
        canvaTimeSliderC={canvaTimeSliderC}
        valuesT={valuesT}
        setValuesT={val => setValuesT(val)}
        canvaTimeSliderT={canvaTimeSliderT}
        canvaTimeState={canvaTimeState}
        onTimeframeChange={val => setTimeframe(val)}
        colors={dotColorList[activeDotIndex]}
      />
      <ChartBar
        colors={dotColorList[activeDotIndex]}
      />
    </div>
    <div className={styles.reactionContentContainer}>
      <div className={styles.chartInA}>
        <ChartInA
          valuesC={valuesC}
          canvaTimeSliderC={canvaTimeSliderC}
          valuesT={valuesT}
          canvaTimeSliderT={canvaTimeSliderT}
          canvaTimeState={canvaTimeState}
          onTimeframeChange={val => setTimeframe(val)}
          colors={dotColorList[activeDotIndex]}
          textVert={`In(${'A'})`}
          textHoriz={`Time`}
        />
      </div>
      <MathContent
        className={styles.mathContent}
        {...getFormula()}
        blanks={tur_MathBlanks[curStep]}
        blanksCount={11}
      />
      <TutorialControl
        turText={tur_Text[curStep]}
        onStepChange={onStepChange}
        isDisableNextButton={isEnableChooseMenu}
      />
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionFirst
