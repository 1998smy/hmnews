// 时间处理函数
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import "dayjs/locale/zh-cn"

export const timeAgo = (targetTime) => {
  // 格式化时间
  dayjs.extend(relativeTime)
  // dayjs输入默认是英文，加载本地化语言
  dayjs.locale("zh-cn")
  // 获取当前时间
  var a = dayjs()
  // 处理 目标时间
  var b = dayjs(targetTime)
  // 返回 实例b 到 当前时间 a 的相对时间
  return a.to(b)
}