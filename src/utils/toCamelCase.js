export default function toCamelCase(objectInput) {
  // copy object
  let returnNewObject = objectInput

  // check is value valid.
  if (!returnNewObject) {
    return returnNewObject
  }
  // value is a object
  else if (typeof objectInput === 'object') {
    // if current object an array, re-call toCamelCase function.
    if (objectInput instanceof Array) {
      returnNewObject = objectInput.map(toCamelCase)
    }
    // if not an array
    else {
      returnNewObject = {}
      for (let key in objectInput) {
        // if key has on object
        if (objectInput.hasOwnProperty(key)) {
          // remove snake case and uppercase first letter beside snake case
          const newKey = key.replace(/(_\w)/g, k => k[1].toUpperCase())
          // convert nested object to camel case
          returnNewObject[newKey] = toCamelCase(objectInput[key])
        }
      }
    }
  }

  // all keys are camel case
  return returnNewObject
}
