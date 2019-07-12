let paginationBeh = Behavior({
  data: {
    searchResult: [],
    totalNum: null,
    loading: false,
    noResult: false
  },
  methods: {
    getMoreData(moreData) {
      const tempArr = this.data.searchResult.concat(moreData);
      this.setData({
        searchResult: tempArr
      })
    },
    getCurrentNum() {
      return this.data.searchResult.length
    },
    getTotalNum(totalNum) {
      this.data.totalNum = totalNum;
      if(totalNum==0){
        this.setData({
          noResult:true  
        })
      }
    },
    hasMore() {
      return this.getCurrentNum() >= this.data.totalNum ? false : true
    },
    isLocked() {
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unlock() {
      this.setData({
        loading: false
      })
    },
   
  }
})
export {
  paginationBeh
}