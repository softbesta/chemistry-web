import useAppData from "../../../hooks/useAppData"
import styles from './zero.module.scss'
import { useEffect, useState } from "react"
import EnergyProfile from "../../../components/EnergyProfile"
import ChartTime from "../../../components/ChartTime"
import ChartBar from "../../../components/ChartBar"
import MathContent from "../../../components/MathContent"
import TutorialControl from "../../../components/TutorialControl"

const ReactionZero = () => {
  const {
    curStep,
    setCurStep,
    concentrationAB,
    setConcentrationAB,
    reactionTime
  } = useAppData()

  // const handletest = () => {
  //   setConcentrationAB(v => (v + 3) > 100 ? 100 : v + 3)
  // }
  // const handletest1 = () => {
  //   setConcentrationAB(v => (v - 3) < 0 ? 0 : v - 3)
  // }

  const expressions = [
    `\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - 0.79}{19.40 - 12.12}\\]`,
    `\\[ t_{1/2} = [A_0]/(2k) \\]`,
    `\\[ 11.46 = 1.68 / (2 x 0.07) \\]`,
    `\\[ Rate = k[A]^0 \\]`,
    `\\[ 0.07 = 0.073(0.60)^0 \\]`,
  ]

  const c1 = (concentrationAB[0] ?? 0) / 100
  const c2 = (concentrationAB[1] ?? 0) / 100
  const t1 = reactionTime[0]
  const t2 = reactionTime[1]
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
  const exp4 = `\\[ ${k.toFixed(2)} = ${k.toFixed(3)}(${(k * 10).toFixed(2)})^0 \\]`
  // const blanks = [[true, true, true, true, true], [true]]
  const blanks = [[]]

  return <div className={styles.container}>
    {/* <p>step: {stepPlay}</p> */}

    <button onClick={() => {
        console.log('reactionTime: ', reactionTime)
        console.log('concentrationAB: ', concentrationAB)
      }}>TEST</button>
    <div className={styles.reactionDrawContainer}>
      <EnergyProfile />
      <ChartTime />
      <ChartBar />
    </div>
    <div className={styles.reactionContentContainer}>
      <MathContent
        exp0={exp0} exp1={exp1} exp2={exp2} exp3={exp3} exp4={exp4}
        blanks={blanks}
      />
      <TutorialControl />
    </div>
  </div>
}
export default ReactionZero
