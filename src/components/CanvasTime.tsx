import { useEffect, useRef, useState } from "react"
import styles from './ChartTime.module.scss'

interface CanvasTimeProps {
  play: boolean
  c2: number
  c1: number
  t2: number
  t1: number
  height: number
  width: number
}
const CanvasTime = ({ play, c2, c1, t2, t1, height, width }: CanvasTimeProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [sX, setSX] = useState<number>(0);
  const [sY, setSY] = useState<number>(0);
  const [eX, setEX] = useState<number>(0);
  const [eY, setEY] = useState<number>(0);
  const requestAnimationFrame = window.requestAnimationFrame

  const cancelAnimationFrame = window.cancelAnimationFrame

  useEffect(() => {
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

    function step() {
      if (!ctx) return
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.stroke();
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
      ctx.strokeStyle = "rgba(0,0,255)";
      ctx.stroke();
      ctx.moveTo(startX + xStep, startY1 + yStep)
      ctx.arc(startX + xStep, startY1 + yStep, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,255,0.2)"
      ctx.fill();
      ctx.beginPath();
      ctx.arc(startX + xStep, startY1 + yStep, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,255)"
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(sX, height);
      ctx.lineTo(startX + xStep, height - startY2 + yStep);
      ctx.moveTo(startX + xStep, height - startY2 + yStep);
      ctx.arc(startX + xStep, height - startY2 + yStep, 2, 0, Math.PI * 2);
      ctx.strokeStyle = "red";
      ctx.stroke();
      startX += xStep;
      startY1 += yStep;
      startY2 += yStep;
      if (endX > startX) {
        otherReq && requestAnimationFrame(step);
      } else cancelAnimationFrame(otherReq);
    }

    otherReq = requestAnimationFrame(step);

  }, [play, sX, sY, eX, eY])
  return (
    <canvas
      id='tur_canvasTime'
      className={styles.canvasTime}
      ref={canvas}
      height={height}
      width={width}
    />
  );
};

export default CanvasTime