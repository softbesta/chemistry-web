import { useEffect, useRef, useState } from "react"


interface BarChartCanvasProps {
  play: boolean
  c2: number
  c1: number
  t2: number
  t1: number
  height: number
  width: number
}

const BarChartCanvas = ({ play, c2, c1, t2, t1, height, width }: BarChartCanvasProps) => {
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
    let startX, startY1: number, startY2: number, yStep: number, duration, endX, otherReq: number;

    startX = (t2 / 20);
    setSX(startX);
    endX = (t1 / 20);
    setEX(endX);
    startY1 = c2;
    setSY(startY1);
    const endY = Math.abs(1 - c1);
    setEY(endY);
    startY2 = 0;
    duration = Math.abs(t1 - t2) * 1000 / 60;
    yStep = (Math.abs(c2 - c1)) / duration;

    function step() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, 0);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.stroke();

      for (let y = 22; y < 210; y += 19) {
        ctx.beginPath();
        ctx.moveTo(width, y);
        ctx.lineTo(0, y);
        ctx.lineWidth = 0.3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(10, y);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.rect(40, 194 - 194 * c2, 30, 194 * c2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();
      ctx.beginPath();
      ctx.rect(40, 194 - 194 * startY1, 30, 194 * startY1);
      ctx.fillStyle = "blue";
      ctx.fill();
      startY1 -= yStep;

      ctx.beginPath();
      ctx.rect(140, 194 - 194 * startY2, 30, 194 * startY2);
      ctx.fillStyle = "red";
      ctx.fill();
      startY2 += yStep;
      if (c1 < startY1) {
        otherReq && requestAnimationFrame(step);
      } else cancelAnimationFrame(otherReq);
    }

    otherReq = requestAnimationFrame(step);

  }, [play, sX, sY, eX, eY])
  return (
    <canvas ref={canvas} height={height} width={width} />
  );
};

export default BarChartCanvas