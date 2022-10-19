/**
 * 转换高亮文字的方法
 * @param {*} str 要被处理的字符串
 * @param {*} target 要匹配关键字
 * @returns 处理后带标签高亮的方法
 */
export const strLight = function (str, target) {
  const reg = new RegExp(target, 'ig')
  return str.replace(reg, (val) => {
    return `<span style="color:red">${val}</span>`
  })
}