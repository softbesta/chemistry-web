import { BurnerFire, BurnerPan } from "../../Images"
import SliderHoriz from "../SliderHoriz/SliderHoriz"
import styles from './Burner.module.scss'

interface BurnerProps {
  isActive: boolean
  fireVal: number
  onChange: (val: number) => void
}
const Burner = ({ isActive = false, fireVal, onChange }: BurnerProps) => {
  const showThumbIndex = isActive ? [2, 0] : [1, 0]

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
      showThumbIndex={showThumbIndex}
    />
  </div>
}

export default Burner