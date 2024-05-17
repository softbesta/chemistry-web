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

  const fireLevel = fireVal > 550 ? 3 : fireVal > 500 ? 2 : fireVal > 450 ? 1 : 0

  return <div className={styles.burnerContainer}>
    <img
      src={BurnerPan}
      height={50}
    />
    <div className={styles.burnerFire}>
      <div className={`${styles.fire} ${fireLevel % 2 === 0 ? styles.small : ''}`}>
        {fireLevel < 2 ?
          <div className={styles.fireCenter}>
            <div className={styles['fire-main']}>
              <div className={styles['corefire']}></div>
            </div>
            <div className={styles['fire-main-bottom']}>
              <div className={styles['corefire']}></div>
            </div>
          </div>
          :
          <>
            <div className={styles.fireLeft}>
              <div className={styles['fire-main']}>
                <div className={styles['corefire']}></div>
              </div>
              <div className={styles['fire-main-bottom']}>
                <div className={styles['corefire']}></div>
              </div>
            </div>
            <div className={styles.fireRight}>
              <div className={styles['fire-main']}>
                <div className={styles['corefire']}></div>
              </div>
              <div className={styles['fire-main-bottom']}>
                <div className={styles['corefire']}></div>
              </div>
            </div>
            <div className={styles.fireCenter}>
              <div className={styles['fire-main']}>
                <div className={styles['corefire']}></div>
              </div>
              <div className={styles['fire-main-bottom']}>
                <div className={styles['corefire']}></div>
              </div>
            </div>
          </>
        }
      </div>
      {/* <img
        // className={styles.burnerFire}
        src={BurnerFire}
        height={30}
      /> */}
    </div>
    <div
      id='tur_burnerSlider'
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: 8,
      }}
    >
      <SliderHoriz
        max={1000}
        distance={0}
        values={[value, 1000]}
        setValues={(val) => onChangeValue(val[0])}
        showThumbIndex={showThumbIndex}
        hidePointer={true}
      />
    </div>
  </div>
}

export default Burner