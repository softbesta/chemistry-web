import { useEffect, useRef, useState } from "react"
import styles from './ChartTime.module.scss'
import useAppData from "../hooks/useAppData"
import { Colors } from "../constants"

interface CanvasTimeProps {
  play: boolean
  show: boolean
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
const CanvasTime = ({ play, show, c2, c1, t2, t1, pointerC, pointerT, height, width, colorA, colorB, colorA_blur, onEndPlay }: CanvasTimeProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [sX, setSX] = useState<number>(0);
  const [sY, setSY] = useState<number>(0);
  const [eX, setEX] = useState<number>(0);
  const [eY, setEY] = useState<number>(0);
  const requestAnimationFrame = window.requestAnimationFrame
  const cancelAnimationFrame = window.cancelAnimationFrame

  const animate = () => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d');
    let startX: number, startY1: number, startY2: number, xStep: number, yStep: number, duration, endX: number, otherReq: number;

    startX = (t2 / 20) * width;
    setSX(startX);
    endX = (t1 / 20) * width;
    setEX(endX);
    startY1 = Math.abs(1 - c2) * height;
    setSY(startY1);
    const endY1 = Math.abs(1 - c1) * height;
    setEY(endY1);
    startY2 = 0;
    duration = Math.abs(t1 - t2) * 1000 / 60;
    xStep = (Math.abs(t1 - t2) / 20 * width) / duration;
    yStep = (Math.abs(c2 - c1) * height) / duration;

    function drawFrame() {
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
      console.log('here - ', { pointerC, pointerT })
      ctx.stroke()
    }

    function step() {
      if (!ctx) return
      drawFrame()
      if (!show) return

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
      ctx.beginPath();
      ctx.moveTo(sX, sY);
      ctx.lineTo(startX + xStep, startY1 + yStep);
      ctx.strokeStyle = colorA;
      ctx.stroke();
      ctx.moveTo(startX + xStep, startY1 + yStep)
      ctx.arc(startX + xStep, startY1 + yStep, 15, 0, Math.PI * 2);
      ctx.fillStyle = colorA_blur
      ctx.fill();
      ctx.beginPath();
      ctx.arc(startX + xStep, startY1 + yStep, 4, 0, Math.PI * 2);
      ctx.fillStyle = colorA
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(sX, height);
      ctx.lineTo(startX + xStep, height - startY2 + yStep);
      ctx.moveTo(startX + xStep, height - startY2 + yStep);
      ctx.arc(startX + xStep, height - startY2 + yStep, 2, 0, Math.PI * 2);
      ctx.strokeStyle = colorB;
      ctx.stroke();
      startX += xStep;
      startY1 += yStep;
      startY2 += yStep;
      if (endX > startX && play) {
        otherReq && requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(otherReq);
        onEndPlay()
      }
    }

    otherReq = requestAnimationFrame(step);
  }

  useEffect(() => {
    console.log('canvasTime useEffect -', { play }, sX, sY, eX, eY)
    animate()
  }, [play, c1, c2, t1, t2, sX, sY, eX, eY, show])
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