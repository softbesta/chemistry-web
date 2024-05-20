import styles from './SliderVert.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import MultiRangeSliderVert from "../MutiRangeSlider/MultiRangeSliderVert"

interface SliderVert {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  canvaTimeSliderC: number[]
  textVert?: string
  distance?: number
}

const SliderVert = ({ valuesC, setValuesC, canvaTimeSliderC: showIndexC, distance = 13, textVert }: SliderVert) => {

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

    // let update: number[] = []
    // if (showIndexC[0] > 0 && showIndexC[1] > 0) {
    //   // console.log('===getValueC===', valuesC)
    //   update = [valuesC[1], valuesC[0]]
    // } else if (showIndexC[0] > 0) {
    //   // console.log('===getValueC===  000', valuesC[0])
    //   update = [valuesC[0]]
    // } else if (showIndexC[1] > 0) {
    //   // console.log('===getValueC===  111', valuesC[1])
    //   update = [valuesC[1]]
    // } else update = []
    // return update
  }

  const handleChangeAB = (vals: number[]) => {
    // console.log('===handleChangeAB=== ', { vals, valuesC })
    // let update: number[] = valuesC
    // if (Array.isArray(val)) {
    //   if (showIndexC[0] === 2) {
    //     update = [val[1], update[1]]
    //   }
    //   if (showIndexC[1] === 2) {
    //     update = [update[0], val[0]]
    //   }
    // } else {
    //   if (showIndexC[0] === 2) {
    //     update = [val, update[1]]
    //   }
    //   if (showIndexC[1] === 2) {
    //     update = [update[0], val]
    //   }
    // }
    // // console.log({ update })
    // if (update[0] < 27) update[0] = 27
    // if (update[1] < 10) update[1] = 10
    // if (update[1] > update[0] - 13) update[1] = update[0] - 13


    const update = [...vals]
    setTextC(update[infoC.activeIndex] / 100)
    setValuesC(update)
  }

  const [textC, setTextC] = useState<number>()
  useEffect(() => {
    setTextC(valuesC[infoC.activeIndex] / 100)
  }, [showIndexC])

  // const textC = useMemo(() => {
  //   const res = getValueC()[0] ?? getValueC()[1]
  //   if (!Number.isFinite(res)) {
  //     return undefined
  //   }
  //   return res / 100
  // }, [getValueC])

  const [decreaseCounter, setDecreaseCounter] = useState(0)
  const [increaseCounter, setIncreaseCounter] = useState(0)
  const refValue = useRef<number>(0)
  const refIncrement = useRef<NodeJS.Timer>()

  const handleUpDownBtn = (step: number) => {
    // console.log('value changning - ', { step, decreaseCounter })
    // setValue(v => v + step)
    if (step < 0) {
      setDecreaseCounter(v => v + 1)
    } else if (step > 0) {
      setIncreaseCounter(v => v + 1)
    }

    // const update = [...valuesC]
    // update[infoC.activeIndex] += step
    // handleChangeAB(update)
  }
  const startIncrement = (step: number) => {
    handleUpDownBtn(step)
    refIncrement.current = setInterval(() => {
      handleUpDownBtn(step)
    }, 100)
  }
  const stopIncrement = () => {
    clearInterval(refIncrement.current)
    refIncrement.current = undefined
  }
  useEffect(() => {
    if (decreaseCounter <= 0) return
    // console.log('value changning - ', { refValue: refValue.current })
    const update = [...valuesC]
    update[infoC.activeIndex]--
    handleChangeAB(update)
  }, [decreaseCounter])
  useEffect(() => {
    if (increaseCounter <= 0) return
    // console.log('value changning - ', { refValue: refValue.current })
    const update = [...valuesC]
    update[infoC.activeIndex]++
    handleChangeAB(update)
  }, [increaseCounter])

  return <div className={styles.container}>
    <div className={styles.sliceVertical}>
      {
        infoC.showCount > 0 &&
        <div style={{ position: 'relative' }}>
          <div className={styles.sliderback}></div>
          <MultiRangeSliderVert
            max={100}
            width={167}
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
        onMouseDown={() => startIncrement(1)}
        onMouseUp={() => stopIncrement()}
        onMouseLeave={() => stopIncrement()}
        onTouchStart={() => startIncrement(1)}
        onTouchEnd={() => stopIncrement()}
      >▲</button>
      <button
        className={styles.btnDown}
        onMouseDown={() => startIncrement(-1)}
        onMouseUp={() => stopIncrement()}
        onMouseLeave={() => stopIncrement()}
        onTouchStart={() => startIncrement(-1)}
        onTouchEnd={() => stopIncrement()}
      >▼</button>
    </div>
  </div>
}
export default SliderVert