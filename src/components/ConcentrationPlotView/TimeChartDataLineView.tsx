import React, { useMemo, useState } from 'react';
import { Equation } from './Equation';
import { LinearAxis } from './LinearAxis';

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
  } = props;
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

      if (showOnlyView) {
        ctx.rect(0, rectHeight * 0.28, rectWidth * 0.72, rectHeight * (1 - 0.28))
        ctx.strokeStyle = 'black'
        ctx.stroke()
      }

      if (data.showFilledLine) {
        dataLine(ctx, finalTime + offset, filledBarColor)
      }
      dataLine(ctx, currentTime, data.headColor)
      if (highlightLhs) {
        highlightLine(ctx, initialTime, (initialTime + finalTime) / 2)
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
    }
  }, [currentTime])

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
    line(
      ctx,
      initialTime,
      time,
      color,
      lineWidth
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
    if (discontinuity && discontinuity <= endX) {
      addLinesWithDiscontinuity(ctx, discontinuity)
    } else {
      // debugger
      addLinesUpToAndIncluding(ctx, equation, xEquation, startX + offset, endX, startX)
    }
  }

  const addLinesWithDiscontinuity = (
    ctx: CanvasRenderingContext2D,
    discontinuity: number,
  ) => {

  }

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