// component/bookList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookList:Array
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
    toBookDetail(e){
      const bookId=e.currentTarget.dataset.bookId;
      this.triggerEvent("toBookDetail", {bookId},{})
    }
  }
})
