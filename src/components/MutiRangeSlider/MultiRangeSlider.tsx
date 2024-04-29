import React, { useCallback, useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './slider.css'

interface MultiRangeSliderProps {
  max: number
  width?: number
  distance?: number
  showThumbIndex: number[]
  values: number[]
  onChange: (val: number, index: number) => void
}
const MultiRangeSlider = ({
  max,
  width,
  distance = 13,
  showThumbIndex,
  values,
  onChange
}: MultiRangeSliderProps) => {
  // const [valLeft, setValLeft] = useState(showThumbIndex[0] === 0 ? 0 : values[0])
  // const [valRight, setValRight] = useState(showThumbIndex[1] === 0 ? max : values[1])
  const valLeft = values[0]
  const valRight = values[1]
  console.log({ valLeft, valRight })

  // // Get min and max values when their state changes
  // useEffect(() => {
  //   onChange([valLeft, valRight])
  // }, [valLeft, valRight])

  const minDisabled = showThumbIndex[0] === 1 ? true : false
  const maxDisabled = showThumbIndex[1] === 1 ? true : false
  const isLeftOverlap = maxDisabled || valLeft > max - 10

  const onChangeValue = (val: number, index: number) => {
    console.log('ttt', { val, index })
    onChange(val, index)
  }

  return (
    <div
      className='slider-container'
      style={{
        ...(width ? { width } : {width: '100%'})
      }}
    >
      <div className='slider-horiz-bar' />
      <div className='slider-horiz'>
        <div className='slider-horizontal-slider'>
          <input
            className={classnames(
              'horiz-thumb thumb--zindex-3',
              { 'thumb--zindex-5': isLeftOverlap },
              { 'slider-thumb-hidden': showThumbIndex[0] === 0 },
            )}
            style={{
              ...(width ? { width } : {width: '100%'})
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
              'horiz-thumb thumb--zindex-4',
              { 'slider-thumb-hidden': showThumbIndex[1] === 0 },
            )}
            style={{
              ...(width ? { width } : {width: '100%'})
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

export default MultiRangeSlider
