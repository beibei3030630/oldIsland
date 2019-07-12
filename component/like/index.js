// component/like/index2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeStatus: Boolean,
    likeNum: {
      type: Number
    },
    readOnly:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: "./images/like.png",
    notLike: "./images/notLike.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      if (this.data.readOnly) return
      let likeNum = this.data.likeNum,
        likeStatus = this.data.likeStatus;
      likeNum = likeStatus ? likeNum - 1 : likeNum + 1;
      this._triggerLike(likeStatus)
      this.setData({
        likeStatus: !likeStatus,
        likeNum: likeNum
      })
    },
    _triggerLike(likeStatus) {
      let likeBehavior = likeStatus ? 'cancel' : 'like';
      this.triggerEvent("like", {
        likeBehavior
      }, {})
    }
  }
})