import {
  http
} from "../utils/util-p.js";
class searchModel extends http {

  searchBook({
    value,
    startNum = 0
  }) {
    return this.getData({
      url: "/book/search",
      data: {
        start: startNum,
        summary: 1,
        q: value
      }
    })
  }
}
export {
  searchModel as searchmodel
}