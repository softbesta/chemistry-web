import ReactSlider from "react-slider"
import styles from './SliderVert.module.scss'
import { useMemo } from "react"

interface SliderVert {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  showIndexC: number[]
}

const SliderVert = ({ valuesC, setValuesC, showIndexC }: SliderVert) => {
  const infoC = useMemo(() => {
    let showCount = 0, disabledCount = 0
    showIndexC.forEach(item => {
      item > 0 && showCount++
      item === 1 && disabledCount++
    })
    return {
      showCount,
      disabledCount
    }
  }, [showIndexC])
  const disabledClass = infoC.disabledCount === 1 ? styles.disabled1 : infoC.disabledCount === 2 ? styles.disabled2 : ''
  console.log({ disabledClass })

  const getValueC = () => {
    if (showIndexC[0] > 0 && showIndexC[1] > 0) {
      console.log('===getValueC===', valuesC)
      return [valuesC[1], valuesC[0]]
    } else if (showIndexC[0] > 0) {
      console.log('===getValueC===  000', valuesC[0])
      return [valuesC[0]]
    } else if (showIndexC[1] > 0) {
      console.log('===getValueC===  111', valuesC[1])
      return [valuesC[1]]
    } else return []
  }
  const handleChangeAB = (values: number[] | number) => {
    console.log('===handleChangeAB=== ', { values, valuesC })
    let update: number[] = valuesC
    if (Array.isArray(values)) {
      if (showIndexC[0] === 2) {
        update = [values[1], update[1]]
      }
      if (showIndexC[1] === 2) {
        update = [update[0], values[0]]
      }
    } else {
      if (showIndexC[0] === 2) {
        update = [values, update[1]]
      }
      if (showIndexC[1] === 2) {
        update = [update[0], values]
      }
    }
    console.log({ update })
    setValuesC(update)
  }
  return <div className={styles.container}>
    <div>
      <button onClick={() => {
        console.log(getValueC())
      }}>111</button>
    </div>
    <div className={styles.sliceVerticalBar} />
    <div className={styles.sliceVertical}>
      {infoC.showCount > 0 && <ReactSlider
        className={`${styles['vertical-slider']} ${disabledClass}`}
        thumbClassName={styles['example-thumb']}
        trackClassName={styles['example-track']}
        orientation="vertical"
        value={getValueC()}
        min={0}
        max={100}
        onChange={(values, index) => {
          console.log({ values, index })
          handleChangeAB(values)
        }}
        invert
        renderThumb={(props, state) => {
          const { index } = state
          let disabledclass = ''
          if (index === 1 && showIndexC[0] === 1) {
            disabledclass = styles.disabled
          }
          if (index === 0 && showIndexC[1] === 1) {
            disabledclass = styles.disabled
          }
          return <div
            {...props}
            className={`${disabledclass} ${props.className}`}
          ></div>
        }}
      />}
    </div>
    <div className={styles.textVert}>
      <p>{`[A]`}</p>
      <p>{(getValueC()[0] ?? getValueC()[1])?.toFixed(2)}</p>
    </div>
  </div>
}
export default SliderVert