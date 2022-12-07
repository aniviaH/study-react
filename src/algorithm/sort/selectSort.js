import { swap, printArr } from './utils/index.js'

export function mainSelectSort() {
  const arr = [1, 5, 2, 4, 6, 3, 8, 6, 5, 3, 8, 9, 1]

  console.log('排序前arr: ', printArr(arr))
  selectSort(arr)
  console.log('排序后arr: ', printArr(arr))
}

// 选择排序
// 0 ~ N-1 找出最小值放到 0 位置
// 1 ~ N-1 找出最小值放到 1 位置
// 2 ~ N-1 找出最小值放到 2 位置
// ...
// N-1 ~ N-1
function selectSort(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0 ~ N-1
  // 1 ~ N-1
  // 2 ~ N-1
  // i ~ N-1
  const N = arr.length
  for (let i = 0; i < N; i++) {
    let minValueIndex = i
    // 从i开始找最小值的下标
    for (let j = i + 1; j < N; j++) {
      minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex
      // !!!易错点：比较的数：arr[j] 和 arr[minValueIndex] , 且最新最小值下标取 j 或 minValueIndex
    }
    swap(arr, i, minValueIndex)
  }
}
