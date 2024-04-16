import { useEffect, useRef, useState } from "react"
import styles from './CanvasTime.module.scss'
import { Colors } from "../../constants"

interface CanvasTimeProps {
  showTimeGraph: number
  c2: number
  c1: number
  t2: number
  t1: number
  pointerC: number
  pointerT: number
  height: number
  width: number
  colorA: string
  colorB: string
  colorA_blur: string
  onEndPlay: () => void
}
const CanvasTime = ({
  showTimeGraph,
  c2,
  c1,
  t2,
  t1,
  pointerC,
  pointerT,
  height,
  width,
  colorA,
  colorB,
  colorA_blur,
  onEndPlay
}: CanvasTimeProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [sX, setSX] = useState<number>(0);
  const [sY, setSY] = useState<number>(0);
  const [eX, setEX] = useState<number>(0);
  const [eY, setEY] = useState<number>(0);
  // const ptBlue = useRef({ x: 0, y: 0 })
  // const ptRed = useRef({ x: 0, y: 0 })
  const offset = useRef({ x: 1, y: 1 })
  // const requestAnimationFrame = window.requestAnimationFrame
  // const cancelAnimationFrame = window.cancelAnimationFrame

  const [timeOffset, setTimeOffset] = useState<number>(0)
  const maxTime = Math.abs(t1 - t2)
  const framesPerSecond = 20
  const intervalTime = 1000 / framesPerSecond

  const timerID = useRef<NodeJS.Timer>()
  const startTimer = () => {
    stopTimer()
    timerID.current = setInterval(() => {
      console.log('interval', timeOffset)
      setTimeOffset(v => v += 1 / framesPerSecond)
    }, intervalTime)
    console.log('started', timerID.current)
    
  }
  const stopTimer = () => {
    if (timerID.current) {
      clearInterval(timerID.current)
      timerID.current = undefined
    }
  }
// animation play
  useEffect(() => {
    console.log('bbb ', { count: timeOffset })
    drawAt(timeOffset)
  }, [timeOffset])

  const initAll = () => {
    if (!canvas.current) return
    let startX: number, startY1: number, startY2: number, xStep: number, yStep: number, duration, endX: number

    startX = (t2 / 20) * width;
    setSX(startX);
    endX = (t1 / 20) * width;
    setEX(endX);
    startY1 = Math.abs(1 - c2) * height;
    setSY(startY1);
    const endY1 = Math.abs(1 - c1) * height;
    setEY(endY1);
    startY2 = 0;
    duration = Math.abs(t1 - t2) * framesPerSecond // draw every 0.1s offset
    xStep = (Math.abs(t1 - t2) / 20 * width) / duration
    yStep = (Math.abs(c2 - c1) * height) / duration

    offset.current = { x: xStep, y: yStep }

    drawFrame()
    console.log('===drawGraph===', { duration, xStep, yStep })
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
    ctx.strokeStyle = Colors.C;
    if (pointerC > 0) {
      const pC = Math.abs(1 - pointerC / 100) * height
      ctx.moveTo(0, pC)
      ctx.lineTo(20, pC)
    }
    if (pointerT > 0) {
      const pT = (pointerT / 20) * width
      ctx.moveTo(pT, height)
      ctx.lineTo(pT, height - 20)
    }
    // console.log('here - ', { pointerC, pointerT })
    ctx.stroke()
  }

  const drawAt = (timeAt: number) => {
    console.log('drawAt - ', { timeAt })
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return
    // draw frame
    drawFrame()
    if (showTimeGraph < 1) return

    // show graph
    ctx.lineWidth = 1;
    ctx.moveTo(sX, 0);
    ctx.lineTo(sX, height);
    ctx.moveTo(eX, 0);
    ctx.lineTo(eX, height);
    ctx.moveTo(0, sY);
    ctx.lineTo(width, sY);
    ctx.moveTo(0, eY);
    ctx.lineTo(width, eY);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.moveTo(sX, height);
    ctx.lineTo(eX, height - (eY - sY));
    ctx.strokeStyle = "gray";
    ctx.stroke();
    // draw Blue dot
    ctx.beginPath();
    ctx.moveTo(sX, sY);

    if (timeAt >= maxTime) {
      timeAt = maxTime
      stopTimer()
    }

    const ptBlue = { x: sX + offset.current.x * (timeAt * framesPerSecond), y: sY + offset.current.y * (timeAt * framesPerSecond) }
    const ptRed = { x: sX + offset.current.x * (timeAt * framesPerSecond), y: height - offset.current.y * (timeAt * framesPerSecond) }
    console.log('drawAt - ', { timeAt })

    ctx.lineTo(ptBlue.x, ptBlue.y)
    ctx.strokeStyle = colorA;
    ctx.stroke();
    ctx.moveTo(ptBlue.x, ptBlue.y)
    ctx.arc(ptBlue.x, ptBlue.y, 15, 0, Math.PI * 2)
    ctx.fillStyle = colorA_blur
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ptBlue.x, ptBlue.y, 4, 0, Math.PI * 2)
    ctx.fillStyle = colorA
    ctx.fill();

    //draw Red dot
    ctx.beginPath();
    ctx.moveTo(sX, height);
    ctx.lineTo(ptRed.x, ptRed.y)
    ctx.strokeStyle = colorB;
    ctx.stroke();
    ctx.moveTo(ptRed.x, ptRed.y)
    ctx.arc(ptRed.x, ptRed.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = colorB
    ctx.fill();

  }
  const endPlay = () => {
    stopTimer()
  }

  useEffect(() => {
    console.log('canvasTime useEffect -', { sX, sY, eX, eY })
    initAll()
    drawAt(timeOffset)
  }, [showTimeGraph, c1, c2, t1, t2, sX, sY, eX, eY, pointerC, pointerT])

  useEffect(() => {
    if (showTimeGraph < 2) {
      console.log('stopped', timerID.current)
      stopTimer()
      setTimeOffset(0)
    } else if (showTimeGraph === 2) {
      console.log('useEffect -- started')
      setTimeOffset(0)
      startTimer() // call animation play
    }
    if (showTimeGraph > 2) {
      console.log('aaa useEffect -- stopTimer', { showTimeGraph })
      stopTimer()

      setTimeOffset(maxTime)
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