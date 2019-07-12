// component/search/index.js
import {
  searchmodel
} from "../../models/search.js";
import {
  keymodel
} from "../../models/key.js";
import {
  paginationBeh
} from "../behaviors/pagination.js";
const searchModel = new searchmodel();
const keyModel = new keymodel();
Component({
  behaviors: [paginationBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: Boolean,
    loadMore: {
      type: Number,
      value: 0,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotKeyList: [],
    historyList: [],
    searchContent: '',
    searchSuccessPanel: false,
    loadingAnimation: false
  },
  lifetimes: {
    attached() {
      this._getHotKey();
      this._refreshHistoryList();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取热搜关键词
    async _getHotKey() {
      const data = await keyModel.getHotKey()
      this.setData({
        hotKeyList: data.hot
      })
    },
    // 输入框搜索或点击标签进行搜索
    onConfirm(e) {
      let searchContent = e.detail.value || e.detail.content;
      this.setData({
        searchContent
      })
      this._verifyInput(searchContent);
      this._showLoading();
      this._showSearching();
      searchModel.searchBook({
        value: searchContent,
        startNum: 0
      }).then((data) => {
        keyModel.processData(searchContent);
        this._refreshHistoryList();
        this._hideLoading();
        this.getMoreData(data.books);
        this.getTotalNum(data.total);
      })
    },

    _loadMore() {
      if (this.isLocked()) return
      if (!this.hasMore()) {
        this._isNoMoreLoading();
        return
      }
      this.locked();
      searchModel.searchBook({
        value: this.data.searchContent,
        startNum: this.getCurrentNum()
      }).then(data => {
        this.getMoreData(data.books)
        this.unlock();
      }, () => {
        this.unlock();
      })

    },
    onDelete() {
      this._initial();
    },
    onCancel() {
      this._initial();
      this.triggerEvent(
        "cancelSearch", {}, {}
      )
    },
    onClear() {
      wx.showModal({
        content: '确认删除搜索历史记录吗？',
        success: (res) => {
          if (res.confirm) {
            keyModel.clearStorage();
            this._refreshHistoryList();
          }
        }
      })
    },
    //跳转到详情书籍页面
    toBookDetail(e) {
      const bookId = e.detail.bookId;
      wx.navigateTo({
        url: '../../pages/bookDetail/bookDetail?id=' + bookId
      })
    },
    // 刷新历史搜索
    _refreshHistoryList() {
      this.setData({
        historyList: keyModel.getStorage()
      })
    },

    _verifyInput(searchContent) {
      if (searchContent == undefined) {
        wx.showToast({
          title: '输入框不得为空',
          icon: "none"
        })
        return
      }
    },


    _showLoading() {
      this.setData({
        loadingAnimation: true
      })
    },
    _hideLoading() {
      this.setData({
        loadingAnimation: false
      })
    },
    _showSearching() {
      this.setData({
        searchSuccessPanel: true
      })
    },
    _hideSearching() {
      this.setData({
        searchSuccessPanel: false
      })
    },
    _isNoMoreLoading() {
      wx.showToast({
        title: '暂无更多可加载',
        icon: "none",
        duration: 1500
      })
    },
    _initial() {
      this.setData({
        searchContent: '',
        searchSuccessPanel: false,
        searchResult: [],
        loadingAnimation: false,
        noResult: false
      })
    },
  }
})