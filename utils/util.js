const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 请求http数据
import {
  httpData
} from "../config.js"
const errorCode = {
  1:"请检查网络",
  1000: "输入参数错误",
  1001: "输入的json格式不正确",
  1002: "找不到资源",
  1003: "未知错误",
  1004: "禁止访问",
  1005: "不正确的开发者key",
  1006: "服务器内错误",
  2000: "你已经点过赞了",
  2001: "你还没点过赞",
  3000: "该期内容不存在"
}
class http {
  getData(params) {
    wx.request({
      url: httpData.appurl + params.url,
      header: {
        "Content-type": "application/json",
        "appkey": httpData.appkey
      },
      method: params.method || 'get',
      data: params.data || "",
      success: (res) => {
        if (String(res.statusCode).startsWith("2")) {
          params.success && params.success(res.data)
        } else {
         this._throwError(res.data.error_code);
        }
      },
      fail: (error) => {
        this._throwError()
      }
    })       
  }
  _throwError(code){
    const errorCodeTip = errorCode[code];
    wx.showToast({
      title: errorCodeTip?errorCodeTip:errorCode[1],
      icon:"none",
      duration:1500
    })
  }
}


export {
  formatTime,
  http
}