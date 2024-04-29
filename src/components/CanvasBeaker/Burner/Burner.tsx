import { BurnerFire, BurnerPan } from "../../Images"
import SliderHoriz from "../SliderHoriz/SliderHoriz"
import styles from './Burner.module.scss'

interface BurnerProps {
  fireVal: number
  onChange: (val: number) => void
}
const Burner = ({ fireVal, onChange }: BurnerProps) => {

  return <div className={styles.burnerContainer}>
    <img
      src={BurnerPan}
      height={50}
    />
    <img
      className={styles.burnerFire}
      src={BurnerFire}
      height={30}
    />
    <SliderHoriz
      max={100}
      distance={0}
      values={[fireVal, 100]}
      setValues={(val) => onChange(val[0])}
      showThumbIndex={[2, 0]}
    />
  </div>
}

export default Burner