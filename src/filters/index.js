/*
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 09:55:54
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\filters\index.js
 */

/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
export function formatDate(time, fmt) {
  if (time === undefined || '') {
    return
  }
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 超过一万 换算
 */
 export function formatNum(num) {
  var maxnum=10000;
   if(num<maxnum) return num;
   return (num/maxnum).toFixed(1);
}