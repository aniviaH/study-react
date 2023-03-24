import { useState, useCallback, useTransition } from 'react'

export default function TransitionCase() {
  const [inputValue, setInputValue] = useState('')
  const [recommendList, setRecommendList] = useState([]) // 啥推荐都没有
  const [isPending, startTransition] = useTransition()

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value)
    // 很多时候 往往我们在设置完inputValue的值以后 会做一些额外的事情【比如搜索框输入完，显示搜索推荐结果列表】
    // 注册用户名 会有格式限制 那这个我们会先到本地校验一次这个用户名是否合法
    // 为啥要在本地校验 对 后端也会给你校验
    // 因为你本地校验了 就不用产生额外的网络请求了 后端为什么要做校验 【后端一定要做的 但是不是为了你前端服务的】
    // 后端做校验 是为了别人绕过前端直接请求他的API 是为了数据的安全性和完整性 postman

    // 那我们有一个需求 就是本地校验完如果不合法 那么我们就推荐给他几个合法的用户名
    // 那这些合法的用户名都是要经过运算

    // 我们默认他永远不合格
    // 生成推荐数据

    // 假设一个点：我们的生成推荐数据这个运算要500ms
    // generateRecommendList()
    // 转为transition任务  setInputValue的优先级就不会被抢了
    startTransition(() => {
      generateRecommendList()
    })

    function generateRecommendList() {
      console.log(event.target.value)

      const innerRecommendList = []
      for (let i = 0; i < 8000; i++) {
        innerRecommendList.push(`${event.target.value}_${i}_recommend`)
      }
      setRecommendList(innerRecommendList)
    }
  }, [])

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />

      {isPending ? (
        <div>正在计算中...</div>
      ) : (
        recommendList.map((item) => <div key={item}>{item}</div>)
      )}
    </div>
  )
}
