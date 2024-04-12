
import { useEffect, useState } from 'react'
import { generateEnergyArray } from '../helper/functions'
import Canvas from './Canvas'
import styles from './EnergyProfile.module.scss'
import useAppData from '../hooks/useAppData'
import { Colors, colorsArr } from '../constants'

function beaker(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, fillStyle: string, strokeStyle: string, lineWidth: number, offset: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width - offset, y + height, x + width - offset, y + height - radius, radius);
  ctx.lineTo(x + width - offset, y + radius);
  ctx.lineTo(x + width, y + radius);
  ctx.bezierCurveTo(width + 25, 30, width + 25, x, x + width, y);
  ctx.lineTo(x, y);
  ctx.bezierCurveTo(0, x, 0, 30, x, y + radius);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x, height);
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

const EnergyProfile = () => {
  const totalDots = 144
  const [energyDots, setEnergyDots] = useState(Array.from({ length: totalDots }, () => Math.floor(Math.random() * 2)))
  const { concentrationAB } = useAppData()
  // console.log({ concentration, energyDots })
  // useEffect(() => {
  //   const update = generateEnergyArray(energyDots, concentrationAB[0], 1, 2)
  //   setEnergyDots(update)
  //   // console.log({ update })
  // }, [concentrationAB])

  useEffect(() => {
    console.log('AAA: ', { concentrationAB })
    let update = generateEnergyArray(energyDots, concentrationAB[0], 1, 0)
    // update = generateEnergyArray(update, (concentrationAB[1] / concentrationAB[0] * 100), 2, 1)
    setEnergyDots(update)
  }, [concentrationAB[0]])
  useEffect(() => {
    console.log('BBB: ', { concentrationAB })
    // const update = generateEnergyArray(energyDots, (concentrationAB[1] / concentrationAB[0] * 100), 2, 1)
    // setEnergyDots(update)
  }, [concentrationAB[1]])

  const drawBeaker = (ctx: CanvasRenderingContext2D) => {
    const width = 206, height = 248
    // parent beaker
    beaker(ctx, 12, 12, width, height, 15, "lightgray", "black", 3, 0)
    ctx.clip()
    beaker(ctx, 12, 12, width - 10, height - 10, 15, "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", 0.1, 15)
    beaker(ctx, 12, 12, width - 20, height - 20, 15, "white", "white", 0.1, 20)
    ctx.beginPath()
    ctx.rect(12, 142, 210, 122)
    ctx.fillStyle = Colors.bg
    ctx.fill()
    ctx.beginPath()
    const delta = 15
    const startPoint = 40
    for (let y = startPoint; y < 140; y += delta) {
      y === startPoint + delta * 3 ? ctx.moveTo(160, y) : ctx.moveTo(175, y)
      ctx.lineTo(193, y)
    }
    ctx.strokeStyle = "black"
    ctx.lineWidth = 0.5
    ctx.stroke()
    let count = 0
    const startX = 17, startY = 150, t = 13
    for (let i = 0; i < 9; i++) {
      const yy = startY + i * t
      for (let j = 0; j < 16; j++) {
        ctx.beginPath()
        const xx = startX + j * t
        ctx.moveTo(xx, yy)
        ctx.arc(xx, yy, 6, 0, 2 * Math.PI);
        ctx.fillStyle = colorsArr[energyDots[count]]
        ctx.fill()
        count++
      }
    }
  };

  return (
    <div className={styles.energyContainer}>
      <Canvas draw={drawBeaker} height={270} width={250} />
    </div>
  )
}
export default EnergyProfile