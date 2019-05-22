// pages/list/list.js

import api from "../../api/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlKey: "",
    title: "",
    list: [],
    total: 0,
    params: {
      start: 0,
      count: 12
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * options 用于接收跳转时所携带的 get 参数
   */
  onLoad: function (options) {
    // console.log(options)
    this.data.urlKey = options.reqUrl;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadFilmDatas();
  },

  // 触底函数
  onReachBottom:function(){
    console.log(1);

    // 后台 总共 23 条数据
    // 第一次  0-12    list => 12
    // 第二次  12-12   list => 24 --真  23
    // 第三次  24-12   list => 36
    // ……

    var newStrat = this.data.params.start + this.data.params.count;

    if (newStrat < this.data.total){
      this.data.params.start = newStrat;
      this.loadFilmDatas();
    }

    
  },

  loadFilmDatas: function () {
    api[this.data.urlKey](({ data: { total, subject_collection: { name }, subject_collection_items: list } }) => {
      this.setData({
        title: name,
        list: this.data.list.concat(list),
        total
      })
    }, this.data.params );
  }
})