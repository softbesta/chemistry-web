import React from 'react';
import { EnergyRateChartSettings } from './EnergyRateChartSettings';
import Color from 'color';
import { EnergyProfileChatInput } from './EnergyProfileChartInput';

type EnergyProfileChartProps = {
    height: number,
    width: number,
    settings: EnergyRateChartSettings,
    showTemperature: boolean,
    highlightTop: boolean,
    highlightBottom: boolean,
    moleculeHightlightColor: string,
    order: number,
    chartInput: EnergyProfileChatInput,
}

type Rect = {
    width: number,
    height: number,
}

const EnergyProfileChart = (props: EnergyProfileChartProps) => {
    const {
        width,
        height,
        settings,
        showTemperature,
        highlightTop,
        highlightBottom,
        moleculeHightlightColor,
        order,
        chartInput,
    } = props;
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const canvas1 = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
            const { height: rectHeight, width: rectWidth } = ctx.canvas;
            const rect: Rect = {
                width: rectWidth,
                height: rectHeight
            }
            ctx.rect(0, 0, rect.width, rect.height)
            ctx.stroke()
            if (showTemperature) {
                // tempLine
                tempLine(ctx, rect)
            }

            const chartSize = settings.chartSize

            energyProfileChartShape(ctx, chartInput.initialPeak, chartInput.leftAsymptote, chartInput.rightAsymptote, rect, 'gray')
            energyProfileChartShape(ctx, chartInput.reducedPeak, chartInput.leftAsymptote, chartInput.rightAsymptote, rect, 'orange')

            const startY = absoluteY(0, rectWidth, rectHeight, chartInput.leftAsymptote, chartInput.rightAsymptote, chartInput.reducedPeak)
            const midX = chartSize / 2
            const midY = absoluteY(midX, rectWidth, rectHeight, chartInput.leftAsymptote, chartInput.rightAsymptote, chartInput.reducedPeak)
            const padding = chartSize * 0.04

            ctx.beginPath()
            ctx.moveTo(midX, startY)
            ctx.lineTo(midX, midY + padding)

            // draw Arrow
            ctx.moveTo(midX, startY)
            
            ctx.font = 'bold 16px Arial'
            ctx.fillText('E', midX - 0.8 * padding, startY + 15)
            ctx.font = '12px Arial'
            ctx.fillText('a', midX + 0.3 * padding, startY + 19)
            
            ctx.lineTo(midX - 0.65 * padding, startY - padding)

            ctx.moveTo(midX, startY)
            ctx.lineTo(midX + 0.65 * padding, startY - padding)

            ctx.moveTo(midX, midY + padding)
            ctx.lineTo(midX - 0.65 * padding, midY + 2 * padding)

            ctx.moveTo(midX, midY + padding)
            ctx.lineTo(midX + 0.65 * padding, midY + 2 * padding)

            ctx.strokeStyle = 'black'
            ctx.stroke()
        }
    })

    const tempLine = (ctx: CanvasRenderingContext2D, rect: Rect) => {
        const peak = chartInput.currentEnergy
        ctx.beginPath()
        ctx.rect(0, absoluteY(settings.chartSize / 2, rect.width, rect.height, chartInput.leftAsymptote, chartInput.rightAsymptote, peak), rect.width, 1)
        ctx.strokeStyle = Color.rgb(0, 0, 0).alpha(0.6).toString()
        ctx.lineWidth = 1
        ctx.stroke()
    }

    const energyProfileChartShape = (
        ctx: CanvasRenderingContext2D,
        peak: number,
        leftAsymptote: number,
        rightAsymptote: number,
        rect: Rect,
        color: string,
    ) => {
        const frameWidth = rect.width
        const frameHeight = rect.height
        const points = 100

        ctx.beginPath()
        ctx.moveTo(0, absoluteY(0, frameWidth, frameHeight, leftAsymptote, rightAsymptote, peak))
        const dx = frameWidth / points
        const ctx1 = canvas1?.current?.getContext('2d');
        for (let x = 0; x < frameWidth; x += dx) {
            const y = absoluteY(x, frameWidth, frameHeight, leftAsymptote, rightAsymptote, peak)
            if (x === 0 && ctx1) {
                ctx1.beginPath()
                ctx1.arc(10, y + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
                ctx1.fillStyle = Color.rgb(156, 109, 138).toString()
                ctx1.fill()
                
                ctx1.beginPath()
                ctx1.arc(36, y + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
                ctx1.fillStyle = Color.rgb(27, 153, 139).toString()                
                ctx1.fill()
                ctx1.canvas.style.position = 'absolute'
                ctx1.canvas.style.left = '0px'
                ctx1.font = 'bold 14px Arial'
                ctx1.fillStyle = 'black'
                ctx1.fillText('G + H', 4, y + settings.annotationMoleculeSize + 20)
                ctx1.closePath()
            }

            if (x === frameWidth - 30 && ctx1) {
                ctx1.beginPath()
                ctx1.arc(x + 9, y + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
                ctx1.arc(x + 20, y + settings.annotationMoleculeSize, settings.annotationMoleculeSize / 2, 0, 2 * Math.PI)
                ctx1.fillStyle = Color.rgb(221, 183, 113).toString()
                ctx1.fill()
                ctx1.canvas.style.position = 'absolute'
                ctx1.canvas.style.left = '0px'
                ctx1.font = 'bold 14px Arial'
                ctx1.fillStyle = 'black'
                ctx1.fillText('I', x + 12, y + settings.annotationMoleculeSize + 20)
                ctx1.closePath()
            }

            ctx.strokeStyle = color
            ctx.lineWidth = 1
            ctx.lineTo(x, y)
            ctx.stroke();

        }
    }

    const absoluteY = (absoluteX: number, frameWidth: number, frameHeight: number, leftAsymptote: number, rightAsymptote: number, peak: number) => {
        const relativeX = absoluteX / frameWidth
        const y = relativeY(relativeX, leftAsymptote, rightAsymptote, peak)
        const absoluteFromTop = y * frameHeight
        return frameHeight - absoluteFromTop
    }

    const relativeY = (relativeX: number, leftAsymptote: number, rightAsymptote: number, peak: number) => {
        let asymptote = relativeX < 0.5 ? leftAsymptote : rightAsymptote
        let height = peak - asymptote
        let exponent = -1 * Math.pow((relativeX - 0.5), 2) * 30
        return (height * Math.pow(Math.E, exponent)) + asymptote
    }


    return (
        <>
            <canvas ref={canvas} height={height} width={width} />
            <canvas ref={canvas1} height={height} width={width} />
        </>
    );
};
export default EnergyProfileChart;