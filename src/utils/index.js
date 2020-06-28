/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function getLocalStorage(_this, obj) {
  let data = JSON.parse(localStorage.getItem(obj));
  if (data) {
    let key = Object.keys(data);
    let val = Object.values(data);

    for (let i = 0; i < key.length; i++) {
      _this[key[i]] = val[i]
    }
  }
}