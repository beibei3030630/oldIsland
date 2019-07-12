import {
  http
} from "../utils/util-p.js";
class classicModel extends http {
  //  使用promise方法，因为在这里要是用getData返回的数据
  //  所以在外部多包一层promise方法。
  // getLast() {
  //   return new Promise((resolve, reject) => {
  //     this.getData({
  //         url: "/classic/latest"
  //       })
  //       .then(
  //         data => {
  //           this._setLastIndex(data.index);
  //           let lastDailyName = this._getDailyName(data.index);
  //           wx.setStorageSync(lastDailyName, data);
  //           resolve(data)
  //         }
  //       )
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // }

  // 与以上的方法相同，使用await可以先把promise resolve的结果返回一个变量
  // 最后可以把变量返回给函数，给之后调用这个函数的函数去处理
  //注意：如果要调用显示错误，相当于调用reject返回的记录。在最后调用的最后一层try catch就可以
  async getLast() {
    const data = await this.getData({
      url: "/classic/latest"
    })
    if (!data.index) return
    this._setLastIndex(data.index);
    const lastDailyName = this._getDailyName(data.index);
    wx.setStorageSync(lastDailyName, data);
    return data
  }



  // switchNavi(index, behavior) {
  //   let dailyName = behavior == 'previous' ? this._getDailyName(index - 1) : this._getDailyName(index + 1),
  //     dailyData = wx.getStorageSync(dailyName);
  //   return new Promise((resolve, reject) => {
  //     if (!dailyData) {
  //       this.getData({
  //           url: behavior == 'previous' ? "/classic/" + index + "/previous" : "/classic/" + index + "/next"
  //         })
  //         .then(data => {
  //           wx.setStorageSync(dailyName, data);
  //           resolve(data)
  //         })
  //         .catch(err => {
  //           reject(err)
  //         })
  //     } else {
  //       resolve(dailyData)
  //     }
  //   })
  // }



  async switchNavi(index, behavior) {
    let dailyName = behavior == 'previous' ? this._getDailyName(index - 1) : this._getDailyName(index + 1),
      dailyData = wx.getStorageSync(dailyName);
    if (!dailyData) {
      const data = await this.getData({
        url: behavior == 'previous' ? "/classic/" + index + "/previous" : "/classic/" + index + "/next"
      })
      wx.setStorageSync(dailyName, data);
      return data;
    } else {
      // await后面也可以跟同步代码： 不过系统会自动将其转化成一个Promsie对象
      //以下代码会转换成 const data=await Promise.resolve(dailyData)
      const data = await dailyData
      return data;
    }
  }




  //获取我喜欢的页面（my页面使用）
  getMyFavor() {
    return this.getData({
      url: "/classic/favor"
    })
  }
  // 获取详细的页面
  getClassicDetail({
    type,
    id
  }) {
    return this.getData({
      url: "/classic/" + type + "/" + id
    })
  }
  // 判断是否为第一个项或最后一项
  isLast(currentIndex) {
    return currentIndex == this._getLastIndex() ? true : false
  }
  isFirst(currentIndex) {
    return currentIndex == 1 ? true : false
  }
  //保存当前的期刊号，用来之后判断
  _setLastIndex(index) {
    wx.setStorageSync("lastIndex", index);
  }
  _getLastIndex() {
    return wx.getStorageSync("lastIndex");
  }
  //保存缓存名
  _getDailyName(index) {
    return "classic-" + index;
  }
}

export {
  classicModel as classicmodel
}