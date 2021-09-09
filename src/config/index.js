/*
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 09:55:47
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\config\index.js
 */


//根据环境引入不同配置 process.env.VUE_APP_ENV
const environment = process.env.VUE_APP_ENV || 'development'
const config = require('./env.' + environment)
module.exports = config
