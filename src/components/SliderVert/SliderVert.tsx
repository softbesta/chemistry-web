import styles from './SliderVert.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import MultiRangeSliderVert from "../MutiRangeSlider/MultiRangeSliderVert"

interface SliderVert {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  canvaTimeSliderC: number[]
  textVert?: string
  distance?: number
  minValue?: number
  maxRange?: number
}

const SliderVert = ({ valuesC, setValuesC, canvaTimeSliderC: showIndexC, distance = 13, minValue = 0, maxRange = 100, textVert }: SliderVert) => {

  // const [vals, setVals] = useState(valuesC)

  const infoC = useMemo(() => {
    let showCount = 0, disabledCount = 0, activeIndex = 0
    showIndexC.forEach((item, index) => {
      item > 0 && showCount++
      item === 1 && disabledCount++
      if (item === 2) activeIndex = index
    })
    return {
      showCount,
      disabledCount,
      activeIndex,
    }
  }, [showIndexC])

  const getValueC = () => {
    let update: number[] = []
    update = valuesC
    return update
  }

  const handleChangeAB = (vals: number[]) => {
    let valMax = vals[0]
    let valMin = vals[1]

    if (valMin > valMax - distance) {
      valMin = valMax - distance
    }
    valMin = Math.max(valMin, minValue)
    valMax = Math.max(valMax, valMin + distance)
    valMax = Math.min(valMax, maxRange)
    const update = [valMax, valMin]
    setValuesC(update)

    setTextC(update[infoC.activeIndex] / 100)
  }

  const [textC, setTextC] = useState<number>()
  useEffect(() => {
    setTextC(valuesC[infoC.activeIndex] / 100)
  }, [showIndexC])

  const [upCounter, setUpCounter] = useState(0)
  const [downCounter, setDownCounter] = useState(0)
  const refSpinTimer = useRef<NodeJS.Timer>()

  const startTimer = (isUp: number) => {
    if (isUp > 0) {
      setUpCounter(v => v + 1)
    } else {
      setDownCounter(v => v + 1)
    }
    refSpinTimer.current = setInterval(() => {
      if (isUp > 0) {
        setUpCounter(v => v + 1)
      } else {
        setDownCounter(v => v + 1)
      }
    }, 100)
  }
  const stopTimer = () => {
    clearInterval(refSpinTimer.current)
    refSpinTimer.current = undefined
  }
  useEffect(() => {
    if (upCounter <= 0) return
    const update = [...valuesC]
    update[infoC.activeIndex]++
    handleChangeAB(update)
  }, [upCounter])
  useEffect(() => {
    if (downCounter <= 0) return
    const update = [...valuesC]
    update[infoC.activeIndex]--
    handleChangeAB(update)
  }, [downCounter])

  return <div className={styles.container}>
    <div className={styles.sliceVertical}>
      {
        infoC.showCount > 0 &&
        <div style={{ position: 'relative' }}>
          <div className={styles.sliderback}></div>
          <MultiRangeSliderVert
            width={167}
            max={maxRange}
            distance={13}
            minVal={14}
            showThumbIndex={showIndexC}
            values={getValueC()}
            onChange={(vals) => handleChangeAB(vals)}
          />
        </div>
      }
    </div>
    <div className={styles.textVert}>
      <p>{`${textVert || '[A]'}`}</p>
      <p className='txt-red'>{textC?.toFixed(2)} M</p>
    </div>
    <div className={styles.vertBtnGroup}>
      {/* <input
            type="number"
            value={value}
            min={0}
            max={100}
            step={1}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ paddingRight: '24px', boxSizing: 'border-box' }}
        /> */}
      <button
        className={styles.btnUp}
        onMouseDown={() => startTimer(1)}
        onMouseUp={() => stopTimer()}
        onMouseLeave={() => stopTimer()}
        onTouchStart={() => startTimer(1)}
        onTouchEnd={() => stopTimer()}
      >▲</button>
      <button
        className={styles.btnDown}
        onMouseDown={() => startTimer(-1)}
        onMouseUp={() => stopTimer()}
        onMouseLeave={() => stopTimer()}
        onTouchStart={() => startTimer(-1)}
        onTouchEnd={() => stopTimer()}
      >▼</button>
    </div>
  </div>
}
export default SliderVert