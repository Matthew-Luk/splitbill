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