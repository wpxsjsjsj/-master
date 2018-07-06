// pages/member/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc: null,
    imgname: null,
    username:'',
    telphone:'',
    messageTextarea:'',
    modalFlag:true,
    sex:'man',
    detail:'',
    items: [
      { name: 'man', value: '男士',checked: 'true'  },
      { name: 'wuman', value: '女士', }
    ],
    hotgoods:[
      { imgUrl: '../../resource/images/news/men1.png', name:'提出请求'} ,
      { imgUrl: '../../resource/images/news/men2.png', name: '公司介绍'},
      { imgUrl: '../../resource/images/news/men3.png', name: '联系客服'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.status)
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.setData({
      imgsrc: app.globalData.imgsrc,
      imgname: app.globalData.imgname,
      detail: app.globalData.detail
    })
  
  },
  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  modalOk:function(){
    var that = this;
    var nick_name = that.data.username;
    var phone_number = that.data.telphone;
    var remark = that.data.messageTextarea;
    var sex = that.data.sex;
    if (!nick_name){
         that.alert('请填写您的昵称');
         return;
    } else if (!phone_number){
      that.alert('请填写您的手机号码');
      return;
    } else if (!remark){
      that.alert('请填写您的需求');
      return;
    }
    wx.showLoading({
      title: '提交中请稍后...',
    })
    wx.request({
      url: 'https://wswb.58qi.xin/wswb/wsNeed/insert.do', //仅为示例，并非真实的接口地址
      data: {
        nick_name: nick_name,
        phone_number: phone_number,
        remark:remark,
        sex:sex
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode==200){
          that.setData({
            modalFlag: true,
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          })
        }
        
      }
    })
  },
  userNameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  telphoneInput: function (e) {
    this.setData({
      telphone: e.detail.value
    })
  },
  messageTextarea: function (e) {
    this.setData({
      messageTextarea: e.detail.value
    })
  },
  cancel:function(){
     this.setData({
       modalFlag:true
     })
  },
  primary:function(e){
    var mess = e.currentTarget.dataset.sd;
    if (mess=='提出请求'){
           this.setData({
              modalFlag: false
            })
    } else if (mess == '联系客服'){
      wx.makePhoneCall({
        phoneNumber: '13001008263',
        fail:function(){
          wx.showToast({
            title: '连接失败',
            icon: 'none',
            duration: 1500
          })
        },
        complete:function(){
          wx.showToast({
            title: '通话结束',
            icon: 'success',
            duration: 1500
          })
        }
      })
    }
    
  },
  alert:function(mess){
    wx.showModal({
      title: '提示',
      content: mess,
      showCance:false,
      confirmText:'知道了',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
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