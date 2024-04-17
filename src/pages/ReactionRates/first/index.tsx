import useAppData from "../../../hooks/useAppData"
import styles from './first.module.scss'
import { useEffect, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStep_Zero, stepsActions, tur_MathBlanks, tur_Hightlights, tur_Text } from "./constants"
import useFunctions from "../../../hooks/useFunctions"
import ChooseMenu from "../../../layout/ChooseMenu"
import WatchMenu from "../../../layout/WatchMenu"
import { MenuList, MenuOrder, dotColorList } from "../../../constants"
import { getStorage, setStorage } from "../../../helper/functions"
import ChapterMenu from "../../../layout/ChapterMenu"

const ReactionFirst = () => {
  const {
    curStep,
    // setCurStep,
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
    // curTurs
    // setCurTurs,
    // setPlayAnimation,
    setCurStep,
    canvaBeakerState,
    setCanvaBeakerState,
    setTimeframe,
    setCurMenu,
    isEnableChooseMenu,
    setIsEnableChooseMenu,
    activeDotIndex,
    setActiveDotIndex,
  } = useAppData()

  const {
    // onNextStep,
    // onPrevStep,
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()

  const [prevStep, setPrevStep] = useState<number>(curStep)

  // *** Setup tutorial actions here
  const zeroTurs = Array.from(Array(tur_Text.length).keys()).map(idx => {
    return {
      text: tur_Text[idx],
      highlight: tur_Hightlights[idx],
      actions: stepsActions[idx],
    }
  })

  // *** Tutorial-ACTIONS  - curStep changes
  const curActions = zeroTurs[curStep]?.actions
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

    // const expressions = [
    //   `\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - 0.79}{19.40 - 12.12}\\]`,
    //   `\\[ t_{1/2} = [A_0]/(2k) \\]`,
    //   `\\[ 11.46 = 1.68 / (2 x 0.07) \\]`,
    //   `\\[ Rate = k[A]^0 \\]`,
    //   `\\[ 0.07 = 0.073(0.60)^0 \\]`,
    // ]

    const c1 = (valuesC[0] ?? 0) / 100
    const c2 = (valuesC[1] ?? 0) / 100
    const t1 = valuesT[0]
    const t2 = valuesT[1]
    const c = c2 - c1
    const t = t2 - t1
    const k = -(c / t)
    const deltaT = t2 - t1
    const deltaC = c2 - c1
    const rateConstant = -deltaC / deltaT
    const a0Numerator = (t1 * c2) - (t2 * c1)
    const A0 = a0Numerator / (t1 - t2)
    const t_12 = A0 / (2 * rateConstant)

    const exp0 = `\\[ k = \\frac{${c2.toFixed(2)} - ${c1.toFixed(2)}}{${t1.toFixed(2)}}\\]`
    const exp1 = `\\[ t_{1/2} = In(2)/k \\]`
    const exp2 = `\\[ ${t_12.toFixed(2)} = ${A0.toFixed(2)} / ${k.toFixed(2)} \\]`
    const exp3 = `\\[ Rate = k[A]^1 \\]`
    const exp4 = `\\[ ${k.toFixed(2)} = ${k.toFixed(3)}(${c1.toFixed(2)})^1 \\]`

    return {
      exp0,
      exp1,
      exp2,
      exp3,
      exp4,
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
    // else if (update > stepPlayCount[activeMenu]) update = stepPlayCount[activeMenu]
    else if (update >= maxStep_Zero) {
      update = maxStep_Zero - 1
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
    removeHighlightElement(zeroTurs[curStep]?.highlight)
    if (zeroTurs[nextStep]?.highlight?.length > 0) {
      highlightElement(zeroTurs[nextStep].highlight)
    }

    console.log({ curStep })
    setPrevStep(curStep)
    setCurStep(nextStep)
  }

  const handleTest1 = () => {
    console.log('===handleTest=== 111')
    // console.log({ valuesC })
    // setCanvaTimeState(2)
    console.log({ prevStep, curStep })
  }
  const handleTest2 = () => {
    console.log('===handleTest2=== - ')
    const res = getStorage('courseStatus')
    console.log({ res })
    // setCanvaTimeState(1)
  }
  const handleTest3 = () => {
    console.log('===handleTest3=== - ')
    // console.log(' ', infoC, { isDisabledA, isDisabledB })
  }
  return <div className={styles.container}>
    <ChapterMenu />
    <ChooseMenu isEnable={isEnableChooseMenu} onClickItem={() => handleClickChooseMenuItem()} />
    <WatchMenu />
    {/* <p>step: {curStep}</p>
    <p>showTimeGraph: {canvaTimeState}</p>
    <p>beakerState: {canvaBeakerState}</p> */}

    <div className={styles.reactionDrawContainer}>
      {/* <div>
        <button onClick={() => handleTest1()}>111</button>
        <button onClick={() => handleTest2()}>222</button>
        <button onClick={() => handleTest3()}>TeST</button>
      </div> */}

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
      <div className={styles.chartInA}></div>
      <MathContent
        className={styles.firstMathContent}
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
