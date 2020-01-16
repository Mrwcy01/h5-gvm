/**
 * Del null
 * @param {Object} data
 * @returns {Object}
 */
export function delNull(obj, array = [null, undefined], isNullArray = false) {
  var object = JSON.parse(JSON.stringify(obj))
  for (const key in object) {
    if (array.includes(object[key]) || (isNullArray && Array.isArray(object[key])) && object[key].length === 0) {
      delete object[key]
    }
  }
  return object
}
