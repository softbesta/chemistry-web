import { useEffect, useRef, useState } from "react"
import styles from './CanvasTime.module.scss'
import { themeColors } from "../../constants"

// Moves t1 to t2
interface CanvasTimeProps {
  showTimeGraph: number
  c2: number
  c1: number
  t2: number
  t1: number
  maxC: number
  maxT: number
  pointerC?: number
  pointerT?: number
  height: number
  width: number
  colorA: string
  colorB: string
  colorA_blur: string
  onTimeframeChange?: (val: number) => void
}
const CanvasTime = ({
  showTimeGraph,
  c1,
  c2,
  t1,
  t2,
  maxC,
  maxT,
  pointerC, // c1 indicator (0 value: hidden)
  pointerT, // c2 indicator (0 value: hidden)
  height,
  width,
  colorA,
  colorB,
  colorA_blur,
  onTimeframeChange,
}: CanvasTimeProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [sX, setSX] = useState<number>(0);
  const [sY, setSY] = useState<number>(0);
  const [eX, setEX] = useState<number>(0);
  const [eY, setEY] = useState<number>(0);
  // const ptBlue = useRef({ x: 0, y: 0 })
  // const ptRed = useRef({ x: 0, y: 0 })
  const offsetPerFrame = useRef({ x: 1, y: 1 })

  // timeAt;  current animation second - start at 't1' second, end at 't2' second
  const [timeOffset, setTimeOffset] = useState<number>(t1)
  const maxT_offset = Math.abs(t1 - t2) // total animation second
  const maxC_offset = Math.abs(c1 - c2)
  const framesPerSecond = 20
  const tickLength = 20
  const intervalTime = 1000 / framesPerSecond

  const timerID = useRef<NodeJS.Timer>()
  const startTimer = () => {
    stopTimer()
    timerID.current = setInterval(() => {
      // console.log('interval', timeOffset)
      setTimeOffset(v => v += 1 / framesPerSecond)
    }, intervalTime)
    // console.log('started', timerID.current)
  }
  const stopTimer = () => {
    if (timerID.current) {
      clearInterval(timerID.current)
      timerID.current = undefined
    }
  }
  // animation play
  useEffect(() => {
    drawAt(timeOffset)
  }, [timeOffset])

  const getX = (t: number) => {
    return t / maxT * width
  }
  const getY = (c: number) => {
    return (1 - c / maxC) * height
  }

  const initAll = () => {
    if (!canvas.current) return
    const x1 = getX(t1)
    const x2 = getX(t2)
    const y1 = getY(c1)
    const y2 = getY(c2)
    offsetPerFrame.current.x = (x2 - x1) / (maxT_offset * framesPerSecond)
    offsetPerFrame.current.y = (y2 - y1) / (maxT_offset * framesPerSecond)

    setSX(x1)
    setEX(x2)
    setSY(y1)
    setEY(y2)
    // duration = Math.abs(vT1 - vT2) * framesPerSecond // draw every 0.1s offset
    // xStep = (Math.abs(vT1 - vT2) / maxT * width) / duration
    // yStep = (Math.abs(vC2 - vC1) * height) / duration

    console.log({ c1, c2, t1, t2 })
    console.log({ y1, y2, x1, x2 })
    console.log(offsetPerFrame.current)

    // offset.current = { x: xStep, y: yStep }

    drawFrame()
    // console.log('===drawGraph===', { duration, xStep, yStep })
  }

  function drawFrame() {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();

    // draw rulers
    ctx.beginPath()
    ctx.lineWidth = 1;
    const yy = height / 10
    for (let ty = height - yy; ty > 0; ty -= yy) {
      ctx.moveTo(0, ty)
      ctx.lineTo(10, ty)
    }
    const xx = height / 10
    for (let tx = height - xx; tx > 0; tx -= xx) {
      ctx.moveTo(tx, height)
      ctx.lineTo(tx, height - 10)
    }
    ctx.stroke()

    // draw pointers
    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = themeColors.C;
    if (pointerC) {
      const pC = Math.abs(1 - pointerC / maxC) * height
      ctx.moveTo(0, pC)
      ctx.lineTo(tickLength, pC)
    }
    if (pointerT) {
      const pT = (pointerT / maxT) * width
      ctx.moveTo(pT, height)
      ctx.lineTo(pT, height - tickLength)
    }
    // console.log('here - ', { pointerC, pointerT })
    ctx.stroke()
  }

  const drawAt = (timeAt: number) => {
    // console.log('drawAt - ', { timeAt })
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return
    // draw frame
    drawFrame()
    if (showTimeGraph < 1) return

    // show graph
    ctx.lineWidth = 1
    ctx.moveTo(sX, 0)
    ctx.lineTo(sX, height)
    ctx.moveTo(eX, 0)
    ctx.lineTo(eX, height)
    ctx.moveTo(0, sY)
    ctx.lineTo(width, sY)
    ctx.moveTo(0, eY)
    ctx.lineTo(width, eY)
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(sX, sY)
    ctx.lineTo(eX, eY)
    ctx.moveTo(sX, height)
    ctx.lineTo(eX, height - (eY - sY))
    ctx.strokeStyle = "gray"
    ctx.stroke()
    // draw Blue dot
    ctx.beginPath()
    ctx.moveTo(sX, sY)

    if (timeAt >= maxT_offset) {
      timeAt = maxT_offset
      stopTimer()
    }

    const ptBlue = { x: sX + offsetPerFrame.current.x * (timeAt * framesPerSecond), y: sY + offsetPerFrame.current.y * (timeAt * framesPerSecond) }
    const ptRed = { x: sX + offsetPerFrame.current.x * (timeAt * framesPerSecond), y: height - offsetPerFrame.current.y * (timeAt * framesPerSecond) }
    // console.log('drawAt - ', { timeAt })

    ctx.lineTo(ptBlue.x, ptBlue.y)
    ctx.strokeStyle = colorA
    ctx.stroke()
    ctx.moveTo(ptBlue.x, ptBlue.y)
    ctx.arc(ptBlue.x, ptBlue.y, 15, 0, Math.PI * 2)
    ctx.fillStyle = colorA_blur
    ctx.fill()
    ctx.beginPath()
    ctx.arc(ptBlue.x, ptBlue.y, 4, 0, Math.PI * 2)
    ctx.fillStyle = colorA
    ctx.fill()

    //draw Red dot
    ctx.beginPath()
    ctx.moveTo(sX, height)
    ctx.lineTo(ptRed.x, ptRed.y)
    ctx.strokeStyle = colorB
    ctx.stroke()
    ctx.moveTo(ptRed.x, ptRed.y)
    ctx.arc(ptRed.x, ptRed.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = colorB
    ctx.fill()

  }
  const endPlay = () => {
    stopTimer()
  }

  useEffect(() => {
    // console.log('canvasTime useEffect -', { sX, sY, eX, eY })
    initAll()
    drawAt(timeOffset)
  }, [showTimeGraph, c1, c2, t1, t2, sX, sY, eX, eY, pointerC, pointerT])

  useEffect(() => {
    if (showTimeGraph < 2) {
      // console.log('stopped', timerID.current)
      stopTimer()
      setTimeOffset(0)
    } else if (showTimeGraph === 2) {
      // console.log('useEffect -- started')
      setTimeOffset(0)
      startTimer() // call animation play
    }
    if (showTimeGraph > 2) {
      // console.log('aaa useEffect -- stopTimer', { showTimeGraph })
      stopTimer()

      setTimeOffset(maxT_offset)
      // drawAt(maxTime)
    }
    return () => stopTimer()
  }, [showTimeGraph])

  return (
    <>
      <canvas
        id='tur_canvasTime'
        className={styles.canvasTime}
        ref={canvas}
        height={height}
        width={width}
      />
    </>
  );
};

export default CanvasTime