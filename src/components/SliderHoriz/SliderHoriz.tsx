import styles from './SliderHoriz.module.scss'
import { useEffect, useMemo, useState } from "react"
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
    </div>
  )
}
export default SliderHoriz