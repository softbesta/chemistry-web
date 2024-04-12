import ReactSlider from "react-slider"
import styles from './ChartTime.module.scss'
import ImgTime from '../assets/ReactionRates/reaction_boxes/time.png'
import Canvas from "./Canvas"
import { useRef, useState } from "react"
import useAppData from "../hooks/useAppData"
import CanvasTime from "./CanvasTime"
import { Colors } from "../constants"

const ChartTime = () => {
  const {
    curStep,
    concentrationAB,
    setConcentrationAB,
    reactionTime,
    setReactionTime,
    playAnimation,
    setPlayAnimation,
    showCanvasGraph,
    setShowCanvasGraph,
    showIndexAB,
  } = useAppData()

  const [lockIndex, setLockIndex] = useState(false)

  const handleChangeAB = (values: number[]) => {
    console.log({ values })
    !lockIndex && setConcentrationAB([values[1], values[0]])
  }
  const handleChangeTime = (values: number[]) => {
    console.log({ time: values })
    console.log({ reactionTime })
    !lockIndex && setReactionTime([parseInt(values[0].toFixed(0)) / 10, parseInt(values[1].toFixed(0)) / 10])
  }

  const drawChartTime = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.rect(12, 12, 200, 200);
    ctx.fillStyle = "white";
    ctx.fill();
    let y = 62;
    for (let x = 0; x < 10; x++) {
      ctx.moveTo(12, y);
      ctx.lineTo(20, y);
      y += 15;
    }
    let x = 26;
    for (let y = 0; y < 10; y++) {
      ctx.moveTo(x, 212);
      ctx.lineTo(x, 204);
      x += 15;
    }
    ctx.moveTo(12, 200 * (100 - (concentrationAB[0] ?? 0)) / 100 + 12);
    ctx.lineTo(212, 200 * (100 - (concentrationAB[0] ?? 0)) / 100 + 12);
    ctx.moveTo(200 * (reactionTime[0] ?? 0) / 20 + 12, 12);
    ctx.lineTo(200 * (reactionTime[0] ?? 0) / 20 + 12, 212);
    ctx.stroke();
    ctx.closePath();
  }

  const handleTest = () => {
    setLockIndex(true)
  }

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
          value={[concentrationAB[1] ?? 0, concentrationAB[0] ?? 0]}
          onChange={(values) => handleChangeAB(values)}
          invert
          renderThumb={(props, state) => <div {...props}></div>}
        />
      </div>
      <div className={styles.textVert}>
        <p>{`[A]`}</p>
        <p>{((concentrationAB[0] ?? 0) / 100).toFixed(2)}</p>
      </div>

      <div className={styles.sliceHorizontalBar} />
      <div className={styles.sliceHorizontal}>
        <ReactSlider
          className={styles['horizontal-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          value={[(reactionTime[0] ?? 0) * 10, (reactionTime[1] ?? 0) * 10]}
          min={0}
          max={200}
          step={1}
          onChange={(values) => handleChangeTime(values)}
        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <div className={styles.textHoriz}>
        <p>{`Time:`} {(reactionTime[0] ?? 0).toFixed(1)}</p>
      </div>

      <div
        // id='tur_chartTime'
        className={styles.chartTime}
      >
        {/* <Canvas draw={drawChartTime} height={222} width={222} /> */}
        <CanvasTime
          play={playAnimation}
          show={showCanvasGraph}
          onEndPlay={() => setPlayAnimation(false)}
          // c1={0.5}
          // c2={0.8}
          // t1={16}
          // t2={3.2}
          c1={concentrationAB[1] / 100}
          c2={concentrationAB[0] / 100}
          t1={reactionTime[1]}
          t2={reactionTime[0]}
          pointerC={concentrationAB[0]}
          pointerT={reactionTime[0]}
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
