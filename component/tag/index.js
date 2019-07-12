// component/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String
  },
  externalClasses:['tag-class'],
  /**
   * 组件的初始数据
   */
  data: {

  },
  options: {
    multipleSlots: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapTag(){
      let content=this.data.content;
      this.triggerEvent("tapTag",{content},{})
    }
  }
})