/*
 *  import  加载 外部的 其其它 JS 文件
 *          加载的是 当前js 文件中 module.exports 导出的对象
 */
import api from "../../api/api.js";
// console.log(api);


Page({

  data: {
    loading: true,
    typeList: [
      {
        title: "新片速递"
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.loadHomeDatas();
    }, 4000)

  },

  loadHomeDatas() {
    api.loadMovieLatest(({ data: { total, subject_collection: { name: title }, subject_collection_items: list } }) => {
      this.setData({
        "typeList[0]": { title, list, total, reqUrl: "loadMovieLatest" },
        "loading": false
      })
    });

    api.loadMovieShowing(({ data: { total, subject_collection: { name: title }, subject_collection_items: list } }) => {
      this.setData({
        "typeList[1]": { title, list, total, reqUrl: "loadMovieShowing" },
        "loading": false
      })
    });

    api.loadMovieFreeStream(({ data: { total, subject_collection: { name: title }, subject_collection_items: list } }) => {
      this.setData({
        "typeList[2]": { title, list, total, reqUrl: "loadMovieFreeStream" },
        "loading": false
      })
    });
  }
})