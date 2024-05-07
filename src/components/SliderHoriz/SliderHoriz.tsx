import styles from './SliderHoriz.module.scss'
import { useMemo } from "react"
import MultiRangeSliderHoriz from "../MutiRangeSlider/MultiRangeSliderHoriz"
import ReactSlider from 'react-slider'

interface SliderHoriz {
  valuesT: number[]
  setValuesT: (val: number[]) => void
  showThumbIndex: number[]
}

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
    return update.map(item => item * 10)
  }

  const handleChangeVal = (val: number[] | number) => {
    // console.log('===handleChangeAB=== ', { values: val, valuesT: valuesT })
    let update: number[] = [valuesT[0] * 10, valuesT[1] * 10]
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
    // console.log('111 ', update)
    if (update[1] < 2) update[0] = 2
    if (update[0] > update[1] - 2) update[0] = update[1] - 1
    // if (update[1] <= update[0]) update[1] = update[0] <= 200 ? update[0] : 200
    update = update.map(item => item / 10)
    // console.log('222 ', update)
    setValuesT(update)
  }
  const textT = useMemo(() => {
    const res = getValueT()[1] ?? getValueT()[0]
    if (!Number.isFinite(res)) {
      return undefined
    }
    return res / 10
  }, [getValueT])


  return (
    <div className={styles.container}>
      <div className={styles.sliceHorizontal}>
        {
          infoT.showCount > 0 &&
          <>
            <ReactSlider
              className={styles['horizontal-slider']}
              thumbClassName={styles['example-thumb']}
              trackClassName={styles['example-track']}
              value={getValueT()}
              min={0}
              max={200}
              step={1}
              onChange={(val, index) => {
                // console.log({ val, index })
                handleChangeVal(val)
              }}
              renderThumb={(props, state) => {
                const { index } = state
                let disabledclass = ''
                if (index === 0 && showThumbIndex[0] === 1) {
                  disabledclass = styles.disabled
                }
                if (index === 1 && showThumbIndex[1] === 1) {
                  disabledclass = styles.disabled
                }
                return <div
                  {...props}
                  className={`${disabledclass} ${props.className}`}
                ></div>
              }}
            />
            <MultiRangeSliderHoriz
              max={200}
              width={230}
              distance={20}
              showThumbIndex={showThumbIndex}
              values={getValueT()}
              onChange={(val, index) => handleChangeVal(val)}
            />
          </>
        }
      </div>
      <div className={styles.textHoriz}>
        <p>{`Time:`} <span className='txt-red'>{textT?.toFixed(1)} s</span></p>
      </div>
    </div>
  )
}
export default SliderHoriz