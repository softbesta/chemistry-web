import React, { useMemo, useState } from 'react';
import { Equation } from './Equation';
import { LinearAxis } from './LinearAxis';
import useAppData from '../../hooks/useAppData';

type TimeChartDataLine = {
  equation: Equation
  xEquation?: Equation
  headColor: string
  haloColor?: string
  headRadius: number
  discontinuity?: number
  showFilledLine?: boolean
}

type TimeChartLayoutSettings = {
  xAxis: LinearAxis
  yAxis: LinearAxis
  haloRadius?: number
  lineWidth?: number
}

type TimeChartDataLineViewProps = {
  height?: string | number | undefined
  width?: string | number | undefined
  data: TimeChartDataLine
  settings: TimeChartLayoutSettings
  lineWidth: number
  initialTime: number
  currentTime: number
  finalTime: number
  filledBarColor: string
  canSetCurrentTime: boolean
  highlightLhs: boolean
  highlightRhs: boolean
  clipData?: boolean
  offset?: number
  minDragTime?: number
  showOnlyView?: boolean
  showFullLine?: boolean
  order: number
}

type Rect = {
  width: number,
  height: number
}

const TimeChartDataLineView = (props: TimeChartDataLineViewProps) => {
  const {
    height,
    width,
    data,
    settings,
    lineWidth,
    initialTime,
    currentTime,
    finalTime,
    filledBarColor,
    canSetCurrentTime,
    highlightLhs,
    highlightRhs,
    clipData = false,
    offset = 0,
    minDragTime = null,
    showOnlyView = false,
    showFullLine = false,
    order
  } = props;
  const { hoverOrder, isOver, dragOrder } = useAppData()
  const canvas = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.canvas.style.position = 'absolute';
      ctx.canvas.style.right = '0px';
      ctx.canvas.style.backgroundColor = 'transparent';
      const { height: rectHeight, width: rectWidth } = ctx.canvas;
      const rect: Rect = {
        width: rectWidth,
        height: rectHeight
      }
      ctx.clearRect(0, 0, rectWidth, rectHeight)

      ctx.beginPath()
      if (data.showFilledLine) {
        // dataLine(ctx, finalTime + offset, filledBarColor)
        addLinesUpToAndIncluding(ctx,
          data.equation,
          data.xEquation!,
          initialTime,                              // from
          finalTime + offset,                       // to
          initialTime                               // startX
        )
      }
      // dataLine(ctx, showFullLine ? finalTime : currentTime, data.headColor)
      addLinesUpToAndIncluding(
        ctx,
        data.equation,
        data.xEquation!,
        initialTime,                              // from
        showFullLine ? finalTime : currentTime,   // to
        initialTime                               // startX
      )


      if (highlightLhs) {
        // highlightLine(ctx, initialTime, (initialTime + finalTime) / 2)
      }
      if (highlightRhs) {
        highlightLine(ctx, (initialTime + finalTime) / 2, finalTime)
      }

      if (data.haloColor) {
        head(
          ctx,
          settings.haloRadius ?? 10,
          data.haloColor!
        )
        // .contentShape(Rectangle())
        // .gesture(canSetCurrentTime ? dragGesture : nil)
      }
      head(
        ctx,
        data.headRadius,
        data.headColor
      )
      if (showOnlyView) {
        ctx.beginPath()
        ctx.strokeStyle = 'transparent'
        ctx.rect(0, rectHeight * 0.28, rectWidth * 0.72, rectHeight * (1 - 0.28))
        let color = 'black'
        // console.log({hoverOrder})
        ctx.lineWidth = 1
        if (isOver && hoverOrder === (order + 1)) {
          switch(dragOrder) {          
            case 0: color = 'black'; break;
            case 1: color = 'rgb(84, 187, 239)'; break;
            case 2: color = 'rgb(222, 55, 42)'; break;
            case 3: color = 'rgb(248, 208, 72)'; break;
            default: color = 'black'
          }
          ctx.lineWidth = 2
        }
        ctx.strokeStyle = color
        ctx.stroke()
      }
    }
  }, [data, initialTime, currentTime, finalTime, hoverOrder, dragOrder, isOver, order])

  const head = (
    ctx: CanvasRenderingContext2D,
    radius: number,
    color: string,
  ) => {
    chartIndicatorHead(
      ctx,
      radius,
      data.equation,
      data.xEquation!,
      settings.yAxis,
      settings.xAxis,
      currentTime,
      offset,
      color,
    )
  }

  const chartIndicatorHead = (
    ctx: CanvasRenderingContext2D,
    radius: number,
    equation: Equation,
    xEquation: Equation,
    yAxis: LinearAxis,
    xAxis: LinearAxis,
    x: number,
    offset: number,
    color: string,
  ) => {
    const y = equation.getValue(x)

    // debugger
    const xValue = xEquation?.getValue(x) ?? x
    const xPosition = xAxis.shift(offset).getPosition(xValue)
    const yPosition = yAxis.getPosition(y)

    ctx.beginPath()
    console.log({xPosition,  yPosition})
    ctx.arc(xPosition, yPosition, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.fill()
    ctx.stroke()
  }

  const highlightLine = (
    ctx: CanvasRenderingContext2D,
    startTime: number,
    endTime: number,
  ) => {
    line(
      ctx,
      startTime,
      endTime,
      data.headColor,
      2.5 * lineWidth
    )
  }

  const dataLine = (
    ctx: CanvasRenderingContext2D,
    time: number,
    color: string
  ) => {
    /* origin code */
    // line(
    //   ctx,
    //   initialTime,
    //   time,
    //   color,
    //   lineWidth
    // )
    chartLine(
      ctx,
      data.equation,
      data.xEquation!,
      settings.yAxis,
      settings.xAxis,
      initialTime,
      time,
      0,
      data.discontinuity!,
      color,
      lineWidth,
    )
  }

  const line = (
    ctx: CanvasRenderingContext2D,
    startTime: number,
    time: number,
    color: string,
    lineWidth: number
  ) => {
    chartLine(
      ctx,
      data.equation,
      data.xEquation!,
      settings.yAxis,
      settings.xAxis,
      startTime,
      time,
      0,
      data.discontinuity!,
      color,
      lineWidth,
    )
  }

  const chartLine = (
    ctx: CanvasRenderingContext2D,
    equation: Equation,
    xEquation: Equation,
    yAxis: LinearAxis,
    xAxis: LinearAxis,
    startX: number,
    endX: number,
    offset: number,
    discontinuity: number,
    color: string,
    lineWidth: number,
  ) => {
    // if (discontinuity && discontinuity <= endX) {
    //   addLinesWithDiscontinuity(ctx, discontinuity)
    // } else {
    // debugger
    addLinesUpToAndIncluding(ctx, equation, xEquation, startX + offset, endX, startX)
    // }
  }

  // const addLinesWithDiscontinuity = (
  //   ctx: CanvasRenderingContext2D,
  //   discontinuity: number,
  // ) => {

  // }

  const addLinesUpToAndIncluding = (
    ctx: CanvasRenderingContext2D,
    equation: Equation,
    xEquation: Equation,
    from: number,
    to: number,
    startX: number,
  ) => {
    for (let x = from; x < to; x += dx(startX, to, ctx.canvas.width)) {
      addLine(ctx, x, equation, xEquation, x === from)
    }
    // addLine(ctx, to, equation, xEquation, false)
  }

  const addLine = (
    ctx: CanvasRenderingContext2D,
    x: number,
    equation: Equation,
    xEquation: Equation,
    isMoveTo: boolean,
  ) => {
    const y = equation.getValue(x)
    const xValue = xEquation?.getValue(x) ?? x
    const xPosition = settings.xAxis.shift(offset).getPosition(xValue)
    const yPosition = settings.yAxis.shift(offset).getPosition(y)
    // debugger
    if (isMoveTo) {
      ctx.beginPath()
      ctx.moveTo(xPosition, yPosition)
    } else {
      ctx.strokeStyle = data.headColor
      ctx.lineTo(xPosition, yPosition)
      ctx.stroke()
    }
  }

  const maxWidthSteps = 100

  const dx = (
    startX: number,
    endX: number,
    width: number,
  ) => {
    const dxPos = width / maxWidthSteps
    const dx1 = settings.xAxis.shift(offset).getValue(dxPos) - settings.xAxis.shift(offset).getValue(0)
    return startX < endX ? dx1 : -dx1
  }

  return (
    <canvas ref={canvas} height={height} width={width} />
  );
};
export default TimeChartDataLineView;