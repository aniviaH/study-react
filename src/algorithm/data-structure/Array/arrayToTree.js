const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 7, name: '部门7', pid: 6 },
]
// const res = flatToTreeByRecursive(arr)
// const res = flatToTreeByRecursive2(arr)
const res = flatToTreeByOneLine(arr, 0)
// const res = flatToTreeByMap(arr)
// const res = flatToTreeByMapAndUptimize(arr)
console.log(JSON.stringify(res, null, 4))
// 递归写法1
function flatToTreeByRecursive(arr) {
  const top = arr.find((item) => item.pid === 0)
  top.children = []
  const recursive = (arr, parent) => {
    arr.forEach((item) => {
      if (item.pid === parent.id) {
        parent.children.push(item)
        item.children = []
        recursive(arr, item)
      }
    })
  }
  recursive(arr, top)
  return top
}
function recursive(arr, parent) {}
// 递归写法2
function flatToTreeByRecursive2(arr) {
  const res = []
  const rootId = 0
  getChildren(arr, res, rootId)
  return res
}
function getChildren(arr, res, pid) {
  arr.forEach((item) => {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] }
      res.push(newItem)
      getChildren(arr, newItem.children, item.id)
    }
  })
}
// 使用Map和对象引用
function flatToTreeByMap(arr) {
  const res = []
  const map = new Map()
  for (const item of arr) {
    const id = item.id
    map.set(id, {
      ...item,
      children: [],
    })
  }
  for (const item of arr) {
    const id = item.id
    const pid = item.pid
    const treeItem = map.get(id)
    if (pid === 0) {
      res.push(treeItem)
    } else {
      if (!map.has(pid)) {
        map.set(pid, {
          children: [],
        })
      }
      map.get(pid).children.push(treeItem)
    }
  }
  return res
}
// 使用Map和对象引用 - 优化循环
function flatToTreeByMapAndUptimize(arr) {
  const res = []
  const map = new Map()
  // 这层for循环可以放到下面的循环里一起做
  // for (const item of arr) {
  //   const id = item.id
  //   map.set(id, {
  //     ...item,
  //     children: []
  //   })
  // }
  for (const item of arr) {
    const id = item.id
    map.set(id, {
      ...item,
      children: [],
    })
    const pid = item.pid
    const treeItem = map.get(id)
    if (pid === 0) {
      res.push(treeItem)
    } else {
      if (!map.has(pid)) {
        map.set(pid, {
          children: [],
        })
      }
      map.get(pid).children.push(treeItem)
    }
  }
  return res
}
// 一行代码
function flatToTreeByOneLine(arr, pid) {
  return arr
    .filter((item) => item.pid === pid)
    .map((item) => ({ ...item, children: flatToTreeByOneLine(arr, item.id) }))
}
export {}
