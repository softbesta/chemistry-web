import ReactSlider from "react-slider"
import styles from './SliderVert.module.scss'
import { useMemo } from "react"

interface SliderVert {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  canvaTimeSliderC: number[]
  textVert?: string
}

const SliderVert = ({ valuesC, setValuesC, canvaTimeSliderC: showIndexC, textVert }: SliderVert) => {
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
  // console.log({ disabledClass })

  const getValueC = () => {
    let update: number[] = []
    if (showIndexC[0] > 0 && showIndexC[1] > 0) {
      // console.log('===getValueC===', valuesC)
      update = [valuesC[1], valuesC[0]]
    } else if (showIndexC[0] > 0) {
      // console.log('===getValueC===  000', valuesC[0])
      update = [valuesC[0]]
    } else if (showIndexC[1] > 0) {
      // console.log('===getValueC===  111', valuesC[1])
      update = [valuesC[1]]
    } else update = []
    return update
  }
  const handleChangeAB = (val: number[] | number) => {
    // console.log('===handleChangeAB=== ', { values: val, valuesC })
    let update: number[] = valuesC
    if (Array.isArray(val)) {
      if (showIndexC[0] === 2) {
        update = [val[1], update[1]]
      }
      if (showIndexC[1] === 2) {
        update = [update[0], val[0]]
      }
    } else {
      if (showIndexC[0] === 2) {
        update = [val, update[1]]
      }
      if (showIndexC[1] === 2) {
        update = [update[0], val]
      }
    }
    // console.log({ update })
    if (update[0] < 27) update[0] = 27
    if (update[1] > update[0] - 13) update[1] = update[0] - 13
    setValuesC(update)
  }
  const textC = useMemo(() => {
    const res = getValueC()[0] ?? getValueC()[1]
    if (!Number.isFinite(res)) {
      return undefined
    }
    return res / 100
  }, [getValueC])
  return <div className={styles.container}>
    {/* <div>
      <button onClick={() => {
        console.log(getValueC())
        console.log({ valuesC, showIndexC, infoC })
      }}>111</button>
    </div> */}
    <div className={styles.sliceVerticalBar} />
    <div className={styles.sliceVertical}>
      {infoC.showCount > 0 && <ReactSlider
        className={`${styles['vertical-slider']} ${disabledClass}`}
        thumbClassName={styles['example-thumb']}
        trackClassName={styles['example-track']}
        orientation="vertical"
        invert
        value={getValueC()}
        min={0}
        max={100}
        minDistance={13}
        onChange={(val, index) => {
          // console.log({ val, index })
          handleChangeAB(val)
        }}
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
      <p>{`${textVert || '[A]'}`}</p>
      <p className='txt-red'>{textC?.toFixed(2)} M</p>
    </div>
  </div>
}
export default SliderVert