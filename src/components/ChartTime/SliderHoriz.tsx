import ReactSlider from "react-slider"
import styles from './SliderHoriz.module.scss'
import { useMemo } from "react"

interface SliderHoriz {
  valuesT: number[]
  setValuesT: (val: number[]) => void
  showIndexT: number[]
}

const SliderHoriz = ({ valuesT, setValuesT, showIndexT }: SliderHoriz) => {
  const infoT = useMemo(() => {
    let showCount = 0, disabledCount = 0
    showIndexT.forEach(item => {
      item > 0 && showCount++
      item === 1 && disabledCount++
    })
    return {
      showCount,
      disabledCount
    }
  }, [showIndexT])
  const getValueT = () => {
    if (showIndexT[0] > 0 && showIndexT[1] > 0) {
      console.log('===getValueC===', valuesT)
      return [valuesT[1], valuesT[0]]
    } else if (showIndexT[0] > 0) {
      console.log('===getValueC===  000', valuesT[0])
      return [valuesT[0]]
    } else if (showIndexT[1] > 0) {
      console.log('===getValueC===  111', valuesT[1])
      return [valuesT[1]]
    } else return []
  }
  const handleChangeTime = (values: number[] | number) => {
    console.log('===handleChangeAB=== ', { values, valuesC: valuesT })
    let update: number[] = valuesT
    if (Array.isArray(values)) {
      if (showIndexT[0] === 2) {
        update = [values[1], update[1]]
      }
      if (showIndexT[1] === 2) {
        update = [update[0], values[0]]
      }
    } else {
      if (showIndexT[0] === 2) {
        update = [values, update[1]]
      }
      if (showIndexT[1] === 2) {
        update = [update[0], values]
      }
    }
    console.log({ update })
    setValuesT(update)
  }
  return <div className={styles.container}>
    <div className={styles.sliceHorizontalBar} />
    <div className={styles.sliceHorizontal}>
      {infoT.showCount > 0 && <ReactSlider
        className={styles['horizontal-slider']}
        thumbClassName={styles['example-thumb']}
        trackClassName={styles['example-track']}
        value={getValueT()}
        min={0}
        max={200}
        step={1}
        onChange={(values, index) => {
          console.log({ values, index })
          handleChangeTime(values)
        }}
        disabled
      // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />}
    </div>
    <div className={styles.textHoriz}>
      <p>{`Time:`} {(getValueT()[1] ?? getValueT()[0])?.toFixed(2)}</p>
    </div>
  </div>
}
export default SliderHoriz