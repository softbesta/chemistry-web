import useAppData from "../../../hooks/useAppData"
import styles from './zero.module.scss'
import { useEffect, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"
import { useHighLight } from "../../../hooks/useHighlight"
import { maxStepCount_Zero, stepsActions, tur_Hightlights, tur_Text } from "./constants"
import useFunctions from "../../../hooks/useFunctions"

const ReactionZero = () => {
  const {
    curStep,
    // setCurStep,
    concentrationAB: valuesC,
    setConcentrationAB,
    reactionTime: valuesT,
    showIndexC,
    setShowIndexC,
    showIndexT,
    setShowIndexT,
    setReactionTime: setValuesT,
    showTimeGraph,
    setShowTimeGraph,
    // curTurs
    // setCurTurs,
    // setPlayAnimation,
    setCurStep,
  } = useAppData()

  const {
    // onNextStep,
    // onPrevStep,
  } = useFunctions()

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()

  // const [curTur_text, setCurTur_text] = useState<string[]>()
  // const [curTur_light, setCurTur_light] = useState<string[]>()

  // const handletest = () => {
  //   setConcentrationAB(v => (v + 3) > 100 ? 100 : v + 3)
  // }
  // const handletest1 = () => {
  //   setConcentrationAB(v => (v - 3) < 0 ? 0 : v - 3)
  // }

  const zeroTurs = Array.from(Array(10).keys()).map(idx => {
    return {
      text: tur_Text[idx],
      highlight: tur_Hightlights[idx],
      actions: stepsActions[idx],
    }
  })
  const maxStep = maxStepCount_Zero
  console.log('000,', { zeroTurs })

  useEffect(() => {
    console.log('zero page ===useEffect=== --- ', { curStep })
    const curActions = zeroTurs[curStep]?.actions

    if (curActions) {
      curActions?.showTimeGraph && setShowTimeGraph(curActions.showTimeGraph)
      curActions?.showIndexC && setShowIndexC(curActions.showIndexC)
      curActions?.showIndexT && setShowIndexT(curActions.showIndexT)
    }

  }, [curStep])

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

    const exp0 = `\\[ Rate = ${k.toFixed(2)} = -\\frac{${c.toFixed(2)}}{${t.toFixed(2)}} = -\\frac{${c2.toFixed(2)} - ${c1.toFixed(2)}}{${t2.toFixed(2)} - ${t1.toFixed(2)}}\\]`
    const exp1 = `\\[ t_{1/2} = [A_0]/(2k) \\]`
    const exp2 = `\\[ ${t_12.toFixed(2)} = ${A0.toFixed(2)} / (2 x ${k.toFixed(2)}) \\]`
    const exp3 = `\\[ Rate = k[A]^0 \\]`
    const exp4 = `\\[ ${k.toFixed(2)} = ${k.toFixed(3)}(${c1.toFixed(2)})^0 \\]`

    return {
      exp0,
      exp1,
      exp2,
      exp3,
      exp4,
    }
  }
  // const blanks = [[true, true, true, true, true], [true]]
  const blanks = [[]]


  // get available next step number
  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) update = 0
    // else if (update > stepPlayCount[activeMenu]) update = stepPlayCount[activeMenu]
    else if (update >= maxStepCount_Zero) update = maxStepCount_Zero - 1
    return update
  }
  // call when click prev step
  const onStepChange = (step: number) => {
    const nextStep = getNextStep(step)
    if (curStep === nextStep) return
    // console.log({ curStep }, tur_Hightlights[curStep])
    // console.log({ nextStep }, tur_Hightlights[nextStep])
    removeHighlightElement(zeroTurs[curStep]?.highlight)
    if (zeroTurs[nextStep]?.highlight?.length > 0) {
      highlightElement(zeroTurs[nextStep].highlight)
    }

    setCurStep(nextStep)
  }
  const onPrevStep = () => {
    console.log('===handleStepPrev===', curStep, { tur_Hightlights })
    onStepChange(-1)
  }
  // call when click next step
  const onNextStep = () => {
    console.log('===handleStepNext===', curStep, { tur_Hightlights })
    onStepChange(1)
  }



  const handleTest1 = () => {
    console.log('===handleTest=== 111')
    // console.log({ valuesC })

    setShowIndexC([2, 0])
    setShowIndexT([2, 0])
  }
  const handleTest2 = () => {
    // console.log('===handleTest2=== - ', { showIndexC, valuesC })
    setShowIndexC([1, 2])
    setShowIndexT([1, 2])
  }
  const handleTest3 = () => {
    // setShowIndexC([1, 1])
    console.log('===handleTest3=== - ', { showTimeGraph, showIndexT, valuesT })
    // console.log(' ', infoC, { isDisabledA, isDisabledB })
  }
  return <div className={styles.container}>
    <p>step: {curStep}</p>
    <p>showTimeGraph: {showTimeGraph}</p>

    <div className={styles.reactionDrawContainer}>
      <div>
        <button onClick={() => handleTest1()}>111</button>
        <button onClick={() => handleTest2()}>222</button>
        <button onClick={() => handleTest3()}>TeST</button>
      </div>

      <EnergyProfile
        concentrationAB={valuesC}
      />
      <ChartTime
        valuesC={valuesC}
        setValuesC={val => setConcentrationAB(val)}
        showIndexC={showIndexC}
        valuesT={valuesT}
        setValuesT={val => setValuesT(val)}
        showIndexT={showIndexT}
        showTimeGraph={showTimeGraph}
        setShowTimeGraph={setShowTimeGraph}
      />
      <ChartBar />
    </div>
    <div className={styles.reactionContentContainer}>
      <MathContent
        {...getFormula()}
        blanks={blanks}
      />
      <TutorialControl
        // curStep={curStep}
        turText={tur_Text[curStep]}
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
      />
    </div>
    {isHighlight && <div className='overlay'></div>}
  </div>
}
export default ReactionZero
