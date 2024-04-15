import ReactSlider from "react-slider"
import styles from './ChartTime.module.scss'
import { useState } from "react"
import useAppData from "../hooks/useAppData"
import CanvasTime from "./CanvasTime"
import { Colors } from "../constants"

interface ChartTimeProps {
  valuesC: number[]
  valuesT: number[]
  showIndexC: number[]
  showIndexT: number[]
  // playAnimation: boolean
  showTimeGraph: number   //  0; show Frame,  1; show Graph, 2; show Animation
}

const ChartTime = () => {
  const {
    concentrationAB: valuesC,
    setConcentrationAB: setValuesC,
    reactionTime: valuesT,
    setReactionTime: setValuesT,
    playAnimation,
    setPlayAnimation,
    // showTimeGraph,
    // setShowTimeGraph,
    // showIndexC,
    // showIndexT,
  } = useAppData()
  const showIndexC = [2, 0]
  const showIndexT = [2, 0]
  const [showTimeGraph, setShowTimeGraph] = useState(0)

  const getValueC = () => {
    const values: number[] = []
    showIndexC.forEach((item, index) => {
      if (item === 2) {
        values.push(valuesC[index])
        return
      }
    })
    return values.reverse()
  }
  const getValueT = () => {
    const values: number[] = []
    showIndexT.forEach((item, index) => {
      if (item === 2) {
        values.push(valuesC[index])
        return
      }
    })
    return values
  }

  // const [lockIndex, setLockIndex] = useState(false)

  const handleChangeAB = (values: number[]) => {
    console.log('handleChangeAB ', { values })
    setValuesC([values[1], values[0]])
  }
  const handleChangeTime = (values: number[]) => {
    console.log('handleChangeTime ', { time: values })
    console.log({ reactionTime: valuesT })
    setValuesT([parseInt(values[0].toFixed(0)) / 10, parseInt(values[1].toFixed(0)) / 10])
  }

  // const drawChartTime = (ctx: CanvasRenderingContext2D) => {
  //   ctx.beginPath();
  //   ctx.rect(12, 12, 200, 200);
  //   ctx.fillStyle = "white";
  //   ctx.fill();
  //   let y = 62;
  //   for (let x = 0; x < 10; x++) {
  //     ctx.moveTo(12, y);
  //     ctx.lineTo(20, y);
  //     y += 15;
  //   }
  //   let x = 26;
  //   for (let y = 0; y < 10; y++) {
  //     ctx.moveTo(x, 212);
  //     ctx.lineTo(x, 204);
  //     x += 15;
  //   }
  //   ctx.moveTo(12, 200 * (100 - (concentrationAB[0] ?? 0)) / 100 + 12);
  //   ctx.lineTo(212, 200 * (100 - (concentrationAB[0] ?? 0)) / 100 + 12);
  //   ctx.moveTo(200 * (reactionTime[0] ?? 0) / 20 + 12, 12);
  //   ctx.lineTo(200 * (reactionTime[0] ?? 0) / 20 + 12, 212);
  //   ctx.stroke();
  //   ctx.closePath();
  // }

  return (
    <div className={styles.chartTimeContainer}>
      {/* <button onClick={() => handleTest()}>TESTS</button> */}

      <div className={styles.sliceVerticalBar} />
      <div className={styles.sliceVertical}>
        <ReactSlider
          className={styles['vertical-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          orientation="vertical"
          value={[valuesC[1] ?? 0, valuesC[0] ?? 0]}
          onChange={(values) => handleChangeAB(values)}
          invert
          renderThumb={(props, state) => <div {...props}></div>}
        />
      </div>
      <div className={styles.textVert}>
        <p>{`[A]`}</p>
        <p>{((valuesC[0] ?? 0) / 100).toFixed(2)}</p>
      </div>

      <div className={styles.sliceHorizontalBar} />
      <div className={styles.sliceHorizontal}>
        <ReactSlider
          className={styles['horizontal-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          value={[(valuesT[0] ?? 0) * 10, (valuesT[1] ?? 0) * 10]}
          min={0}
          max={200}
          step={1}
          onChange={(values) => handleChangeTime(values)}
        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <div className={styles.textHoriz}>
        <p>{`Time:`} {(valuesT[0] ?? 0).toFixed(1)}</p>
      </div>

      <div
        // id='tur_chartTime'
        className={styles.chartTime}
      >
        {/* <Canvas draw={drawChartTime} height={222} width={222} /> */}
        <CanvasTime
          play={playAnimation}
          show={showTimeGraph > 1}
          onEndPlay={() => setPlayAnimation(false)}
          // c1={0.5}
          // c2={0.8}
          // t1={16}
          // t2={3.2}
          c1={valuesC[1] / 100}
          c2={valuesC[0] / 100}
          t1={valuesT[1]}
          t2={valuesT[0]}
          pointerC={valuesC[0]}
          pointerT={valuesT[0]}
          height={212}
          width={212}
          colorA={Colors.A}
          colorB={Colors.B}
          colorA_blur={Colors.none}
        />
      </div>
    </div>
  )
}

export default ChartTime
