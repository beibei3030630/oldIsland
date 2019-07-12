import {
  httpData
} from "../config.js";
const errorCode = {
  1: "请检查网络",
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
class http{
  getData(param){
    return new Promise((resolve,reject)=>{
      const that=this
      wx.request({
        url: httpData.appurl+param.url,
        header:{
          "content-type":'application/json',
          "appkey": httpData.appkey
        },
        method:param.method||'get',
        data:param.data,
        success:(res)=>{
          if(String(res.statusCode).startsWith("2")){
            resolve(res.data);
          }else{
            reject(res.data.msg)
            that._showError(res.data.error_code)
          }
        },
        fail:(error)=>{
          reject(error);
          that._showError();
        }
      })
    })
  }
  
  _showError(code){
    let errorCodeTip=errorCode[code]?errorCode[code]:errorCode[1];
    wx.showToast({
      title: errorCodeTip,
      icon:"none",
      duration:1500
    })
  }
}
export{http}