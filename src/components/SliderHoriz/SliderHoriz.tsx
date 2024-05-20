import styles from './SliderHoriz.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import MultiRangeSliderHoriz from "../MutiRangeSlider/MultiRangeSliderHoriz"
import CanvasSlider from '../Slider'

interface SliderHoriz {
  valuesT: number[]
  setValuesT: (val: number[]) => void
  showThumbIndex: number[]
  distance?: number
  minValue?: number
  maxRange?: number
}

const flexibleV = 10;

const SliderHoriz = ({ valuesT, setValuesT, showThumbIndex, distance = 25, minValue = 0, maxRange = 100 }: SliderHoriz) => {
  const infoT = useMemo(() => {
    let showCount = 0, disabledCount = 0, activeIndex = 0
    showThumbIndex.forEach((item, index) => {
      item > 0 && showCount++
      item === 1 && disabledCount++
      if (item === 2) activeIndex = index
    })
    return {
      showCount,
      disabledCount,
      activeIndex,
    }
  }, [showThumbIndex])

  const getValueT = () => {
    let update: number[] = []
    update = valuesT
    console.log({update})
    return update.map(item => item * flexibleV)
  }

  const handleChangeVal = (vals: number[]) => {
    // console.log('===handleChangeAB=== ', { vals, valuesT: valuesT })
    // let update: number[] = []
    // update = [...vals].map(item => item / flexibleV)
    // setValuesT(update)

    console.log('ppp',{vals})
    
    let valMin = vals[0]
    let valMax = vals[1]

    valMax = Math.max(valMax, valMin + distance)
    valMax = Math.min(valMax, maxRange)

    valMin = Math.min(valMin, valMax - distance)
    valMin = Math.max(valMin, minValue)

    const update = [valMin / flexibleV, valMax / flexibleV]
    setValuesT(update)

    setTextT(update[infoT.activeIndex])
  }

  const [textT, setTextT] = useState<number>()

  useEffect(() => {
    setTextT(valuesT[infoT.activeIndex])
  }, [showThumbIndex])

  const [upCounter, setUpCounter] = useState(0)
  const [downCounter, setDownCounter] = useState(0)
  const refIncrement = useRef<NodeJS.Timer>()

  const startTimer = (isUp: number) => {
    if (isUp > 0) {
      setUpCounter(v => v + 1)
    } else {
      setDownCounter(v => v + 1)
    }
    refIncrement.current = setInterval(() => {
      if (isUp > 0) {
        setUpCounter(v => v + 1)
      } else {
        setDownCounter(v => v + 1)
      }
    }, 100)
  }
  const stopTimer=() => {
    clearInterval(refIncrement.current)
    refIncrement.current = undefined
  }
  useEffect(() => {
    if (upCounter <= 0) return
    const update = getValueT()
    update[infoT.activeIndex]++
    handleChangeVal(update)
  }, [upCounter])
  useEffect(() => {
    if (downCounter <= 0) return
    const update = getValueT()
    update[infoT.activeIndex]--
    handleChangeVal(update)
  }, [downCounter])


  // @ts-ignore
  const isMobile = window.mobileCheck()
  return (
    <div className={styles.container}>
      <div className={styles.sliceHorizontal}>
        {
          infoT.showCount > 0 &&
          <div style={{ position: 'relative' }}>
            <div className={styles.sliderback}></div>
            <MultiRangeSliderHoriz
              max={maxRange}
              width={167}
              distance={distance}
              showThumbIndex={showThumbIndex}
              values={getValueT()}
              onChange={(vals) => handleChangeVal(vals)}
            />
            {/* <CanvasSlider
              direction='horizontal'
              max={200}
              width={150}
              distance={25}
              showThumbIndex={showThumbIndex}
              values={getValueT()}
              onChange={(val, index) => handleChangeVal(val)}
            /> */}
          </div>
        }
      </div>
      <div className={styles.textHoriz}>
        <p>{`Time:`} <span className='txt-red'>{textT?.toFixed(1)} s</span></p>
      </div>
      <div className={styles.horizBtnGroup}>
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
          onMouseDown={() => startTimer(-1)}
          onMouseUp={() => stopTimer()}
          onMouseLeave={() => stopTimer()}
          onTouchStart={() => startTimer(-1)}
          onTouchEnd={() => stopTimer()}
        >◀</button>
        <button
          className={styles.btnDown}
          onMouseDown={() => startTimer(1)}
          onMouseUp={() => stopTimer()}
          onMouseLeave={() => stopTimer()}
          onTouchStart={() => startTimer(1)}
          onTouchEnd={() => stopTimer()}
        >▶</button>
        {/* {value} */}
      </div>
    </div>
  )
}
export default SliderHoriz