function main() {
  const arr = [1, 2, 3, 2, 5, 8, 3, 5, 2, 1]

  console.log('排序前: ', arr.join(' '))

  // 排序
  // 选择排序
  // selectSort(arr)
  // 冒泡排序
  // bubbleSort(arr)
  // 选择排序
  insertSort(arr)

  console.log('排序后: ', arr.join(' '))
}
main()

function selectSort(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0~N-1 找到最小值放在位置0
  // 1~N-1 找到最小值放在位置1
  // 2~N-1 找到最小值放在位置2
  // ...
  // N-1~N-1
  const N = arr.length
  for (let i = 0; i < N; i++) {
    let minValueIndex = i
    for (let j = i + 1; j < N; j++) {
      minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex
    }
    swap(arr, i, minValueIndex)
  }
}

function bubbleSort(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0,1 1,2 2,3 ... 两两比较 较大值放后面 每一轮之后 最大值来到最后
  // 0 ~ N-1
  // 0 ~ N-2
  // 0 ~ N-3
  const N = arr.length
  for (let end = N - 1; end >= 0; end--) {
    for (let second = 1; second <= end; second++) {
      if (arr[second - 1] > arr[second]) {
        swap(arr, second - 1, second)
      }
    }
  }
}

function insertSort(arr) {
  if (!arr || arr.length < 2) {
    return
  }

  // 0 不用处理
  // 0 ~ 1 选取最后数 判断是否比左边大，如果大，与前面数交换。直到左边数据小于当前数据
  // 0 ~ 2
  // 0 ~ 3

  const N = arr.length
  for (let i = 1; i < N; i++) {
    // let newNumIndex = i
    // while (newNumIndex - 1 >= 0 && arr[newNumIndex - 1] > arr[newNumIndex]) {
    //   swap(arr, newNumIndex-1, newNumIndex)
    //   newNumIndex--
    // }

    for (
      let newNumIndex = i;
      newNumIndex - 1 >= 0 && arr[newNumIndex - 1] > arr[newNumIndex];
      newNumIndex--
    ) {
      swap(arr, newNumIndex - 1, newNumIndex)
    }
  }
}

function swap(arr, i, j) {
  const tmp = arr[j]
  arr[j] = arr[i]
  arr[i] = tmp
}
