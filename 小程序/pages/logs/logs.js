//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
   
  },
  onLoad: function (options) {
    var sd =options.sd;
    wx.setTopBarText({
      text: sd
    })
    
  }
})
