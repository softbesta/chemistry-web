import useAppData from "../../../hooks/useAppData"
import styles from './zero.module.scss'
import { useEffect } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"

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
    
    // setPlayAnimation,
  } = useAppData()

  // const handletest = () => {
  //   setConcentrationAB(v => (v + 3) > 100 ? 100 : v + 3)
  // }
  // const handletest1 = () => {
  //   setConcentrationAB(v => (v - 3) < 0 ? 0 : v - 3)
  // }

  useEffect(() => {
    console.log('zero page ===useEffect=== --- ', { curStep })
    if (curStep === 3) {
      setShowTimeGraph(1)
    } else if (curStep === 4) {
      setShowTimeGraph(2)
    } else if (curStep > 4) {
      setShowTimeGraph(3)
    } else setShowTimeGraph(0)
  }, [curStep])

  // const expressions = [
  //   `\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - 0.79}{19.40 - 12.12}\\]`,
  //   `\\[ t_{1/2} = [A_0]/(2k) \\]`,
  //   `\\[ 11.46 = 1.68 / (2 x 0.07) \\]`,
  //   `\\[ Rate = k[A]^0 \\]`,
  //   `\\[ 0.07 = 0.073(0.60)^0 \\]`,
  // ]

  const getFormula = () => {

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

  const handleTest1 = () => {
    console.log('===handleTest=== 111')
    // console.log({ valuesC })

    setShowIndexC([2, 0])
  }
  const handleTest2 = () => {
    // console.log('===handleTest2=== - ', { showIndexC, valuesC })
    setShowIndexC([1, 2])
  }
  const handleTest3 = () => {
    // setShowIndexC([1, 1])
    console.log('===handleTest3=== - ', { showTimeGraph, showIndexC, valuesC })
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

      <EnergyProfile />
      <ChartTime
        valuesC={valuesC}
        setValuesC={val => setConcentrationAB(val)}
        valuesT={valuesT}
        setValuesT={val => setValuesT(val)}
        showIndexC={showIndexC}
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
      <TutorialControl />
    </div>
  </div>
}
export default ReactionZero
