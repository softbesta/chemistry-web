
// This function converts array item values from 'value' into '!value'
//    change given count of random items.
// arr: example - [true, true, true, true, false, true]
// count: array item count to be converted.
// value: array item value to be converted.
// count = 2, value = true, then result : example - [false, true, true, false, false, true]
export const generateEnergyArray = (arr: any, count: any, value: boolean = true) => {
  const arrNum: number[] = []
  const res = [...arr]
  let originCount = 0
  res.forEach((item, index) => {
    if (item === true) {
      originCount++
    }
  })

  const updateCount = count - originCount
  // updatedArrIndexes: variable for debug purpose.
  const updatedArrIndexes: number[] = []

  if (updateCount < 0) {
    res.forEach((item, index) => {
      if (item === true) {
        arrNum.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrNum.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrNum.length)
      const n = arrNum.splice(rand, 1)[0]
      res[n] = false
      updatedArrIndexes.push(n)
    })
  } else if (updateCount > 0) {
    res.forEach((item, index) => {
      if (item === false) {
        arrNum.push(index)
      }
    })

    Array(Math.abs(updateCount)).fill(0).forEach(() => {
      if (arrNum.length <= 0) return
      // rand: array's index number to be updated.
      const rand = Math.floor(Math.random() * arrNum.length)
      const n = arrNum.splice(rand, 1)[0]
      res[n] = true
      updatedArrIndexes.push(n)
    })
  }

  updatedArrIndexes.sort((a, b) => a - b)
  console.log({ updatedArrIndexes })
  return res
}
