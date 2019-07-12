// pages/bookDetail/bookDetail.js
import {
  bookmodel
} from "../../models/bookModel.js";
const bookModel = new bookmodel();
import {
  likemodel
}
from "../../models/likeModel.js";
const likeModel = new likemodel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookDetail: {},
    shortComment: [],
    likeNum: 0,
    likeStatus: 0,
    bookId: 0,
    maskFlag: false,
    commentValue: '',
    shareBtnImg: "/images/icon/share.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    wx.showLoading();
    const bookId = options.id;
    this.setData({
      bookId
    })

    const bookDetail = bookModel.getBookDetail(bookId);
    const shortComment = bookModel.getShortComment(bookId);
    const likeData = bookModel.getBookFavor(bookId);
    Promise.all([bookDetail, shortComment, likeData])
      .then(res => {
        this.setData({
          bookDetail: res[0],
          shortComment: res[1].comments,
          likeNum: res[2].fav_nums,
          likeStatus: res[2].like_status
        })
        wx.hideLoading();
      })

    // bookModel.getBookDetail(bookId).then((data) => {
    //   this.setData({
    //     bookDetail: data,
    //   })
    // })
    // bookModel.getShortComment(bookId).then((data) => {
    //   this.setData({
    //     shortComment: data.comments
    //   })
    // })
    // bookModel.getBookFavor(bookId).then((data) => {
    //   this.setData({
    //     likeNum: data.fav_nums,
    //     likeStatus: data.like_status
    //   })
    // })
  },
  updateLikeStatus(e) {
    let likeBehavior = e.detail.likeBehavior;
    likeModel.likeBehavior(400, this.data.bookId, likeBehavior, this._showToast(likeBehavior));
  },
  _showToast(likeBehavior) {
    wx.showToast({
      title: likeBehavior == 'like' ? '点赞成功' : '取消点赞',
    })
  },
  addComment() {
    this.setData({
      maskFlag: true
    })
  },
  cancelComment() {
    this.setData({
      maskFlag: false
    })
  },
  async submitComment(e) {
    let content = e.detail.value || e.detail.content
    if (content.length > 12) {
      wx.showToast({
        title: '评论不可超过12个字',
        icon: 'none'
      })
      return
    }
    const addCommentData = await bookModel.addComment(this.data.bookId, content);
    if (addCommentData.error_code == 0) {
      wx.showToast({
        title: '评论提交成功',
      })
    }
    this._addTag(content);
  },
  _addTag(content) {
    let addTag = {
      content,
      nums: 1
    }
    this.data.shortComment.unshift(addTag)
    this.setData({
      commentValue:'',
      maskFlag: false,
      shortComment: this.data.shortComment
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})