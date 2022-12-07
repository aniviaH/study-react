import { swap, printArr } from './utils/index.js'

export function mainBubbleSort() {
  const arr = [1, 5, 2, 4, 6, 3, 8, 6, 5, 3, 8, 9, 1]

  console.log('排序前arr: ', printArr(arr))
  bubbleSort(arr)
  console.log('排序后arr: ', printArr(arr))
}

// 冒泡排序
// [1, 5, 2, 4, 6, 3, 8, 6, 5, 3, 8, 9, 1]
//  0  1  2  3  4  5  6  7  8  9  10 11 12
// 0,1 1,2 2,3 3,4 ... n-1,n 两两比较，谁大谁放后，每一轮操作之后，最大值会来到最后
//  _  _
// [1, 5, 2]
//     _  _
// [1, 2, 5, 4]
//        _  _
// [1, 2, 4, 5, 6]
//           _  _
// [1, 2, 4, 5, 6, 3]
//              _  _
// [1, 2, 4, 5, 3, 6]
// ...
// 第2轮
// 第3轮
function bubbleSort(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0 ~ N-1 两两比较(最后1个确定了)
  // 0 ~ N-2 两两比较(最后2个确定了)
  // 0 ~ N-3 两两比较(最后3个确定了)
  const N = arr.length
  for (let end = N - 1; end >= 0; end--) {
    for (let second = 1; second <= end; second++) {
      // 0 ~ end 两两比较
      // 0 1  1 2  2 3  3 4  end-1 end
      // second 为两两比较的第二个数
      // !!!易错点：最后判断包含等号second <= end
      if (arr[second - 1] > arr[second]) {
        swap(arr, second - 1, second)
      }
    }
  }
}
