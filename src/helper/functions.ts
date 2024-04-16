
// This function converts array item values from 'value' into '!value'
//    change given count of random items.
// arr: example - [true, true, true, true, false, true]
// count: array item count to be converted.
// value: array item value to be converted.
// count = 2, value = true, then result : example - [false, true, true, false, false, true]
export const generateEnergyArray = (arr: any, percentage: any, originVal: number = 1, toVal: number = 0) => {
  const arrNum: number[] = []
  const res = [...arr]

  // if toVal === 0 then fill other items with originVal(1).
  if (toVal === 0) {
    res.forEach((item, index) => {
      if (item > 1) {
        res[index] = originVal
      }
    })
  }

  let toCount = 0
  let originCount = 0
  res.forEach((item, index) => {
    if (item === originVal) {
      originCount++
    } else if (item === toVal) {
      toCount++
    }
  })
  const totalCount = originCount + toCount
  // console.log({ originCount, toCount, totalCount })
  const expectedCount = Math.floor(totalCount * (percentage / 100))
  // console.log({ percentage, expectedCount })

  const updateCount = expectedCount - originCount
  // const updateCount = count - fromCount

  // updatedArrIndexes: variable for debug purpose.
  const updatedArrIndexes: number[] = []

  if (updateCount < 0) {
    res.forEach((item, index) => {
      if (item === originVal) {
        arrNum.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrNum.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrNum.length)
      const n = arrNum.splice(rand, 1)[0]
      res[n] = toVal
      updatedArrIndexes.push(n)
    })
  } else if (updateCount > 0) {
    res.forEach((item, index) => {
      if (item === toVal) {
        arrNum.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrNum.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrNum.length)
      const n = arrNum.splice(rand, 1)[0]
      res[n] = originVal
      updatedArrIndexes.push(n)
    })
  }

  // updated index Array
  updatedArrIndexes.sort((a, b) => a - b)
  // console.log({ updatedArrIndexes })
  return {
    changedCount: updatedArrIndexes.length,
    items: res
  }
}

export const energyBeforeAnimation = (arr: number[], percentage: number, originVal: number = 1) => {
  const res = [...arr]
  res.forEach((item, index) => {
    if (item > 0) res[index] = originVal
  })
  return res
}
