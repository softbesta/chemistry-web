import { useEffect, useRef, useState } from 'react'
import styles from './EnergyCatalyst.module.scss'
import catalystOne from '../assets/ReactionRates/catone.png'
import catalystTwo from '../assets/ReactionRates/cattwo.png'
import catalystThree from '../assets/ReactionRates/catthree.png'
import catalystDisabled from '../assets/ReactionRates/catdisable.png'
import { Point } from '../helper/types'
import { debounce } from '../helper/functions'

interface EnergyCatalystContainerProps {
  catalystIds: number[]
  regionWidth?: number
  regionHeight?: number
}
export const EnergyCatalystContainer = ({
  catalystIds = [0, 1, 2],
  regionWidth = 230,
  regionHeight = 200,
}: EnergyCatalystContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const catItemWidth = 30, catItemHeight = 70

  const [positions, setPositions] = useState<Point[]>(Array(3).fill({ x: 0, y: 0 }))
  const [selectedCatId, setSelectedCatId] = useState(0)
  const [dragIndex, setDragIndex] = useState(-1)
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 })

  const shakeThreshold = 30
  const [prevPosition, setPrevPosition] = useState<Point>({ x: 0, y: 0 });
  const shakings = useRef<number>(0)
  // const [shakingDirection, setShakingDirection] = useState(0)
  const [shakingCount, setShakingCount] = useState<number>(0)

  const timerID = useRef<NodeJS.Timer>()
  // const maxTime = 5 * 1000
  const framesPerSecond = 5
  const intervalTime = 1000 / framesPerSecond
  const [timeCounter, setTimeCounter] = useState<number>(0)
  const startTimer = () => {
    stopTimer()
    setTimeCounter(0)
    timerID.current = setInterval(() => {
      setTimeCounter(v => v += intervalTime)
    }, intervalTime)
    console.log('started', timerID.current)
  }
  const stopTimer = () => {
    if (timerID.current) {
      console.log('timer end', timerID.current)
      clearInterval(timerID.current)
      timerID.current = undefined
    }
  }
  const onTimer = () => {
    console.log('timer count', { timeCounter })
    const position = positions[dragIndex]
    const distance = Math.sqrt((prevPosition.x - position.x) ** 2 + (prevPosition.y - position.y))
    if (distance > shakeThreshold) {
      console.log('shaking detected - ', { shakeThreshold })
      shakings.current++
    }
    setPrevPosition(positions[dragIndex])
  }
  useEffect(() => {
    if (dragIndex < 0) {
      stopTimer()
      return
    }
    onTimer()
  }, [timeCounter])
  useEffect(() => {
    return () => stopTimer()
  }, [])

  const onItemDragStart = (index: number) => {
    // console.log('===handleMouseUp=== drag start')
    setSelectedCatId(index)
    setDragIndex(index)
    startTimer()
  }
  const onItemDragEnd = (_e: any) => {
    setDragIndex(-1)
  }
  const onItemMove = (_e: any) => {
    if (dragIndex > -1) {
      // console.log('=== handleMouseMove ===', {dragIndex})
      const update = [...positions]
      let newX = _e.clientX - dragOffset.x
      let newY = _e.clientY - dragOffset.y
      newX = Math.min(Math.max(newX, 0), regionWidth - catItemWidth)
      newY = Math.min(Math.max(newY, 0), regionHeight - catItemHeight)

      // const distance = Math.sqrt((newX - positions[dragIndex].x) ** 2 + (newY - positions[dragIndex].y) ** 2)
      update[dragIndex] = { x: newX, y: newY }
      setPositions(update)
    }
  }
  useEffect(() => {
    const count = Math.floor(shakings.current)
    if (count > 0) {
      shakings.current = 0
      setShakingCount(v => v + count)
      // console.log('shaking count --- ', shakingCount + count)
    }
  }, [shakings.current])
  useEffect(() => {
    console.log({ shakingCount })
  }, [shakingCount])

  // const [isStart, setIsStart] = useState(false)
  // const animationStart = () => {
  //   setIsStart(true)
  // }
  // const animationEnd = () => {
  //   setIsStart(false)
  // }

  return <div
    ref={containerRef}
    className={styles.catalystContainer}
    style={{
      width: regionWidth,
      height: regionHeight,
    }}
    onMouseUp={onItemDragEnd}
    onMouseMove={onItemMove}
  >
    {catalystIds.map((catIdx, index) => <EnergyCatalystItem
      catIndex={catIdx}
      width={catItemWidth}
      height={catItemHeight}
      isDragging={dragIndex === index}
      position={positions[index]}
      onDragStart={() => onItemDragStart(index)}
      setDragOffset={setDragOffset}
    />)}
    {/* <button onClick={() => animationStart()}>start</button>
    <button onClick={() => animationEnd()}>end</button> */}
    {shakingCount > 0 && <ElementDroppingAnimation
      elementType={selectedCatId}
      elementCount={shakingCount}
      // isStart={isStart}
      // onEnd={animationEnd}
    />}
  </div>
}

