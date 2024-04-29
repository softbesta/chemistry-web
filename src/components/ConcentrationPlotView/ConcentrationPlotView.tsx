import React from 'react';
import { ReactionRateChartLayoutSettings } from './ReactionRateChartLayoutSettings';
import { Equation } from './Equation';
import TimeChartDataLineView from './TimeChartDataLineView';
import { ChartAxisShapeSettings } from './ChartAxisShapeSettings';
import Color from 'color';

type ReactionMoleculeDisplay = {
  name: string,
  color: string,
}

type ReactionPairDisplay = {
  reactant: ReactionMoleculeDisplay,
  product: ReactionMoleculeDisplay,
}

type ConcentrationPlotViewProps = {
  height?: string | number | undefined,
  width?: string | number | undefined,
  settings: ReactionRateChartLayoutSettings,
  concentrationA: Equation,
  concentrationB?: Equation,
  initialTime: number,
  currentTime: number,
  finalTime: number,
  canSetCurrentTime: boolean,
  highlightChart: boolean,
  highlightLhsCurve: boolean,
  highlightRhsCurve: boolean,
  display: ReactionPairDisplay,
  includeAxis: boolean
}

type Rect = {
  width: number,
  height: number
}

const ConcentrationPlotView = (props: ConcentrationPlotViewProps) => {
  const {
    width,
    height,
    settings,
    concentrationA,
    concentrationB,
    initialTime,
    currentTime,
    finalTime,
    canSetCurrentTime,
    highlightChart,
    highlightLhsCurve,
    highlightRhsCurve,
    display,
    includeAxis,
  } = props;
  const canvas = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      const { height: rectHeight, width: rectWidth } = ctx.canvas;
      const rect: Rect = {
        width: rectWidth,
        height: rectHeight
      }
      if (highlightChart) {
        ctx.rect(
          0,
          0,
          rect.width,
          rect.height,
        );
        ctx.fillStyle = "white";
        ctx.fill();
      }

      // if (highlightLhsCurve) {
      //   rectangleHighlight(ctx, initialTime, (initialTime + finalTime) / 2)
      // }
      // if (highlightRhsCurve) {
      //   rectangleHighlight(ctx, (initialTime + finalTime) / 2, finalTime)
      // }

      if (includeAxis) {
        verticalIndicator(ctx, initialTime)
        verticalIndicator(ctx, finalTime)
        horizontalIndicator(ctx, concentrationA.getValue(initialTime))
        horizontalIndicator(ctx, concentrationA.getValue(finalTime))
      }

      if (includeAxis) {
        chartAxisShape(ctx, settings.chartAxisShapeSettings, rect)
      }
    }
  }, [])

  // const rectangleHighlight = (
  //   ctx: CanvasRenderingContext2D,
  //   t1: number,
  //   t2: number,
  // ) => {
  //   const x1 = settings.xAxis.getPosition(t1)
  //   const x2 = settings.xAxis.getPosition(t2)
  //   const width = x2 - x1
  //   const midX = (x2 + x1) / 2

  //   const c1 = concentrationA.getValue(t1)
  //   const c2 = concentrationA.getValue(t2)
  //   const y1 = settings.yAxis.getPosition(c1)
  //   const y2 = settings.yAxis.getPosition(c2)

  //   const height = Math.abs(y2 - y1)
  //   let midY = (y1 + y2) / 2

  //   ctx.rect(midX, midY, width, height)
  //   ctx.fillStyle = "white";
  //   ctx.fill();
  // }

  const verticalIndicator = (
    ctx: CanvasRenderingContext2D,
    time: number
  ) => {
    ctx.beginPath()

    ctx.moveTo(settings.xAxis.getPosition(time), 0)
    ctx.lineTo(settings.xAxis.getPosition(time), settings.chartSize)
    ctx.lineWidth = 0.3
    ctx.stroke()
  }

  const horizontalIndicator = (
    ctx: CanvasRenderingContext2D,
    concentration: number
  ) => {
    ctx.beginPath()

    ctx.moveTo(0, settings.yAxis.getPosition(concentration))
    ctx.lineTo(settings.chartSize, settings.yAxis.getPosition(concentration))
    ctx.lineWidth = 0.3
    ctx.stroke()
  }

  const chartAxisShape = (
    ctx: CanvasRenderingContext2D,
    settings: ChartAxisShapeSettings,
    rect: Rect,
  ) => {
    ctx.beginPath()
    ctx.rect(0, 0, rect.width, rect.height)
    let dy = (rect.height - settings.gapToTop) / settings.verticalTicks
    for (let i = 0; i < settings.verticalTicks; i++) {
      let distanceFromBottom = i * dy
      let y = rect.height - distanceFromBottom
      ctx.moveTo(0, y)
      ctx.lineTo(settings.tickSize, y)
    }

    let dx = (rect.width - settings.gapToSide) / settings.horizontalTicks
    for (let i = 0; i < settings.horizontalTicks; i++) {
      let x = i * dx
      ctx.moveTo(x, rect.height)
      ctx.lineTo(x, rect.height - settings.tickSize)
    }
    ctx.stroke()
  }

  return (
    <>
      <canvas ref={canvas} height={width} width={height} />
      {concentrationB &&
        <TimeChartDataLineView
          width={width}
          height={height}
          data={{
            equation: concentrationB,
            headColor: display.product.color,
            headRadius: settings.chartHeadSecondarySize,
          }}
          settings={settings.timeChartLayoutSettings}
          lineWidth={settings.timeChartLayoutSettings.lineWidth}
          initialTime={initialTime}
          currentTime={currentTime} //.constant(currentTime),
          finalTime={finalTime}
          filledBarColor={'gray'} //Styling.timeAxisCompleteBar,
          canSetCurrentTime={canSetCurrentTime}
          highlightLhs={false}
          highlightRhs={false}
        />
      }
      <TimeChartDataLineView
        width={width}
        height={height}
        data={{
          equation: concentrationA,
          headColor: display.reactant.color,
          haloColor: Color(display.reactant.color).alpha(0.3).toString(),
          headRadius: settings.chartHeadPrimarySize,
        }}
        settings={settings.timeChartLayoutSettings}
        lineWidth={settings.timeChartLayoutSettings.lineWidth}
        initialTime={initialTime}
        currentTime={currentTime} //$currentTime
        finalTime={finalTime}
        filledBarColor={''} //Styling.timeAxisCompleteBar
        canSetCurrentTime={canSetCurrentTime}
        highlightLhs={highlightLhsCurve}
        highlightRhs={highlightRhsCurve}
      />
    </>
  );
};
export default ConcentrationPlotView;