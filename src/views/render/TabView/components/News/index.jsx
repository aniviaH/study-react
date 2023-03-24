import { useState } from 'react'
import NewsItem from './NewsItem'

const arr = []

for (let i = 0; i < 500; i++) {
  arr.push(i)
}

export default function News() {
  const [news, setNews] = useState(arr)

  // 列表页 往往都是需要循环 循环必定会生成很多元素 我们最好是将这些元素单独封装成一个组件
  // 同时 单个项大概率不仅仅在当前列表使用，在别的地方也很大可能会使用到

  // 新闻列表 --> 单条新闻
  // 学生列表 --> 单个学生

  return (
    <div>
      {news.map((newDescriptor, index) => (
        <NewsItem key={index} newDescriptor={newDescriptor} />
      ))}
    </div>
  )
}
