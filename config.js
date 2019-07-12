const httpData={
  "appurl": "http://bl.7yue.pro/v1",
  "appkey": "oJJfnv6dn72IOdpm"
}

// verifyToken Test
const verify=()=>{
  let token=wx.getStorageSync("token");
  if(token){
    return token
  }else{
     wx.showModal({
       title: '登录时效过期，请先去登录',
       confirmText:"去登陆",
       success:(res)=>{
         setTimeout(()=>{
           wx.switchTab({
             url: '/pages/my/my',
           })
         },500)
       },
       fail:()=>{
         console.log("用户拒绝")
       }
     })
    
  }
}

export {httpData,verify}