// pages/classic/classic.js
import {
  classicmodel
} from "../../models/classicModel.js";
let classicModel = new classicmodel();
import {
  likemodel
} from "../../models/likeModel.js";
let likeModel = new likemodel();
import {
  formatMonth,
  formatYear
} from "../../utils/formatTime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeData: {},
    episodeIndex: 0,
    dailyData: {},
    dailyId: 0,
    dailyType: 0,
    isLast: true,
    isFirst: false,
    shareBtnImg: "/images/icon/share.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    try {
      const data = await classicModel.getLast()
      this.processData(data);
    } catch (err) {
      console.log(err)
    }
  },
  // 更新期刊内容
  processData(data) {
    console.log(data)
    let currentDate = new Date(),
      month = formatMonth(currentDate),
      year = formatYear(currentDate);
    this.setData({
      likeData: {
        likeStatus: data.like_status,
        likeNum: data.fav_nums
      },
      episodeIndex: data.index,
      dailyData: data,
      dailyType: data.type,
      dailyId: data.id,
      isFirst: classicModel.isFirst(data.index),
      isLast: classicModel.isLast(data.index)
    })
  },
  // 导航
  async switchNavi(e) {
    let naviBehavior = e.detail.behavior,
      index = this.data.episodeIndex;
    try {
      const data = await classicModel.switchNavi(index, naviBehavior)
      this.processData(data)
      this._getLikeData()
    } catch (err) {
      //The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.
      // 会返回创建时promise时的 reject里的信息
      console.log(err)
    }
  },
  // 得到切换页面后的点赞信息
  async _getLikeData() {
    const data = await likeModel.getLikeData(this.data.dailyType, this.data.dailyId)
    this.setData({
      likeData: {
        likeStatus: data.like_status,
        likeNum: data.fav_nums
      }
    })
  },
  // 点赞，取消点赞
  onLike(e) {
    let likeBehavior = e.detail.likeBehavior;
    likeModel.likeBehavior(this.data.dailyType, this.data.dailyId, likeBehavior);
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