
import ImgEnergy from '../assets/ReactionRates/reaction_boxes/energy.png'
import ImgEnergyIn from '../assets/ReactionRates/reaction_boxes/energy_in.png'
import ImgEnergyOut from '../assets/ReactionRates/reaction_boxes/energy_out.png'
import ImgEnergyDot from '../assets/ReactionRates/reaction_boxes/energyDot3.png'
import styles from './energyProfile.module.scss'

const EnergyDot = ({ value }: { value: boolean }) => {
  return value ?
    <img
      className={styles.energyDot}
      src={ImgEnergyDot}
      alt='dot'
      width={10}
      height={10}
    />
    :
    <div className={styles.energyDot} />
}

const EnergyProfile = ({ energyDots }: { energyDots: boolean[] }) => {
  console.log({ energyDots })
  return (
    <div className={styles.energyContainer}>
      <img
        className={styles.energyImg}
        src={ImgEnergyIn}
        alt="Aqueous"
        height={240}
        width={220}
      />
      <div className={styles.energyDotsContainer}>
        <div className={styles.energyDotsGrid}>
          {energyDots.map((energy, index) => <EnergyDot key={index} value={energy} />)}
        </div>
      </div>
      <img
        className={styles.energyImg}
        src={ImgEnergyOut}
        alt="Aqueous"
        height={240}
        width={220}
      />
    </div>
  )
}
export default EnergyProfile