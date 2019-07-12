// component/navi/index2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   subTitle:String,
    isLast:Boolean,
    isFirst:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchLeft(){
      let naviBehavior={
        behavior:"next"
      }
      this.triggerEvent('switchNavi',naviBehavior,{})
    },
    switchRight(){
      let naviBehavior={
        behavior:"previous"
      }
      this.triggerEvent('switchNavi',naviBehavior,{})
    }
  }
})
