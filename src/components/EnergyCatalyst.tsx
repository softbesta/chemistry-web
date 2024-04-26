import { useEffect, useRef, useState } from 'react'
import styles from './EnergyCatalyst.module.scss'
import catalystOne from '../assets/ReactionRates/catone.png'
import catalystTwo from '../assets/ReactionRates/cattwo.png'
import catalystThree from '../assets/ReactionRates/catthree.png'
import catalystDisabled from '../assets/ReactionRates/catdisable.png'
import { Point } from '../helper/types'
import { debounce, delay } from '../helper/functions'

const catalystImgs = [catalystOne, catalystTwo, catalystTwo, catalystThree]
const catalystImgColors = ['red', 'green', 'blue', 'blue']

interface EnergyCatalystContainerProps {
  catalystTypes: number[]
  catalystItemStates: number[]
  setCatalystItemStates: (val: number[]) => void
  regionWidth?: number
  regionHeight?: number
}
export const EnergyCatalystContainer = ({
  catalystTypes = [0, 1, 3],
  catalystItemStates,
  setCatalystItemStates,
  regionWidth = 350,
  regionHeight = 230,
}: EnergyCatalystContainerProps) => {
  const catItemWidth = 30, catItemHeight = 70

  // 0: hidden, 1: moveable, 2: menu item disabled, 3: menu item active
  const initialMenuPositions = [
    { x: regionWidth / 2 - 85, y: 0 },
    { x: regionWidth / 2 - 25, y: 0 },
    { x: regionWidth / 2 + 35, y: 0 },
  ]
  const initialActivePosition = { x: regionWidth / 2 - 25, y: 100 }

  const containerRef = useRef<HTMLDivElement>(null)

  // const [enabledIndex, setEnabledIndex] = 
  const [activeCatIdx, setActiveCatIdx] = useState(-1)
  const [position, setPosition] = useState<Point>(initialActivePosition)
  const [dragIndex, setDragIndex] = useState(-1)
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 })

  const shakeThreshold = 30
  const [prevPosition, setPrevPosition] = useState<Point>({ x: 0, y: 0 })
  const shakings = useRef<number>(0)
  // const [shakingDirection, setShakingDirection] = useState(0)
  const [shakingCount, setShakingCount] = useState<number>(0) // count of ElementDroppingAnimation

  // timer to count the shakings
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
    // console.log('started', timerID.current)
  }
  const stopTimer = () => {
    if (timerID.current) {
      // console.log('timer end', timerID.current)
      clearInterval(timerID.current)
      timerID.current = undefined
    }
  }
  const onTimer = () => {
    // console.log('timer count', { timeCounter })
    const distance = Math.sqrt((prevPosition.x - position.x) ** 2 + (prevPosition.y - position.y))
    if (distance > shakeThreshold) {
      // console.log('shaking detected - ', { shakeThreshold })
      shakings.current++
    }
    setPrevPosition(position)
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
    setDragIndex(index)
    startTimer()
  }
  const onItemDragEnd = (_e: any) => {
    setDragIndex(-1)
  }
  const onItemMove = (_e: any) => {
    if (dragIndex > -1) {
      // console.log('=== handleMouseMove ===', {dragIndex})
      let update = position
      let newX = _e.clientX - dragOffset.x
      let newY = _e.clientY - dragOffset.y
      newX = Math.min(Math.max(newX, 0), regionWidth - catItemWidth)
      newY = Math.min(Math.max(newY, 0), regionHeight - catItemHeight)

      // const distance = Math.sqrt((newX - positions[dragIndex].x) ** 2 + (newY - positions[dragIndex].y) ** 2)
      update = { x: newX, y: newY }
      setPosition(update)
    }
  }

  // Moveable Item: Detect multiple clicked count within 0.5s
  const [lastClickTime, setLastClickTime] = useState(0);
  const onMovableItemClick = async () => {
    // console.log('===onItemClick===', { shakingCount })
    const droppingCountToAdd = 3
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime <= 300) {
      addMultipleDropping(droppingCountToAdd)
    }
    setLastClickTime(currentTime);
  }
  const addMultipleDropping = async (count: number) => {
    if (count < 1) return
    setShakingCount(v => v + 1)
    await delay(100)
    await addMultipleDropping(count - 1)
  }

  // Menu Item: Change CatalystItemState   3 (menu clickable) -> 1 (hide menu and show movable item instead)
  const onClickCatalystMenuItem = (id: number) => {
    const others = [...catalystItemStates]
    others.splice(id, 1)
    const normalState = Math.max(...others) // find another which is disabled(2) or active(3)
    const update = [normalState, normalState, normalState]
    update[id] = 1  // show item as moveable

    // console.log('clicked catalyst menu item', { id, origin: catalystItemStates, update })
    setCatalystItemStates(update)
  }

  useEffect(() => {
    const count = Math.floor(shakings.current)
    if (count > 0) {
      shakings.current = 0
      setShakingCount(v => v + count)
      // console.log('===useEffect.shakings===  shaking count --- ', shakingCount + count)
    }
  }, [shakings.current])
  useEffect(() => {
    // console.log({ shakingCount })
  }, [shakingCount])

  useEffect(() => {
    // initialize when active catalyst state changes
    // console.log('===useEffect.catalystItemStates===')
    const activeId = catalystItemStates.findIndex(item => item === 1) // find an item which is moveable
    setActiveCatIdx(activeId)
    setShakingCount(0)
    setPosition(initialActivePosition)
  }, [catalystItemStates])

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
    {catalystTypes.map((catIdx, index) => {
      // console.log({ catIdx, catalystTypes, catalystItemStates }, catalystItemStates[index])
      if (catalystItemStates[index] === undefined || catalystItemStates[index] < 2) return null
      return <EnergyCatalystMenuItem
        disable={catalystItemStates[index] === 2}
        catType={catIdx}
        width={catItemWidth}
        height={catItemHeight}
        position={initialMenuPositions[index]}
        onClick={() => onClickCatalystMenuItem(index)}
      />
    })}
    {activeCatIdx > -1 && <EnergyCatalystMoveableItem
      catIndex={activeCatIdx}
      width={catItemWidth}
      height={catItemHeight}
      isDragging={dragIndex === activeCatIdx}
      position={position}
      onClick={() => onMovableItemClick()}
      onDragStart={() => onItemDragStart(activeCatIdx)}
      setDragOffset={setDragOffset}
    />}
    {/* <button onClick={() => animationStart()}>start</button>
    <button onClick={() => animationEnd()}>end</button> */}
    <ElementDroppingAnimation
      elementType={activeCatIdx}
      elementCount={shakingCount}
    />
  </div>
}

