import useAppData from "../../../hooks/useAppData"
import styles from './zero.module.scss'
import { useEffect, useState } from "react"
import EnergyProfile from "../../../components/energyProfile"
import { generateEnergyArray } from "../../../helper/functions"
import ChartTime from "../../../components/chartTime"
import ChartBar from "../../../components/chartBar"
import MathContent from "../../../components/mathContent"
import TutorialControl from "../../../components/tutorialControl"

const ReactionZero = () => {
  const {
    stepZero,
    setStepZero,
    concentration,
    setConcentration,
    reactionTime
  } = useAppData()

  const handletest = () => {
    setConcentration(v => (v + 3) > 100 ? 100 : v + 3)
  }
  const handletest1 = () => {
    setConcentration(v => (v - 3) < 0 ? 0 : v - 3)
  }

  const expressions = [
    `\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - 0.79}{19.40 - 12.12}\\]`,
    `\\[ t_{1/2} = [A_0]/(2k) \\]`,
    `\\[ 11.46 = 1.68 / (2 x 0.07) \\]`,
    `\\[ Rate = k[A]^0 \\]`,
    `\\[ 0.07 = 0.073(0.60)^0 \\]`,
  ]

  const exp0 = `\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - ${(concentration / 100).toFixed(2)}}{19.40 - ${reactionTime.toFixed(2)}}\\]`
  const exp1 = `\\[ t_{1/2} = [A_0]/(2k) \\]`
  const exp2 = `\\[ 11.46 = 1.68 / (2 x 0.07) \\]`
  const exp3 = `\\[ Rate = k[A]^0 \\]`
  const exp4 = `\\[ 0.07 = 0.073(0.60)^0 \\]`

  return <div className={styles.container}>
    This is ReactionZero
    <button onClick={() => handletest()}>Test Energy</button>
    <button onClick={() => handletest1()}>Test222</button>
    <p>step: {stepZero}</p>

    <div className={styles.reactionDrawContainer}>
      <EnergyProfile />
      <ChartTime />
      <ChartBar />
    </div>
    <div className={styles.reactionMathContainer}>
      <MathContent
        exp0={exp0} exp1={exp1} exp2={exp2} exp3={exp3} exp4={exp4}
      />
      <TutorialControl />
    </div>
  </div>
}
export default ReactionZero
