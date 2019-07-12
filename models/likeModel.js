import {
  http
} from "../utils/util-p.js";
class likeModel extends http {
  getLikeData(type, id) {
    return this.getData({
      url: "/classic/" + type + "/" + id + "/favor"
    })
  }


  likeBehavior(type, id, behavior) {
    let url = behavior == 'like' ? '/like' : '/like/cancel'
    return this.getData({
      url,
      method: 'post',
      data: {
        art_id: id,
        type
      }
    })
  }
}
export {
  likeModel as likemodel
}