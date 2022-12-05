const bar = 'bar'
if (!!bar) { // 通过 eslint --fix 可进行修复 转为如下
// if (bar) {
  console.log(bar)
}