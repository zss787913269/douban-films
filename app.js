//app.js
App({

  userInfo:null,
  // 当程序被启动时执行的函数
  onLaunch:function(){
    wx.getUserInfo({
      success: (data) => {
        
        this.userInfo = data.userInfo;

      }
    })
  } 

})