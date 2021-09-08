/*
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:58
 * @LastEditTime: 2021-09-08 10:45:22
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\http\api.js
 */
import qs from 'qs';
import { apiAxios} from "./request.js";


// const trahs = (params) => {
//   return apiAxios({
//     method: 'get',
//     url: "api/lajifl",
//     params,
//     loading: '查询中'
//   })
// }
// const slang = () => {
//   return apiAxios({
//     method: 'post',
//     url: 'api/dujitang',
//     data: qs.stringify({
//       apiKey: 'f9951161274ac6a4361ccb639f1106b2'
//     })
//   })
// }

const choiceMode = (params) => {
  return apiAxios({
    method: 'get',
    url: "score/getChoiceMode",
    params,
  })
}
const reportCountByProvince = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report/getReportCountByProvince",
    params,
    loading: '查询中'
  })
}

const reportUnivPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report/getReportUnivPage",
    params,
  })
}

const reportMajorPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report/getReportMajorPage",
    params,
    loading: '查询中'
  })
}

const reportCityPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report/getReportCityPage",
    params,
    loading: '查询中'
  })
}

const reportCityOuterPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report/getReportCityOuterPage",
    params,
    loading: '查询中'
  })
}

const reportSameCountByProvince = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_same/getReportSameCountByProvince",
    params,
    loading: '查询中'
  })
}
const reportSameUnivPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_same/getReportSameUnivPage",
    params,
  })
}
const reportSameMajorPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_same/getReportSameMajorPage",
    params,
  })
}
const reportSameCityPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_same/getReportSameCityPage",
    params,
    loading: '查询中'
  })
}
const reportSameCityOuterPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_same/getReportSameCityOuterPage",
    params,
    loading: '查询中'
  })
}

const reporAllCount = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_all/getReportAllCount",
    params,
    loading: '查询中'
  })
}
const reportAllCityUnivPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_all/getReportAllUnivPage",
    params,
  })
}
const reportAllCityMajorPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_all/getReportAllMajorPage",
    params,
  })
}
const reportAllProvincePage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_all/getReportAllProvincePage",
    params,
    loading: '查询中'
  })
}
const reportAllCityPage = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_report_all/getReportAllCityPage",
    params,
    loading: '查询中'
  })
}

const univLevel = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_comm/geUnivLevel",
    params,
    loading: '查询中'
  })
}
const univType = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_comm/getUnivType",
    params,
    loading: '查询中'
  })
}
// eol_comm/getMajorType
const majorType = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_comm/getMajorType",
    params,
    loading: '查询中'
  })
}
const MajorClassType = (params) => {
  return apiAxios({
    method: 'get',
    url: "eol_comm/getMajorClassType",
    params,
    loading: '查询中'
  })
}
const getRank = (params) => {
  return apiAxios({
    method: 'get',
    url: "common/getRank",
    params,
  })
}
export {
  choiceMode,
  reportCountByProvince,
  reportUnivPage,
  reportMajorPage,
  reportCityPage,
  reportCityOuterPage,
  reportSameCountByProvince,
  reportSameUnivPage,
  reportSameMajorPage,
  reportSameCityPage,
  reportSameCityOuterPage,
  reporAllCount,
  reportAllCityUnivPage,
  reportAllCityMajorPage,
  reportAllProvincePage,
  reportAllCityPage,
  univLevel,
  univType,
  majorType,
  MajorClassType,
  getRank
}