// Menu for Catalyst Items
interface EnergyCatalystMenuItemProps {
  catType: number
  disable?: boolean
  width?: number
  height?: number
  position: Point
  onClick: () => void
}
export const EnergyCatalystMenuItem = ({
  catType,
  disable,
  width = 50,
  height = 100,
  position,
  onClick,
}: EnergyCatalystMenuItemProps) => {
  // const catalystColor = disable ? 'gray' : catalystImgColors[catType]
  const catalystImg = disable ? catalystDisabled : catalystImgs[catType]
  // console.log({ catalystColor, catType })

  return <div
    className={`${styles.catalystItem}`}
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width,
      height,
      cursor: 'pointer',
      // backgroundColor: catalystColor,
      backgroundImage: `url(${catalystImg})`
    }}
    onClick={() => !disable && onClick()}
  />
}


// Moveable Catalyst Item
interface EnergyCatalystMoveableItemProps {
  catIndex: number
  disable?: boolean
  width?: number
  height?: number
  position: Point
  isDragging: boolean
  onClick?: () => void
  onDragStart: () => void
  setDragOffset: React.Dispatch<React.SetStateAction<Point>>
}
export const EnergyCatalystMoveableItem = ({
  catIndex,
  disable,
  width = 50,
  height = 100,
  position,
  isDragging,
  onClick,
  onDragStart,
  setDragOffset,
}: EnergyCatalystMoveableItemProps) => {

  // console.log({ catIndex, position, disable })

  const handleMouseDown = (_e: any) => {
    const offsetX = _e.clientX - position.x;
    const offsetY = _e.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY })
    onDragStart()
  }

  if (disable) {
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
        backgroundColor: catalystImgColors[catIndex],
        // backgroundImage: `url(${catalystDisabled})`
      }}
    >
      {/* <img
        width={width}
        height={height}
        src={catalystDisabled}
      /> */}
    </div>
  }
  return <div
    className={`${styles.catalystItem} ${styles.active}`}
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
    onClick={() => onClick?.()}
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

  // console.log({ elementType })

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