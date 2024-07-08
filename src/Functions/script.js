export function validate(arr, name) {
  if (name === "") {
    return
  }
  for (let i of arr) {
    if (i.name === name) {
      return `${capitalize(name)} already exists in the list.`
    }
  }
  if (arr.length >= 10) {
    return "Limit 10 People."
  }
  if (name.length < 3) {
    return "Name must be at least 3 characters."
  }
  return true
}

export function capitalize(e) {
  if (e !== undefined) {
    return e[0].toUpperCase() + e.slice(1)
  }
}

export function convert(index, name) {
  let map = {
    id: index,
    name: name,
    debt: {}
  }
  for (let i = 1; i < 11; i++) {
    if (i !== index) {
      map.debt[i] = 0
    }
  }
  return map
}

export function listOfNames(e) {
  if (e.length === 1) {
    return capitalize(e[0])
  } else if (e.length === 2) {
    return `${capitalize(e[0])} & ${capitalize(e[1])}`
  } else {
    let arr = []
    for (let i = 0; i < e.length; i++) {
      if (i === e.length - 1) {
        arr.push(`& ${capitalize(e[i])}`)
      } else if (i === e.length - 2) {
        arr.push(capitalize(e[i]))
      } else {
        arr.push(`${capitalize(e[i])},`)
      }
    }
    return arr.join(" ")
  }
}

export function convertNumToName(namelist, numlist, index = 11) {
  numlist = parseIntList(numlist)
  let names = new Set()
  if (numlist.includes(index)) {
    for (let i of namelist) {
      names.add(capitalize(i.name))
    }
  } else {
    for (let i of numlist) {
      names.add(capitalize(namelist[i - 1].name))
    }
  }
  names = Array.from(names)
  return names
}

export function convertNamesToNum(namelist, names) {
  names = names.map(name => name.toLowerCase())
  let indexes = []
  for (let i of namelist) {
    if (names.includes(i.name)) {
      indexes.push(i.id)
    }
  }
  return indexes
}

export function parseIntList(nums) {
  return nums.map(function (x) {
    return parseInt(x, 10)
  })
}

export function deleteFromList(deleteValue, arr, setArr) {
  const newList = arr.filter((item) => {
    return item !== deleteValue
  })
  setArr([...newList])
}

export function calculateTotalEvenly(namelist, paylist, owelist, total) {
  total = Math.round((total / owelist.length) * 100) / 100
  total = Math.round((total / paylist.length) * 100) / 100
  paylist = parseIntList(paylist)
  console.log(namelist, paylist, owelist, total)
  for (let i of namelist) {
    if (paylist.includes(i.id)) {
      for (let j of owelist) {
        if (i.id !== j) {
          i.debt[j] = i.debt[j] + total
        }
      }
    }
  }
  return namelist
}


// const deleteHandler = (deleteValue, arr, setArr) => {
//   const newList = arr.filter((item) => {
//     return item !== deleteValue
//   })
//   setArr([...newList])
// }