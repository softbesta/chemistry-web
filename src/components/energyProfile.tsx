
import ImgEnergy from '../assets/ReactionRates/reaction_boxes/energy.png'
import ImgEnergyIn from '../assets/ReactionRates/reaction_boxes/energy_in.png'
import ImgEnergyOut from '../assets/ReactionRates/reaction_boxes/energy_out.png'
import ImgEnergyDot from '../assets/ReactionRates/reaction_boxes/energyDot3.png'
import styles from './energyProfile.module.scss'

const EnergyDot = ({ value }: { value: number }) => {
  return <img
    className={styles.energyDot}
    src={ImgEnergyDot}
    alt='dot'
    width={10}
    height={10}
  />
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
          {energyDots.map((energy, index) => {
            if (!energy) return <div className={styles.energyDot} key={index} />
            return (<img
              key={index}
              className={styles.energyDot}
              src={ImgEnergyDot}
              alt='dot'
              width={10}
              height={10}
            />)
          })}
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