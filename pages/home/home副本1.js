// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  // 远端获取首页数据
  loadHomeDatas:function(){
    // console.log(this.data.typeList[0].title)
    // let that = this;
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
      method:'GET',
      data:{
        start:0,
        count:6
      },
      // success:function(response){
      //   // 将数据 存放到 请求的响应封装中
      //   console.log(response.data.subject_collection.name)
      // },

      // 数据的解构赋值
      /*
       * 解   解析
       * 构   数据结构
       */
      // 箭头函数  特性 不具有 this 对象
      success: ({ data: { total, subject_collection: { name }, subject_collection_items } }) => {
        console.log(total, name, subject_collection_items)

        // this.data.typeList[0].title = name;
        
        // 重新设置变量值，
        // 要求页面重新加载数据 （重新渲染）
        // 参数为对象  用于描述被修改的数据
        this.setData({
          // JS 的 【】用法 == 字符串转变量
          ["typeList[0].title"]:name,
          ["typeList[0].list"]:subject_collection_items
          // typeList:[
          //   {
          //     title: name
          //   }
          // ]
        })

      },
      fail:function(){
        wx.showToast({
          // 中文字符 最多显示 7 个
          title: '数据请求失败',
          // icon:"success",
          // 指定本地图片作为图标
          image:"../../imgs/error.png",
          duration:4000
        })
      }
    })


  }


})