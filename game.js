// pages/game/game.js
var data=require("../../utils/data.js")
//地图图层数据
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
//箱子图层数据
var box = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
//方块的宽度
var w = 40
//初始化小鸟的行与列
var row = 0
var col = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level:1
  },
  initMap:function(level)
  {
    let mapData=data.maps[level]
    //使用双重for循环记录地图数据
    for(var i=0;i<8;i++)
    {
      for(var j=0;j<8;j++)
      {
        box[i][j]=0
        map[i][j]=mapData[i][j]
        if(mapData[i][j]==4)
        {
          box[i][j]=4
          map[i][j]=2
        }
        else if(mapData[i][j]==5)
        {
          map[i][j]=2
          row=i
          col=j
        }
      }
    }
  },
  // 自定义函数-绘制地图
drawCanvas:function()
{
  let ctx=this.ctx
  ctx.clearRect(0,0,320,320)
  //使用双重for循环绘制8×8的地图
  for(var i=0;i<8;i++)
  {
    for(var j=0;j<8;j++)
    {
      let img='ice'
      if(map[i][j]==1)
      {
        img='stone'
      }else if(map[i][j]==3)
      {
        img='pig'
      }
      //绘制地图
      ctx.drawImage('/images/icons/'+img+'.png',j*w,i*w,w,w)
      if(box[i][j]==4)
      {//叠加绘制箱子
      ctx.drawImage('/images/icons/box.png',j*w,i*w,w,w)}
    }
  }
  //叠加绘制小鸟
  ctx.drawImage('/images/icons/bird.png',col*w,row*w,w,w)
  ctx.draw()
},
// 方向键：上
up:function(){
  //不在最顶端才考虑上移
  if(row>0)
  {
    //上方如果非墙或箱子，可以移动小鸟
    if(map[row-1][col]!=1&&box[row-1][col]!=4){
       //更新当前小鸟坐标
      row=row-1
    }
   //如果上方是箱子
   else if(box[row-1][col]==4)
   {
     //箱子不在最顶端才能考虑移动
     if(row-1>0){
       //如果箱子上方不是箱子或墙
       if(map[row-2][col]!=1&&box[row-2][col]!=4)
       {
        box[row-2][col]=4
        box[row-1][col]=0
        //更新当前小鸟的坐标
        row=row-1
       }
     }
   }
   //重新绘制地图
   this.drawCanvas()
   //检查游戏是否成功
   this.checkWin()
  }
},
// 方向键：下
down:function()
{
  //不在最低端才考虑下移
  if(row<7)
  {
    //如果下方不是墙或箱子可以移动小鸟
    if(map[row+1][col]!=1&&box[row+1][col]!=4)
    {
      // 更新小鸟坐标
      row=row+1
    }
    //如果下方是箱子
    else if(box[row+1][col]==4)
    {
      //箱子不在最底端才能考虑推动
      if(row+1<7)
      {
        // 如果箱子下方不是墙或箱子
        if(map[row+2][col]!=1&&box[row+2][col]!=4)
        {
          box[row+2][col]=4
          box[row+1][col]=0
          row=row+1
        }
      }
    }
    this.drawCanvas()
    //检查游戏是否成功
    this.checkWin()
  }
},
// 方向键：左
left:function()
{
  //不在最左侧才考虑移动
  if(col>0)
  {
    //如果左方不是墙或箱子可以移动小鸟
    if(map[row][col-1]!=1&&box[row][col-1]!=4)
    {
      // 更新小鸟坐标
      col=col-1
    }
    //如果左方是箱子
    else if(box[row][col-1]==4)
    {
      //箱子不在最左端才能考虑推动
      if(col-1>0)
      {
        // 如果箱子左方不是墙或箱子
        if(map[row][col-2]!=1&&box[row][col-2]!=4)
        {
          box[row][col-2]=4
          box[row][col-1]=0
          col=col-1
        }
      }
    }
    this.drawCanvas()
    //检查游戏是否成功
    this.checkWin()
  }
},
// 方向键：右
right:function()
{
  //不在最右侧才考虑移动
  if(col<7)
  {
    //如果右方不是墙或箱子可以移动小鸟
    if(map[row][col+1]!=1&&box[row][col+1]!=4)
    {
      // 更新小鸟坐标
      col=col+1
    }
    //如果右方是箱子
    else if(box[row][col+1]==4)
    {
      //箱子不在最右端才能考虑推动
      if(col+1<7)
      {
        // 如果箱子右方不是墙或箱子
        if(map[row][col+2]!=1&&box[row][col+2]!=4)
        {
          box[row][col+2]=4
          box[row][col+1]=0
          col=col+1
        }
      }
    }
    this.drawCanvas()
    //检查游戏是否成功
    this.checkWin()
  }
},
// 判断游戏是否成功
isWin:function()
{
  //使用双重for循环遍历整个数组
  for(var i=0;i<8;i++)
  {
    for(var j=0;j<8;j++)
    {
      //如果箱子没在终点
      if(box[i][j]==4&&map[i][j]!=3)
      {
        //返回false，表示游戏未成功
        return false
      }
    }
  }
  return true
},
// 游戏成功提示
checkWin:function()
{
  if(this.isWin()){
    wx.showModal({
      title: '恭喜',
      content: '游戏成功',
      showCancel:false
    })
  }
},
//重新开始
restartGame:function()
{
  //初始化地图数据
  this.initMap(this.data.level-1)
  // 绘制画布内容
  this.drawCanvas()
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取关卡
    let level=options.level
    //更新页面关卡标题
    this.setData({
      level:parseInt(level)+1
    })
    //创建画布上下文
    this.ctx=wx.createCanvasContext('myCanvas')
    //初始化地图数据
    this.initMap(level)
    //绘制画布内容
    this.drawCanvas()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})