import {
  http
} from "../utils/util-p.js";
class keyModel extends http {
  key = 'historyList';
  maxlength = 8;
  
  getHotKey() {
    return this.getData({
      url: "/book/hot_keyword"
    })
  }
  getStorage() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return []
    }
    return words;
  }

  processData(val) {
    let historyList = this.getStorage();
    const isKeyExist = historyList.indexOf(val);
    if (isKeyExist == -1) {
      historyList.unshift(val)
    }
    historyList = historyList.slice(0, this.maxlength)
    this._setStorage(historyList);
  }
  _setStorage(storageData) {
    wx.setStorageSync(this.key, storageData)
  }
  clearStorage() {
    wx.setStorageSync(this.key, [])
  }
}
export {
  keyModel as keymodel
}