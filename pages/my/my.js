// pages/my/my.js
import {
  classicmodel
}
from "../../models/classicModel.js";
import {
  bookmodel
} from "../../models/bookModel.js"
import {
  promisic
} from "../../utils/common.js"
const classicModel = new classicmodel();
const bookModel = new bookmodel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbnailList: [],
    bookNum: 0,
    userInfoFlag: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.userAuthorized();
    //this.userAuthorized1();
    this.userAuthorized2();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const favorData = await classicModel.getMyFavor()
    this.setData({
      thumbnailList: favorData
    })

    const bookData = await bookModel.getMYBook()
    this.setData({
      bookNum: bookData.count
    })

  },
  // 弹出授权登录框 
  // 第一种写法
  // getUserInfo(e) {
  //   // 这里不用判断，用户对弹框是拒绝还是允许，后面调用的wx.getUserInfo会做判断
  //   this.getInfoDetail();
  // },

  //第二种写法 老师的写法
  getUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfoFlag: true,
        userInfo
      })
    }
  },


  // 查看是否授权登陆
  // userAuthorized() {
  //   wx.getSetting({
  //     success: (res) => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 授权登录后获取用户信息
  //         wx.getUserInfo({
  //           success: (data) => {
  //             this.setData({
  //               userInfoFlag: true,
  //               userInfo: data.userInfo
  //             })
  //           }
  //         })
  //       } else {
  //         wx.showToast({
  //           title: '点击登录框登录哦',
  //           icon: "none",
  //           duration: 1500
  //         })
  //       }
  //     }
  //   })
  // },

  // 用promise方法查看是否授权登陆
  // userAuthorized1() {
  //   promisic(wx.getSetting)()
  //     .then(res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         return promisic(wx.getUserInfo)()
  //       } else {
  //         wx.showToast({
  //           title: '点击登录框登录哦',
  //           icon: "none",
  //           duration: 1500
  //         })
  //       }
  //     })
  //     .then(data => {
  //       if (!data) return
  //       this.setData({
  //         userInfoFlag: true,
  //         userInfo: data.userInfo
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })//这里的catch可以同时去捕获两个promise的错误。
  // },


  // 用async await方法查看是否授权登陆
  async userAuthorized2() {
    const res = await promisic(wx.getSetting)();
    if (res.authSetting['scope.userInfo']) {
      const data = await promisic(wx.getUserInfo)();
      this.setData({
        userInfoFlag: true,
        userInfo: data.userInfo
      })
    } else {
      wx.showToast({
        title: '点击登录框登录哦',
        icon: "none",
        duration: 1500
      })
    }
  },


  // 前往期刊详情
  toClassicDetail(e) {
    const classicId = e.detail.classicId,
      classicType = e.detail.classicType;
    wx.navigateTo({
      url: '../myDetail/myDetail?id=' + classicId + '&type=' + classicType
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})