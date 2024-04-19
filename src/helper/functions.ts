
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

// debug purpose
export const energyBeforeAnimation = (arr: number[], percentage: number, originVal: number = 1) => {
  const res = [...arr]
  res.forEach((item, index) => {
    if (item > 0) res[index] = originVal
  })
  return res
}

export const getItemsRandomlyFromArray = (arr: any[], count?: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  const res = shuffled.slice(0, count ? count : shuffled.length)
  return res
}

// local storage functions
export const getStorage = (key: string) => {
  const res = localStorage.getItem(key)
  if (!res) return
  return JSON.parse(res)
}
export const setStorage = (key: string, val: any) => {
  const update = JSON.stringify(val)
  localStorage.setItem(key, update)
}

export const expressWithClass = (str: string, mark: string, className: string) => {
  const parts = str.split(mark)
  let final = parts[0]
  // console.log('expclass- aaa', { str, mark, parts, final })
  if (parts.length === 1) return final
  for (let i = 1; i < parts.length - 1; i++) {
    if (i % 2 === 1) {
      final += `<span class="${className}">`
    } else {
      final += `</span>`
    }
    // console.log('zzz - ', i, parts[i], final)
    final += parts[i]
  }
  final += `</span>` + parts[parts.length - 1]
  // console.log('expclass- bbb', { final })
  return final
}

export const convertExpToHtml = (exp: string | undefined) => {
  if (!exp) return
  let update = ''
  update = expressWithClass(exp, '__', 'sm-botom')
  update = expressWithClass(update, '^', 'sm-top')
  update = expressWithClass(update, '**', 'txt-red')
  return update
}

