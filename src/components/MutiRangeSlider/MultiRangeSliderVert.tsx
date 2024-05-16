import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import './slider.css'

interface MultiRangeSliderProps {
  max: number
  minVal: number
  width?: number
  distance?: number
  showThumbIndex: number[]
  values: number[]
  onChange: (val: number[]) => void
}
const MultiRangeSliderVert = ({
  max: maxRange,
  minVal = 0,
  width,
  distance = 13,
  showThumbIndex,
  values,
  onChange
}: MultiRangeSliderProps) => {
  // const valLeft = values[0]
  // const valRight = values[1]

  const [vals, setVals] = useState(values)

  // const [minDisabled, setMinDisabled] = useState<boolean>(false);
  // const [maxDisabled, setMaxDisabled] = useState<boolean>(false);

  // useEffect(() => {
  //   setMaxDisabled(true);
  //   setMinDisabled(true);
  //   if (showThumbIndex[0] === 2 && showThumbIndex[1] === 1) {
  //     setMaxDisabled(false);
  //   } else if (showThumbIndex[1] === 2 && showThumbIndex[0] === 1) {
  //     setMinDisabled(false);
  //   } else if (showThumbIndex[1] === 2 && showThumbIndex[0] === 0) {
  //     setMaxDisabled(false);
  //     setMinDisabled(false);
  //   } else if (showThumbIndex[0] === 2 && showThumbIndex[1] === 0) {
  //     setMaxDisabled(false);
  //     setMinDisabled(false);
  //   }
  // }, showThumbIndex)

  const minDisabled = showThumbIndex[0] === 1 ? true : false
  const maxDisabled = showThumbIndex[1] === 1 ? true : false
  const isLeftOverlap = maxDisabled || vals[0] > maxRange - 10

  useEffect(() => {
    onChange(vals)
  }, [vals])

  const onChangeValue = (value: number[]) => {
    // console.log('ttt', { value, vals, showThumbIndex, distance })
    // onChange(val, index)
    const update = [...value]

    setVals(update)
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
            max={maxRange}
            value={vals[0]}
            onChange={(event) => {
              event.preventDefault()
              event.stopPropagation()
              const update = [...vals]
              update[0] = +event.target.value
              if (update[0] <= minVal + distance) {
                update[0] = minVal + distance
              }
              if (update[1] > update[0] - distance) {
                update[1] = update[0] - distance
              }
              onChangeValue(update)
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
            max={maxRange}
            value={vals[1]}
            onChange={(event) => {
              event.preventDefault()
              event.stopPropagation()
              const update = [...vals]
              update[1] = +event.target.value
              if (update[1] >= update[0] - distance) {
                update[1] = update[0] - distance
              }
              if (update[1] <= minVal) {
                update[1] = minVal
              }
              onChangeValue(update)
            }}
          />
        </div>
      </div>
      <div>
        {showThumbIndex[0] > 0 && <div
          className={`
            v-slider-pointer 
            ${showThumbIndex[0] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 8 + 150 / 100 * vals[0]
          }}
        />}
        {showThumbIndex[1] > 0 && <div
          className={`
            v-slider-pointer 
            ${showThumbIndex[1] === 1 ? 'disabled' : ''}
          `}
          style={{
            left: 8 + 150 / 100 * vals[1]
          }}
        />}
      </div>
    </div>
  )
}

export default MultiRangeSliderVert
