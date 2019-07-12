// pages/myDetail/myDetail.js
import {
  classicmodel
}
from "../../models/classicModel.js";
import {
  likemodel
}
from "../../models/likeModel.js";
const classicModel = new classicmodel(),
  likeModel = new likemodel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dailyData: [],
    dailyType: 0,
    likeData: {},
    episodeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const classicType = options.type,
      classicId = options.id;
    classicModel.getClassicDetail({
      type: classicType,
      id: classicId
    }).then(data => {
      this.setData({
        dailyData: data,
        dailyType: data.type,
        dailyId: data.id,
        episodeIndex: data.index
      })
    })
    const likeData = await likeModel.getLikeData(classicType, classicId)
    this.setData({
      likeData
    })
  },

  onLike(e) {
    const likeBehavior = e.detail.likeBehavior;
    likeModel.likeBehavior(this.data.dailyType, this.data.dailyId, likeBehavior)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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