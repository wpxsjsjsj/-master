// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start1: "../../resource/images/news/star1.png",
    start2: "../../resource/images/news/star2.png",
    start3: "../../resource/images/news/star3.png",
    startkey:5,
    normalSrc: "../../resource/images/news/star3.png",
    latitude:'',
    longitude:'',


    stars: [0, 1, 2, 3, 4],
    dataArray: [
      {
        name: '交通银行',
        address: '申城大道北成功花园31号楼',
        phone: '15286800220',
        img: '../../resource/images/news/all@colour.png',
        detail:'256Km',
        star:3.5
      },
      {
        name: '中兴银行',
        address: '天诚科技对面',
        phone: '425895600',
        img: '../../resource/images/news/all@colour.png'
      },
      {
        name: '平安银行',
        address: '西亚超市楼下',
        phone: '40025861',
        img: '../../resource/images/news/all@colour.png'
      },
      {
        name: '华夏银行',
        address: '火车站对面',
        phone: '425895600',
        img: '../../resource/images/news/all@colour.png'
      },
      {
        name: '邮政银行',
        address: '西亚超市楼下',
        phone: '40025861',
        img: '../../resource/images/news/all@colour.png'
      },
      {
        name: '中国银行',
        address: '浉河区三中',
        phone: '40025861',
        img: '../../resource/images/news/all@colour.png'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sd = options.sd; 
    var latitude;
    var longitude;
    var that = this;
    wx.setNavigationBarTitle({
      title: sd
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        that.setData({
          latitude :res.latitude,
          longitude : res.longitude,
         
        })
        that.ajax1()
      }
    })
   





    
  },
  ajax1:function(){
    var that = this;
    wx.request({
      url: 'https://wswb.58qi.xin/wswb/typeinfo/listByParam.do',
      data: {
        type_id: 4,
	      info_lng: '121',
	      info_lat: '222',
        //info_lat: that.data.longitude,
        //info_lng: that.data.latitude,
        
        pageNo: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var datas = res.data;
        var newArray=[]
        for (var i=0; i <datas.length;i++){
          var ss = {};
           ss.name = datas[i].info_name,
             ss.address = datas[i].info_address,
             ss.phone = datas[i].tel_number,
             ss.img = datas[i].info_text,
             ss.detail = datas[i].distance_meter,
             ss.star = datas[i].info_star
           newArray.push(ss)
            
        }
        console.log(newArray)
        that.setData({
          dataArray:newArray

        }) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})