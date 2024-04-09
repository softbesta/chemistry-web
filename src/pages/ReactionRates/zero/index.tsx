import useAppData from "../../../hooks/useAppData"
import styles from './styles.module.scss'
import ImgAqueous from '../../../assets/ReactionRates/aqueous-25@3x.png'
import ImgEnergy from '../../../assets/ReactionRates/reaction_boxes/energy.png'
import ImgEnergyIn from '../../../assets/ReactionRates/reaction_boxes/energy_in.png'
import ImgEnergyOut from '../../../assets/ReactionRates/reaction_boxes/energy_out.png'
import ImgTime from '../../../assets/ReactionRates/reaction_boxes/time.png'
import ImgBar from '../../../assets/ReactionRates/reaction_boxes/bar.png'
import { useEffect, useState } from "react"
import ReactSlider from 'react-slider'
import EnergyProfile from "../../../components/energyProfile"
import { generateEnergyArray } from "../../../helper/functions"

const totalDots = 190

const ReactionZero = () => {
  const { count } = useAppData()
  const [energyDots, setEnergyDots] = useState(Array.from({ length: totalDots }, () => true))
  const [energyDotsCount, setEnergyDotsCount] = useState<number>(0)

  const generateDots = (count: number) => {

  }

  useEffect(() => {
    const update = generateEnergyArray(energyDots, energyDotsCount)
    setEnergyDots(update)
    console.log({ update })
  }, [energyDotsCount])

  const handletest = () => {
    setEnergyDotsCount(v => (v + 3) > 190 ? 190 : v + 3)
  }
  const handletest1 = () => {
    setEnergyDotsCount(v => (v - 3) < 0 ? 0 : v - 3)
  }

  return <div className={styles.container}>
    This is ReactionZero
    <button onClick={() => handletest()}>Test Energy</button>
    <button onClick={() => handletest1()}>Test222</button>
    <div className={styles.reactionContainer}>
      <EnergyProfile energyDots={energyDots} />
      <div className={styles.timeContainer}>
        <img
          className={styles.timeImg}
          src={ImgTime}
          alt='Time'
          height={180}
          width={180}
        />
      </div>
      <div className={styles.barContainer}>
        <img
          className={styles.barImg}
          src={ImgBar}
          alt='Bar'
          height={180}
          width={180}
        />
      </div>
    </div>
    <p>{count}</p>
  </div>
}
export default ReactionZero
