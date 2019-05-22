
// 1、地址定义
const movie_latest = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items";
const movie_showing = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items";
const movie_free_stream = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items";

const film_detail = "https://m.douban.com/rexxar/api/v2/movie"; 
const film_comment = "https://m.douban.com/rexxar/api/v2/movie";

// 2、通用参数和通用方法
let params = {
  start: 0,
  count: 6
};

let filmCommentParams = {
  count:20,
  order_by:"time",
  start:0
}

let fail = function(){
  wx.showToast({
    title: '数据加载失败',
    image: "/imgs/error.png",
    duration: 2000
  })
}

// 3、定义远端请求操作 （AJAX）
/*
 *   promise
 */
let loadMovieLatest = function (success, data = params){
  wx.request({
    url: movie_latest,
    data,
    success,
    fail
  });
}

let loadMovieShowing = function (success, data = params) {
  wx.request({
    url: movie_showing,
    data,
    success,
    fail
  });
}

let loadMovieFreeStream = function (success, data = params) {
  wx.request({
    url: movie_free_stream,
    data,
    success,
    fail
  });
}


let loadFilmDetail = function (success,fimlId){
  wx.request({
    url: film_detail + "/" + fimlId,
    success,
    fail
  })
}

let loadFilmComment = function (success, fimlId, data = filmCommentParams){
  wx.request({
    url: film_comment + "/" + fimlId +"/interests",
    data,
    success,
    fail
  })
}

// 4、导出方法
/*
 *  module.exports 命令  将当前文件中指定的 函数和 变量进行到处 
 *              为其他JS提供 支持
 */
module.exports = {
  // 写入被到处 函数名 和 变量名
  loadMovieLatest, loadMovieShowing, loadMovieFreeStream, loadFilmDetail, loadFilmComment
} 