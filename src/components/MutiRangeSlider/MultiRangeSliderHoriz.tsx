import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import './slider.css'

interface MultiRangeSliderProps {
  max: number
  width?: number
  distance?: number
  showThumbIndex: number[]
  values: number[]
  // onChange: (val: number, index: number) => void
  onChange: (vals: number[]) => void
}

const MultiRangeSliderHoriz = ({
  max,
  width,
  distance = 13,
  showThumbIndex,
  values,
  onChange
}: MultiRangeSliderProps) => {
  const valLeft = values[0]
  // const valRight = values[1]

  const [vals, setVals] = useState(values)
  const minDisabled = showThumbIndex[0] === 1 ? true : false
  const maxDisabled = showThumbIndex[1] === 1 ? true : false
  const isLeftOverlap = maxDisabled || vals[0] > max - max * 0.1

  useEffect(() => {
    onChange(vals)
  }, [vals])

  const onChangeValue = (val: number, index: number) => {
    // console.log('ttt', { val, index })
    // onChange(val, index)
    const update = [...vals]
    update[index] = val
    setVals(update)
  }

  return (
    <div
      className='h-slider-container'
      style={{
        ...(width ? { width } : { width: '100%' })
      }}
    >
      <div className='h-slider-bar' />
      <div className='h-slider-thumbs'>
        <div className='h-slider-inputs'>
          <input
            className={classnames(
              'h-slider-thumb thumb--zindex-3',
              { 'thumb--zindex-5': isLeftOverlap },
              { 'h-slider-thumb-hidden': showThumbIndex[0] === 0 },
            )}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={minDisabled}
            type='range'
            max={max}
            value={vals[0]}
            onChange={(event) => {
              let val = +event.target.value
              if (vals[1]) {
                val = Math.min(val, vals[1] - distance)
              }
              onChangeValue(+val, 0)
            }}
          />

          <input
            className={classnames(
              'h-slider-thumb thumb--zindex-4',
              { 'thumb-hidden': showThumbIndex[1] === 0 },
            )}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={maxDisabled}
            type='range'
            max={max}
            value={vals[1]}
            onChange={(event) => {
              let val = +event.target.value
              if (vals[0]) {
                val = Math.max(val, vals[0] + distance)
              }
              onChangeValue(+val, 1)
            }}
          />
        </div>
      </div>
      <div>
        {showThumbIndex[0] > 0 && <div
          className={`
            h-slider-pointer 
            ${showThumbIndex[0] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 9 + 150 / 20 * vals[0] / 10
          }}
        />}
        {showThumbIndex[1] > 0 && <div
          className={`
            h-slider-pointer 
            ${showThumbIndex[1] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 9 + 150 / 20 * vals[1] / 10
          }}
        />}
      </div>
    </div>
  )
}

export default MultiRangeSliderHoriz
