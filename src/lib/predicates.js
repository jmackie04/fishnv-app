export const isArray = val => {
  return Array.isArray(val)
}

export const isObject = val => {
  return val != null && typeof val === 'object' && !isArray(val)
}


export const isString = val => {
  return typeof val === 'string'
}

export const isEmpty = val => { 
  if (val === null) {
    return true
  }

  if (isString(val) && val === '') {
    return true
  }

  if (isObject(val) && Object.keys(val).length === 0) {
    return true
  }

  if (isArray(val) && val.length === 0 ) {
    return true
  }

  return false
}

export const contains = (a, b) => {
  return a.filter(f => b.includes(f)).length > 0
}
