export function getResults(state) {
  return state.filtered || state.venues
}

// export function compareArrays(arr1, arr2) {
//   return arr1.some((el, i) => el & arr2[i])
// }

export function findName(arr, id) {
  return arr.find(el => {
    return el._id === id});
}

export function compareArrays(tmplt, arr) {
  let result = 1
  tmplt.forEach((el, i) => {
    if (el && !arr[i]) result = 0;
  
  });
  return result > 0
 }

 export function compareOptions(tmplt, options) {
  let keys = Object.keys(tmplt);
  let result = 1;
  keys.forEach(el => {
    if (tmplt[el] && !options[el]) result = 0;
  });
  return result > 0;
 }
