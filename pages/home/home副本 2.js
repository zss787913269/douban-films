// pages/home/home.js
Page({

  data: {
    loading:true,
    typeList:[
        {
          title:"新片速递"
        },
        {
          title: "影院热播"
        },
        {
          title: "免费观影"
        }
    ]
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log("load")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
    // console.log(this);
    setTimeout(()=>{
      this.loadHomeDatas();
    },4000)
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")


  },

  loadHomeDatas(){
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
      data:{
        start:0,
        count:6
      },
      method:"GET",

      success: ({ data: { total, subject_collection: { name: title }, subject_collection_items:list } })=>{
        // let temp = { title, list, total};
        this.setData({
          "typeList[0]": { title, list, total, reqUrl:"movie_latest"},
          "loading":false
        })
      },

      fail:()=>{
        wx.showToast({
          title: '数据加载失败',
          image:"../../imgs/error.png",
          duration:2000
        })
      }
    });

    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
      data: {
        start: 0,
        count: 6
      },
      method: "GET",
      success: ({ data: { total, subject_collection: { name: title }, subject_collection_items: list } }) => {
        // let temp = { title, list, total};
        this.setData({
          "typeList[1]": { title, list, total, reqUrl:"movie_showing" },
          "loading": false
        })
      },

      fail: () => {
        wx.showToast({
          title: '数据加载失败',
          image: "../../imgs/error.png",
          duration: 2000
        })
      }
    });

    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
      data: {
        start: 0,
        count: 6
      },
      method: "GET",
      success: ({ data: { total, subject_collection: { name: title }, subject_collection_items: list } }) => {
        // let temp = { title, list, total};
        this.setData({
          "typeList[2]": { title, list, total, reqUrl:"movie_free_stream" },
          "loading": false
        })
      },

      fail: () => {
        wx.showToast({
          title: '数据加载失败',
          image: "../../imgs/error.png",
          duration: 2000
        })
      }
    })


  }
})