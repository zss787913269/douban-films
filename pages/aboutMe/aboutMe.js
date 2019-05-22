// pages/aboutMe/aboutMe.js
// 获取APP 组件功能

const app = getApp();
console.log(app);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likes:{},
    size:0,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 在页面 开始时 获取用户信息的授权状态
    wx.getUserInfo({
      success:(data)=>{
        // errMsg:"getUserInfo:ok"
        // console.log(data);
        this.setData({
          userInfo:data.userInfo
        })
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let likes = wx.getStorageSync("likes");
    // console.log(likes);

    let num = Object.keys(likes).length;



    this.setData({
      likes:likes,
      size: num
    })
  },

  deleteLike: function ({ currentTarget: { dataset: { id } } } ){
    // console.log(1);
    let temp = this.data.likes;
    delete temp[id];

    let num = Object.keys(temp).length;

    this.setData({
      likes: temp,
      size:num
    });

    wx.setStorageSync("likes", temp)

  },

  loadUserInfo: function ({ detail:{ userInfo } }){
    console.log(userInfo);
    if(userInfo){
      this.setData({
        userInfo:userInfo
      });
      app.userInfo = userInfo;
    }

  }
})