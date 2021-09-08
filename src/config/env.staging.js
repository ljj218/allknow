/*
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:57
 * @LastEditTime: 2021-09-01 17:56:49
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\config\env.staging.js
 */
// 预发布环境
module.exports = {
  title: '2021高考志愿大数据分析-测试版',

  baseURL: 'https://apizy.eol.cn/niuzy/', // 项目地址
  time: 6000, // 请求持续时间
  retry: 2, // 请求次数
  retryDelay: 1000, // 请求间隙

  APPID: 'xxx',
  APPSECRET: 'xxx',
  redirect: '',

  $cdn: 'https://s3.ax1x.com' // css cdn图片前缀
}