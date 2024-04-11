import ReactSlider from "react-slider"
import styles from './chartTime.module.scss'
import ImgTime from '../assets/ReactionRates/reaction_boxes/time.png'
import Canvas from "./Canvas"
import { useRef, useState } from "react"
import useAppData from "../hooks/useAppData"

const ChartTime = () => {
  const { concentration, setConcentration, reactionTime, setReactionTime } = useAppData()
  const [lockA, setLockA] = useState(false)

  const handleChangeA = (values: number[]) => {
    // console.log({ value })
    !lockA && setConcentration(values[0])
  }
  const handleChangeTime = (value: number[]) => {
    // console.log({ time: value })
    !lockA && setReactionTime(value[0])
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
    ctx.moveTo(12, 200 * (100 - concentration) / 100 + 12);
    ctx.lineTo(212, 200 * (100 - concentration) / 100 + 12);
    ctx.moveTo(200 * reactionTime / 100 + 12, 12);
    ctx.lineTo(200 * reactionTime / 100 + 12, 212);
    ctx.stroke();
    ctx.closePath();
  }

  const handleTest = () => {
    setLockA(true)
  }

  return (
    <div className={styles.chartTimeContainer}>
      <button onClick={() => handleTest()}>TESTS</button>

      <div className={styles.sliceVerticalBar} />
      <div className={styles.sliceVertical}>
        <ReactSlider
          className={styles['vertical-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          orientation="vertical"
          value={[concentration, 50]}
          onChange={(values) => handleChangeA(values)}
          invert
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <div className={styles.textVert}>
        <p>{`[A]`}</p>
        <p>{(concentration / 100).toFixed(2)}</p>
      </div>

      <div className={styles.sliceHorizontalBar} />
      <div className={styles.sliceHorizontal}>
        <ReactSlider
          className={styles['horizontal-slider']}
          thumbClassName={styles['example-thumb']}
          trackClassName={styles['example-track']}
          value={[reactionTime, 50]}
          onChange={(values) => handleChangeTime(values)}
        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>
      <div className={styles.textHoriz}>
        <p>{`Time:`} {(reactionTime / 10).toFixed(2)}</p>
      </div>

      <div className={styles.chartTime}>
        <Canvas draw={drawChartTime} height={222} width={222} />
      </div>
    </div>
  )
}

export default ChartTime