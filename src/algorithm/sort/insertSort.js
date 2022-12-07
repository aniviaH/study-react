import { swap, printArr } from './utils/index.js'

export function mainInsertSort() {
  const arr = [1, 5, 2, 4, 5, 6, 2, 6, 7, 9, 2, 5, 2, 5]

  console.log('排序前arr: ', printArr(arr))
  insertSort(arr)
  // insertSort2(arr)
  console.log('排序后arr: ', printArr(arr))
}

// 插入排序 -> 0-0 0-1 0-2 0-3 ... 依次保证有序
// [1, 5, 2, 4, 5, 6, 2, 6, 7, 9, 2, 5, 2, 5]
// 0 ~ 0 不用处理
// 0 ~ 1 取最后一个数，判断左边的数是否比它大，如果是，交换两个的位置，最后一个数取前一个数据
// 0 ~ 2 取最后一个数，判断左边的数是否比它大，如果是，交换两个的位置，最后一个数取前一个数据
// 1 5 2
// 1 5 2
//     ^
//     |
//     newNumIndex
// 1 2 5
//     newNumIndex--
//   ^
//   |
//   newNumIndex
function insertSort(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0 ~ 0 不用处理
  // 0 ~ 1 保证有序，一开始取位置1的数据
  // 0 ~ 2 保证有序，一开始取位置2的数据
  // 0 ~ 3 保证有序，一开始取位置3的数据
  const N = arr.length
  for (let end = 1; end < N; end++) {
    let newNumIndex = end
    while (newNumIndex - 1 >= 0 && arr[newNumIndex - 1] > arr[newNumIndex]) {
      // 左边没有数 && 左边大于右边
      swap(arr, newNumIndex - 1, newNumIndex)
      // 选择的数左移
      newNumIndex--
    }
  }
}

function insertSort2(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0 ~ 0 不用处理
  // 0 ~ 1 保证有序，一开始取位置1的数据
  // 0 ~ 2 保证有序，一开始取位置2的数据
  // 0 ~ 3 保证有序，一开始取位置3的数据
  const N = arr.length
  for (let end = 1; end < N; end++) {
    for (
      let newNumIndex = end;
      newNumIndex - 1 >= 0 && arr[newNumIndex - 1] > arr[newNumIndex];
      newNumIndex--
    ) {
      swap(arr, newNumIndex - 1, newNumIndex)
    }
  }
}
