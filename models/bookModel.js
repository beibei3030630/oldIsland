import {
  http
} from "../utils/util-p.js";
class bookModel extends http {
  getHotList() {
    return this.getData({
      url: "/book/hot_list"
    })
  }
  getBookDetail(bookId) {
    return this.getData({
      url: "/book/" + bookId + "/detail"
    })
  }

  getShortComment(bookId) {
    return this.getData({
      url: "/book/" + bookId + "/short_comment"
    })
  }
  getBookFavor(bookId) {
    return this.getData({
      url: "/book/" + bookId + "/favor"
    })
  }
  addComment(book_id, content) {
    return this.getData({
      url: "/book/add/short_comment",
      method: "post",
      data: {
        book_id: book_id,
        content: content,
      }
    })
  }
  getMYBook() {
    return this.getData({
      url: "/book/favor/count"
    })
  }
}
export {
  bookModel as bookmodel
}