const catalystImgs = [catalystOne, catalystTwo, catalystThree]
const catalystImgColors = ['red', 'green', 'blue']
interface EnergyCatalystItemProps {
  catIndex: number
  disable?: boolean
  width?: number
  height?: number
  position: Point
  isDragging: boolean
  onDragStart: () => void
  setDragOffset: React.Dispatch<React.SetStateAction<Point>>
}
export const EnergyCatalystItem = ({
  catIndex,
  disable,
  width = 50,
  height = 100,
  position,
  isDragging,
  onDragStart,
  setDragOffset,
}: EnergyCatalystItemProps) => {

  const handleMouseDown = (_e: any) => {
    const offsetX = _e.clientX - position.x;
    const offsetY = _e.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY })
    onDragStart()
  }

  if (disable) {
    return <div>
      <img
        width={width}
        height={height}
        src={catalystDisabled}
      />
    </div>
  }
  return <div
    className={styles.catalystItem}
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width,
      height,
      cursor: isDragging ? 'grabbing' : 'grab',
      ...(isDragging ? { zIndex: 123 } : {}),
      // backgroundColor: catalystImgColors[catIndex],
      backgroundImage: `url(${catalystImgs[catIndex]})`
    }}
    onMouseDown={_e => handleMouseDown(_e)}
  >
    {/* <img
      width={50}
      height={100}
      src={catalystImgs[catIndex]}
    /> */}
  </div>
}

interface ElementDroppingAnimationProps {
  elementCount: number
  elementType: number
  // isStart: boolean
  // onEnd?: () => void
}
export const ElementDroppingAnimation = ({
  elementCount,
  elementType,
  // isStart,
  // onEnd,
}: ElementDroppingAnimationProps) => {

  // const [timeCounter, setTimeCounter] = useState<number>(0)
  // const [counter, setCounter] = useState(0)
  // const maxTime = 5 * 1000
  // const framesPerSecond = 1
  // const intervalTime = 1000 / framesPerSecond

  // const timerID = useRef<NodeJS.Timer>()
  // const startTimer = () => {
  //   stopTimer()
  //   setTimeCounter(0)
  //   timerID.current = setInterval(() => {
  //     setTimeCounter(v => v += intervalTime)
  //   }, intervalTime)
  //   console.log('started', timerID.current)
  // }
  // const stopTimer = () => {
  //   if (timerID.current) {
  //     clearInterval(timerID.current)
  //     timerID.current = undefined
  //     console.log('timer end')
  //   }
  // }

  // // animation play
  // useEffect(() => {
  //   if (timeCounter > maxTime) {
  //     // animation ends
  //     stopTimer()
  //     onEnd?.()
  //     return
  //   }
  //   console.log('timer count', { timeCounter, isStart })
  // }, [timeCounter])

  // useEffect(() => {
  //   if (!isStart) {
  //     stopTimer()
  //     onEnd?.()
  //     return
  //   }
  //   startTimer()
  // }, [isStart])
  // useEffect(() => {
  //   console.log({ elementCount, counter })
  //   setCounter(v => v + 1)
  // }, [elementCount])

  console.log({ elementType })

  return <div>
    {Array.from(Array(elementCount).fill(true)).map((item, index) => {
      return <div
        key={index}
        className={`${styles.droppingElement} ${styles[`catType${elementType}`]}`}
      />
    })}
    <div className={styles.droppingElement}></div>
  </div>
}