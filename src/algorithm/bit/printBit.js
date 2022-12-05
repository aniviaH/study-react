// 打印二进制位
export function mainPrintBit () {
  const num = 5
  // 0000 0000 0000 0000 0000 0000 0000 0101


  const res = printBit(num)
  console.log(`+${num}的二进制: ${res}`)

  // 负数：补码+1
  // -5
  // 1111 1111 1111 1111 1111 1111 1111 1010 + 1
  // 1111 1111 1111 1111 1111 1111 1111 1011
  const negNum = ~num + 1
  console.log(`${num}的负数是: ${negNum}`)
  const res2 = printBit(negNum)
  console.log(`${negNum}的二进制: ${res2}`)
}

function printBit (num) {
  // 32位
  // 0000 0000 0000 0000 0000 0000 0000 0000
  // num & (1 << i)
  let bit = ''
  for (let i = 31; i >=0; i--) {
    bit += num & (1 << i) ? '1' : '0'
  }
  return bit
}
