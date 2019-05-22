// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      urls:{
        movie_latest:"https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items",
        movie_showing:"https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
        movie_free_stream:"https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items"
      },
      urlKey:"",
      title:"",
      list:[],
      total:0
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * options 用于接收跳转时所携带的 get 参数
   */
  onLoad: function (options) {
    // console.log(options);
    // console.log(options.reqUrl);
    this.data.urlKey = options.reqUrl;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.urlKey,"----");
    // console.log(this.data.urls[this.data.urlKey], "----");
    wx.request({
      url: this.data.urls[this.data.urlKey],
      data:{
        start:0,
        count:10
      },
      success: ({ data: { total, subject_collection: { name }, subject_collection_items:list } })=>{
        // console.log(data);
        this.setData({
          title: name,
          list,
          total
        })
      }
    }) 
  }
})