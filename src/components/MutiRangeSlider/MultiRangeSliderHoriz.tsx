import React from 'react'
import classnames from 'classnames'
import './slider.css'

interface MultiRangeSliderProps {
  max: number
  width?: number
  distance?: number
  showThumbIndex: number[]
  values: number[]
  onChange: (val: number, index: number) => void
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
  const valRight = values[1]

  const minDisabled = showThumbIndex[0] === 1 ? true : false
  const maxDisabled = showThumbIndex[1] === 1 ? true : false
  const isLeftOverlap = maxDisabled || valLeft > max - max * 0.1

  const onChangeValue = (val: number, index: number) => {
    // console.log('ttt', { val, index })
    onChange(val, index)
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
            value={valLeft}
            onChange={(event) => {
              let val = +event.target.value
              if (valRight) {
                val = Math.min(val, valRight - distance)
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
            value={valRight}
            onChange={(event) => {
              let val = +event.target.value
              if (valLeft) {
                val = Math.max(val, valLeft + distance)
              }
              onChangeValue(+val, 1)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MultiRangeSliderHoriz
