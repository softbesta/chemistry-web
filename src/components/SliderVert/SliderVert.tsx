import styles from './SliderVert.module.scss'
import { useEffect, useMemo, useState } from "react"
import MultiRangeSliderVert from "../MutiRangeSlider/MultiRangeSliderVert"

interface SliderVert {
  valuesC: number[]
  setValuesC: (val: number[]) => void
  canvaTimeSliderC: number[]
  textVert?: string
  distance?: number
}

const SliderVert = ({ valuesC, setValuesC, canvaTimeSliderC: showIndexC, distance = 13, textVert }: SliderVert) => {
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
    console.log('===handleChangeAB=== ', { vals, valuesC })
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
    setTextC(valuesC[infoC.activeIndex]/100)
  }, [showIndexC])

  // const textC = useMemo(() => {
  //   const res = getValueC()[0] ?? getValueC()[1]
  //   if (!Number.isFinite(res)) {
  //     return undefined
  //   }
  //   return res / 100
  // }, [getValueC])

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
  </div>
}
export default SliderVert