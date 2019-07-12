// component/episode/index2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    index: {
      type: String
      // 第一种方法，第二次传进来的newVal会断路，不会触动无线递归
      // observer: function(newVal) {
      //   newVal.length < 2 && this.setData({
      //     index: '0' + newVal
      //   })
      // }
      
      // 第二种方法，不使用observer，对传进来的值使用wxs
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached() {

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})