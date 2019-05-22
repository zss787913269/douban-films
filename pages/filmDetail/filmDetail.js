// pages/filmDetail/filmDetail.js

import api from "../../api/api.js";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmId:"",
    film:{},
    commonts:{
      total:0,
      list:[]
    },
    params:{
      start:0,
      count:20,
      order_by: "time"
    },
    showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.data.filmId = options.filmId;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadFilmDetail();
    setTimeout(()=>{
      this.loadFilmComment();
    },4000)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let newStart = this.data.params.start + this.data.params.count;

    if (newStart < this.data.commonts.total){
      this.setData({
        showLoading:true
      })
      this.data.params.start = newStart;

      setTimeout(()=>{
        this.loadFilmComment();
      },3000)
      
    }

  },

  loadFilmDetail:function(){
    api.loadFilmDetail(
      ( 
        { data : {
          title,
          id,
          pic: { normal:url },
          // ?
          rating,
          card_subtitle: info,
          release_date:date,
          intro,
          actors
        }}
      )=>{

        this.setData({
          film:{
            id, title, cover:{url}, rating, info, date, intro, actors
          }
        });
    },this.data.filmId);

  },

  loadFilmComment:function(){
    api.loadFilmComment(
      (  {data: { total, interests }} )=>{
      this.setData({
        commonts:{
          total, 
          list: this.data.commonts.list.concat(interests)
        },
        showLoading:false
      })
      }, this.data.filmId, this.data.params)
  },

  // 添加缓存
  addFilm:function(){

    console.log(app.userInfo);
    if(!app.userInfo){
      // 未授权
      wx.showModal({
        title: '登录许可',
        content: '请登录后收藏',
      });
      return;
    }


    // 异步方法 可以自行的 处理 成功还是 失败  不影响后续代码执行
    // 同步方法 不能自行的 处理 成功还是 失败  会影响后续代码执行

    // 如果缓存中不存在该key 值，范围的是 “”
    let temp = wx.getStorageSync("likes");
    // if(temp==""){
    //   // wx.setStorageSync("likes", [this.data.film]);

    //   // 放对象
    //   temp = {};
    //   temp[this.data.fiml.id] = this.data.fiml;

    //   wx.setStorageSync("likes", temp);

    // }else{
    //   // temp.push(this.data.film)
    //   // wx.setStorageSync("likes",temp);
    //   temp[this.data.fiml.id] = this.data.fiml;

    //   wx.setStorageSync("likes", temp);
    // }
    if(temp==""){
      temp = {};
    }

    if (temp[this.data.film.id]){
      wx.showToast({
        title: '以存在',
        icon: "success",
        duration: 2000
      });
      return;
    }

    temp[this.data.film.id] = this.data.film;
    wx.setStorageSync("likes", temp);
    wx.showToast({
      title: '收藏成功',
      icon:"success",
      duration:2000
    });


  }

})