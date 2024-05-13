import styles from './SliderHoriz.module.scss'
import { useMemo } from "react"
import MultiRangeSliderHoriz from "../MutiRangeSlider/MultiRangeSliderHoriz"

interface SliderHoriz {
  valuesT: number[]
  setValuesT: (val: number[]) => void
  showThumbIndex: number[]
}

const flexibleV = 10;

const SliderHoriz = ({ valuesT, setValuesT, showThumbIndex }: SliderHoriz) => {
  const infoT = useMemo(() => {
    let showCount = 0, disabledCount = 0
    showThumbIndex.forEach(item => {
      item > 0 && showCount++
      item === 1 && disabledCount++
    })
    return {
      showCount,
      disabledCount
    }
  }, [showThumbIndex])

  const getValueT = () => {
    let update: number[] = []
    if (showThumbIndex[0] > 0 && showThumbIndex[1] > 0) {
      // console.log('===getValueT===', valuesT)
      update = [valuesT[0], valuesT[1]]
    } else if (showThumbIndex[0] > 0) {
      // console.log('===getValueT===  000', valuesT[0])
      update = [valuesT[0]]
    } else if (showThumbIndex[1] > 0) {
      // console.log('===getValueT===  111', valuesT[1])
      update = [valuesT[1]]
    } else update = []
    return update.map(item => item * flexibleV)
  }

  const handleChangeVal = (val: number[] | number) => {
    // console.log('===handleChangeAB=== ', { values: val, valuesT: valuesT })
    let update: number[] = [valuesT[0] * flexibleV, valuesT[1] * flexibleV]

    if (Array.isArray(val)) {
      if (showThumbIndex[0] === 2) {
        update = [val[0], update[1]]
      }
      if (showThumbIndex[1] === 2) {
        update = [update[0], val[1]]
      }
    } else {
      if (showThumbIndex[0] === 2) {
        update = [val, update[1]]
      }
      if (showThumbIndex[1] === 2) {
        update = [update[0], val]
      }
    }

    if (update[1] < 2) update[0] = 2;

    if (update[0] >= update[1] - 20) update[0] = update[1] - 20

    update = update.map(item => item / flexibleV)

    setValuesT(update)
  }

  const textT = useMemo(() => {
    const res = getValueT()[1] ?? getValueT()[0]
    if (!Number.isFinite(res)) {
      return undefined
    }
    return res / flexibleV
  }, [getValueT])


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
              distance={25}
              showThumbIndex={showThumbIndex}
              values={getValueT()}
              onChange={(val, index) => handleChangeVal(val)}
            />
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