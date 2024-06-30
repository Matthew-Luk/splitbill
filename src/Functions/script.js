export function addNameToList(arr, name) {
  if(arr.includes(name)) {
    return `${capitalize(name)} already exists in the list.`
  }
  if(arr.length >= 10){
    return "Limit 10 People."
  }
  if(name.length < 3){
    return "Name must be at least 3 characters."
  }
  return true
}

export function capitalize(e){
  if(e !== undefined){
    return e[0].toUpperCase() + e.slice(1)
  }
}