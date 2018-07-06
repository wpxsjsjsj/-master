//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    localDetail:'定位中...',
    searchHidden:'block',
    currentImg:'../../resource/images/news/stimg.jpg',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    modalFlag:false,
    latitude:'',
    longitude:'',
    status:'',
    "banner_list": [
      {
        "banner": [
          {
            "pic_url": "../../resource/images/news/timg.jpg",
          },
          {
            "pic_url": "../../resource/images/news/timg1.jpg",
          },
          {
            "pic_url": "../../resource/images/news/timg2.jpg",
          },
          {
            "pic_url": "../../resource/images/news/timg3.jpg",
          },
         
        ]
      } 
    ],
    hotgoods: [
      {
        "name": "家政",
        "summary": "防钻绒工艺,保暖更锁温,备好深秋暖意",
        "pic_url": "../../resource/images/core/s1.png"
      },
      {
        "name": "洗车",
        "summary": "金属机身,指纹解锁,4000mAh大电池",
        "pic_url": "../../resource/images/core/s2.png",
      },
      {
        "name": "银行",
        "summary": "骁龙820处理器,4轴防抖相机",
        "pic_url": "../../resource/images/core/s3.png"
      },
      {
        "name": "医院",
        "pic_url": "../../resource/images/core/s4.png",
        "summary": "6.44寸大屏黄金尺寸,买赠智能显示保护套"
      },
      {
        "name": "护理",
        "summary": "精选阿瓦提长绒棉,瑞典抗菌科技,3条/包",
        "pic_url": "../../resource/images/core/s5.png"
      },
      {
        "name": "饭店",
        "summary": "全新空气增压系统,净化性能高达 310m³/h",
        "pic_url": "../../resource/images/core/s6.png"
      },
      {
        "name": "快递",
        "summary": "全新空气增压系统,净化性能高达 310m³/h",
        "pic_url": "../../resource/images/core/s7.png"
      },
      {
        "name": "商场",
        "summary": "全新空气增压系统,净化性能高达 310m³/h",
        "pic_url": "../../resource/images/core/s8.png"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    var latitude, longitude;
    qqmapsdk = new QQMapWX({
      key: 'M73BZ-3PTCO-3QKWE-SULYV-ZBOD5-UCFAQ'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
         that.setData({
           latitude: latitude,
           longitude: longitude,
         })
       // that.loadCity(latitude, longitude)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res.result.address)
            let info = res.result.address_component.city;
            app.globalData.localCity = info;
            app.globalData.detail = res.result.address;
            that.setData({
              localDetail: info,
              modalFlag: true
          
            });
          },fail: function (res) {
            //失败的回调函数
            // console.log(res);
            that.setData({
              status:res
            })
          },
          complete: function (res) {
            console.log(res)
          }
        });
      }
    })
   
    wx.request({
      url: 'https://wswb.58qi.xin/wswb/WsAds/list.do',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
         var sd={};
         var datas = res.data;
         var newArray = []
         for (var i = 0; i < datas.length; i++) {
           var ss = {};
           ss.pic_url = datas[i].img_src;
           ss.id = datas[i].id;
           newArray.push(ss)
         }
         sd.banner = newArray
        that.setData({
          banner_list : sd
        })
      }
    })

    wx.request({
      url: 'https://wswb.58qi.xin/wswb/ wsType/list.do',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var datas = res.data;
        var newsrray = []
        for (var i = 0; i < datas.length; i++) {
          var ss = {};
          ss.name = datas[i].text;
          ss.pic_url = datas[i].ico_src;
          ss.id = datas[i].id;
          newsrray.push(ss)
        }
        that.setData({
          hotgoods: newsrray
        })
      }
    })
    
   

  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + longitude + ',' + latitude+'&key=M73BZ-3PTCO-3QKWE-SULYV-ZBOD5-UCFAQ',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        let info = res.data.result.ad_info.city;
        app.globalData.localCity = info;
        page.setData({ 
          localDetail: info, 
          modalFlag:true
          
          });


      },
      fail: function () {
        page.setData({ currentCity: "获取定位失败" });
      },

    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  nextPage:function(e){
    var sd = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../list/list?sd='+sd
    })
  },
  tumpCity: function () {
    wx.navigateTo({
      url: '../citys/citys'
    })
  },
  onShow: function (options) {
    this.setData({
      localDetail: app.globalData.localCity
    })
  }
})
