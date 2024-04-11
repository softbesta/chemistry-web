import useAppData from "../../../hooks/useAppData"
import styles from './styles.module.scss'
import { useEffect, useState } from "react"
import EnergyProfile from "../../../components/energyProfile"
import { generateEnergyArray } from "../../../helper/functions"
import ChartTime from "../../../components/chartTime"
import ChartBar from "../../../components/chartBar"

const ReactionZero = () => {
  const { count, concentration, setConcentration } = useAppData()

  const handletest = () => {
    setConcentration(v => (v + 3) > 100 ? 100 : v + 3)
  }
  const handletest1 = () => {
    setConcentration(v => (v - 3) < 0 ? 0 : v - 3)
  }

  return <div className={styles.container}>
    This is ReactionZero
    <button onClick={() => handletest()}>Test Energy</button>
    <button onClick={() => handletest1()}>Test222</button>
    <p>{count}</p>

    <div className={styles.reactionDrawContainer}>
      <EnergyProfile />
      <ChartTime />
      <ChartBar />
    </div>
    <div className={styles.reactionMathContainer}>
      <p>This is Math</p>
    </div>
  </div>
}
export default ReactionZero
