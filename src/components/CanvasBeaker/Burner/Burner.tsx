import { BurnerFire, BurnerPan } from "../../Images"
import SliderHoriz from "../SliderHoriz/SliderHoriz"
import styles from './Burner.module.scss'

interface BurnerProps {
  isActive: boolean
  fireVal: number
  min: number
  max: number
  onChange: (val: number) => void
}
const Burner = ({ isActive = false, fireVal, min, max, onChange }: BurnerProps) => {
  const showThumbIndex = isActive ? [2, 0] : [1, 0]
  const value = (fireVal - min) / ((max - min) / 1000)
  const onChangeValue = (val: number) => {
    const update = val * (max - min) / 1000 + min
    onChange(update)
  }

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
      max={1000}
      distance={0}
      values={[value, 1000]}
      setValues={(val) => onChangeValue(val[0])}
      showThumbIndex={showThumbIndex}
    />
  </div>
}

export default Burner