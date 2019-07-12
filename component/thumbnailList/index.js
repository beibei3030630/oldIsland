// component/thumbnail/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    thumbnailList: {
      type: Array,
      observer: function(newVal) {
        if (newVal) {
          newVal.map(function(item) {
            const typeText = {
              100: "电影",
              200: "音乐",
              300: "诗句"
            }
            item.typeText = typeText[item.type]
          })
          this.setData({
            newDataArr:newVal
          })
        }

      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    newDataArr:[]
  },
  lifetimes: {
    attached() {}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toClassicDetail(e) {
      const classicType = e.currentTarget.dataset.classicType,
        classicId = e.currentTarget.dataset.classicId;
      this.triggerEvent("toClassicDetail", {
        classicType,
        classicId
      }, {})
    }
  }
})