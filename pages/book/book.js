// pages/book/book.js
import {
  bookmodel
} from "../../models/bookModel.js";
const bookModel = new bookmodel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    searchFlag: false,
    loadMore: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    try {
      const data = await bookModel.getHotList();
      this.setData({
        bookList: data
      })
    } catch (err) {
      console.log(err)
    }
  },
  // 跳转图书详情
  toBookDetail(e) {
    const bookId = e.detail.bookId;
    wx.navigateTo({
      url: '../bookDetail/bookDetail?id=' + bookId
    })
  },
  // 搜索图书
  searchBook() {
    this.setData({
      searchFlag: true
    })
  },
  // 取消搜索
  cancelSearch() {
    this.setData({
      searchFlag: false
    })
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
    if (!this.data.searchFlag) return
    this.setData({
      loadMore: Math.random() * 10
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})