// components/filmItem/filmItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        film:{
            type:Object,
            value:null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        showDetail: function ({ currentTarget: { dataset: { filmid }}}){
            // console.log(filmid)
            wx.navigateTo({
                url: '/pages/filmDetail/filmDetail?filmId=' + filmid,
            })
        }
    }
})
