(()=>{           //?lid=10
var lid=location.search.split("=")[1];
if(lid!==undefined)
ajax(
  "get",
  "data/05-product-details/details.php?lid="+lid,
  ""
).then(data=>{
  var laptop=data.laptop,
      family=data.family;

  /*加载左上角图片:*/
  var mImg=document.getElementById("mImg"),
      largeDiv=
        document.getElementById("largeDiv"),
      icon_list=
        document.getElementById("icon_list");
  //设置mImg的src为当前商品的第一张图片的中图片
  mImg.src=laptop.pics[0].md;
  //设置largeDiv的backgroundImage为url(第一张图片的大图片)
  largeDiv.style.backgroundImage=
    `url(${laptop.pics[0].lg})`;
  var html="";//定义空字符串html
  //遍历当前商品的每张图片
  for(var pic of laptop.pics){
    //向html中拼接
    html+=`<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
  }//(遍历结束)
  //设置icon_list的内容为html
  icon_list.innerHTML=html;

  /*加载右上角商品基本信息*/
  var title=document.querySelector(
        "#show-details>h3>a"),
      price=document.querySelector(
        "#show-details>.price>.stu-price>span"),
      promise=document.querySelector(
        "#show-details>.price>.promise"),
      spec=document.querySelector(
        "#show-details>.spec>div");
  title.innerHTML=laptop.title;
  price.innerHTML="¥"+laptop.price;
  promise.innerHTML+=laptop.promise;
  
  var html="";
  //遍历当前系列下的商品列表
  for(var l of family.laptop_list){
    //如果当前系列下当前商品的lid不等于laptop的lid
    if(l.lid!=laptop.lid)
      html+=`<a href="05-product-details.html?lib=${l.lid}">${l.spec}</a>`;
    else
      html+=`<a href="05-product-details.html?lib=${l.lid}" class="active">${l.spec}</a>`
  }
  spec.innerHTML=html;

  /***********放大镜*************/
  /*****移动小图片*****/
  //product_details.css中110行:
    //transition:all .5s linear;
  //查找id为preview下的h1下的class为forward的a保存到aForward
  var aForward=document.querySelector(
    "#preview>h1>.forward");
  //查找id为preview下的h1下的class为backward的a保存到aBackward
  var aBackward=document.querySelector(
    "#preview>h1>.backward");
  var moved=0,LIWIDTH=62;//定义变量
  //为aForward绑定单击事件
  aForward.onclick=function(){
    if(this.className.indexOf("disabled")==-1){
      moved++; move();
    }
  };
  aBackward.onclick=function(){
    if(this.className.indexOf("disabled")==-1){
      moved--; move();
    }
  };
  function move(){
    //修改icon_list的left为-moved*LIWIDTH+20
    icon_list.style.left=-moved*LIWIDTH+20+"px";
    checkA();
  }
  function checkA(){//根据moved，控制a的启用禁用
    //如果当前商品的图片列表的图片张数-moved==5
    if(laptop.pics.length-moved==5)
      //设置aForward的class为forward和disabled
      aForward.className="forward disabled";
    else if(moved==0)//否则 如果moved==0
      //设置aBackward的class为backward和disabled
      aBackward.className="backward disabled"
    else{//否则
      //设置aForward的class为forward
      aForward.className="forward";
      //设置aBackward的class为backward
      aBackward.className="backward";
    }
  }
  //如果当前商品的图片张数<=5
  if(laptop.pics.length<=5)
    //设置aForward的class为"forward disabled"
    aForward.className="forward disabled";
  /*****鼠标进入小图片切换中图片和大图片*****/
  //为父元素icon_list绑定鼠标进入事件
  icon_list.onmouseover=function(e){
    var tar=e.target;//获得目标元素tar
    //如果目标元素是img时
    if(tar.nodeName=="IMG"){
      //设置mImg的src为tar的dataset中的md属性
      mImg.src=tar.dataset.md;
      //设置largeDiv的backgroundImage为url(tar的dataset中的lg)
      largeDiv.style.backgroundImage=
        `url(${tar.dataset.lg})`;
    }
  }
  /*****鼠标进入中图片启动放大镜*****/
  //product-details.css中15行:position:relative
  //查找id为superMask的div保存在superMask
  var superMask=
    document.getElementById("superMask");
  //查找id为mask的div保存在mask
  var mask=document.getElementById("mask");
  //为superMask绑定鼠标进入事件
  superMask.onmouseover=function(){
    mask.style.display="block";//让mask显示
    largeDiv.style.display="block"//让largeDiv显示
  }
  //为superMask绑定鼠标移出事件
  superMask.onmouseout=function(){
    mask.style.display="none";//让mask隐藏
    //让largeDiv隐藏
    largeDiv.style.display="none";
  }
  //作业:完成放大镜效果！
  //定义变量MSIZE=175保存mask的宽高
  var MSIZE=175;
  var SMSIZE=350;//保存superMask的大小
  //为superMask绑定鼠标移动事件
  superMask.onmousemove=function(e){
    //获得相对于当前元素的x,y
    var x=e.offsetX,y=e.offsetY;
    //计算top和left
    var top=y-MSIZE/2;
    var left=x-MSIZE/2;
    
    //如果top<0 就改回0
    if(top<0) top=0;
    //否则如果top>SMSIZE-MSIZE 就改回SMSIZE-MSIZE
    else if(top>SMSIZE-MSIZE)
      top=SMSIZE-MSIZE;

    //如果left<0 就改回0
    if(left<0) left=0;
    //否则如果left>SMSIZE-MSIZE 就改回SMSIZE-MSIZE
    else if(left>SMSIZE-MSIZE)
      left=SMSIZE-MSIZE;

    //设置mask的top为top,left为left
    mask.style.top=top+"px";
    mask.style.left=left+"px";
    largeDiv.style.backgroundPosition=
      -left*16/7+"px "+-top*16/7+"px";
  }
})
})()