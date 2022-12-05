export function swap(arr, i, j) {
  const tmp = arr[j]
  arr[j] = arr[i]
  arr[i] = tmp
}

export function printArr (arr) {
  return arr.join(' ')
}