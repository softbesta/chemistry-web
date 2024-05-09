import React, { useEffect, useState } from 'react'
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
const MultiRangeSliderVert = ({
  max,
  width,
  distance = 13,
  showThumbIndex,
  values,
  onChange
}: MultiRangeSliderProps) => {
  const valLeft = values[0]
  const valRight = values[1]

  const [minDisabled, setMinDisabled] = useState<boolean>(false);
  const [maxDisabled, setMaxDisabled] = useState<boolean>(false);

  useEffect(() => {
    setMaxDisabled(true);
    setMinDisabled(true);
    if (showThumbIndex[0] === 2 && showThumbIndex[1] === 1) {
      setMaxDisabled(false);
    } else if (showThumbIndex[1] === 2 && showThumbIndex[0] === 1) {
      setMinDisabled(false);
    } else if (showThumbIndex[1] === 2 && showThumbIndex[0] === 0) {
      setMaxDisabled(false);
      setMinDisabled(false);
    } else if (showThumbIndex[0] === 2 && showThumbIndex[1] === 0) { 
      setMaxDisabled(false);
      setMinDisabled(false);
    }
  }, showThumbIndex)

  const isLeftOverlap = maxDisabled || valLeft > max - 10

  const onChangeValue = (val: number, index: number) => {
    // console.log('ttt', { val, index })
    onChange(val, index)
  }

  return (
    <div
      className='v-slider-container'
      style={{
        ...(width ? { width } : { width: '100%' })
      }}
    >
      <div className='v-slider-bar' />
      <div className='v-slider-thumbs'>
        <div className='v-slider-inputs'>
          <input
            className={classnames(
              'v-slider-thumb thumb--zindex-3',
              { 'thumb--zindex-5': isLeftOverlap },
              { 'v-slider-thumb-hidden': showThumbIndex[0] === 0 },
            )}
            style={{
              ...(width ? { width } : { width: '100%' })
            }}
            disabled={minDisabled}
            type='range'
            max={max}
            value={valLeft}
            onChange={(event) => {
              event.preventDefault()
              event.stopPropagation()
              let val = +event.target.value
              if (valRight) {
                val = Math.min(val, valRight - distance)
              }
              onChangeValue(+val, 0)
            }}
          />
          <input
            className={classnames(
              'v-slider-thumb thumb--zindex-4',
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
              event.preventDefault()
              event.stopPropagation()
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

export default MultiRangeSliderVert
