import styles from './SliderHoriz.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import MultiRangeSliderHoriz from "../MutiRangeSlider/MultiRangeSliderHoriz"
import CanvasSlider from '../Slider'

interface SliderHoriz {
  valuesT: number[]
  setValuesT: (val: number[]) => void
  showThumbIndex: number[]
  distance?: number
}

const flexibleV = 10;

const SliderHoriz = ({ valuesT, setValuesT, showThumbIndex, distance = 25 }: SliderHoriz) => {
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
    return update.map(item => item * flexibleV)
  }

  const handleChangeVal = (vals: number[]) => {
    // console.log('===handleChangeAB=== ', { vals, valuesT: valuesT })
    let update: number[] = []
    update = [...vals].map(item => item / flexibleV)
    setValuesT(update)

    const txtT = update[infoT.activeIndex]
    setTextT(txtT)
  }

  const [textT, setTextT] = useState<number>()

  useEffect(() => {
    setTextT(valuesT[infoT.activeIndex])
  }, [showThumbIndex])

  const [value, setValue] = useState(0)
  const refIncrement = useRef<NodeJS.Timer>()

  const handleUpDownBtn = (step: number) => {
    setValue(v => v + step)
  }
  const startIncrement = (step: number) => {
    handleUpDownBtn(step)
    refIncrement.current = setInterval(() => {
      handleUpDownBtn(step)
    }, 100)
  }
  const stopIncrement=() => {
    clearInterval(refIncrement.current)
    refIncrement.current = undefined
  }

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
              max={200}
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
          onMouseDown={() => startIncrement(1)}
          onMouseUp={() => stopIncrement()}
          onMouseLeave={() => stopIncrement()}
          onTouchStart={() => startIncrement(1)}
          onTouchEnd={() => stopIncrement()}
        >◀</button>
        <button
          className={styles.btnDown}
          onMouseDown={() => startIncrement(-1)}
          onMouseUp={() => stopIncrement()}
          onMouseLeave={() => stopIncrement()}
          onTouchStart={() => startIncrement(-1)}
          onTouchEnd={() => stopIncrement()}
        >▶</button>
        {/* {value} */}
      </div>
    </div>
  )
}
export default SliderHoriz