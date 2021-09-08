/*
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:57
 * @LastEditTime: 2021-09-01 17:56:03
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\config\env.development.js
 */
/**本地环境配置
 * axios 0.18.1以后的版本不支持自定义属性  这里需要修改 axios源码 mergeConfig.js 第25行
 */
module.exports = {
  title: '2021高考志愿大数据分析-省榜--测试',
  
  baseURL: 'https://apizy.eol.cn/niuzy/', // 项目地址
  time: 6000, // 请求持续时间
  retry: 2, // 请求次数
  retryDelay: 1000, // 请求间隙

  APPID: 'xxx',
  APPSECRET: 'xxx',
  redirect: '',

  $cdn: 'https://s3.ax1x.com' // css cdn图片前缀
}