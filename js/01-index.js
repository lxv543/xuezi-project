function getTotalTop(elem){
  var sum=0;
  do{
    sum+=elem.offsetTop;
    elem=elem.offsetParent;
  }while(elem);
  return sum;
}
//加载楼层
(()=>{
  ajax("get","data/01-index/floors.php","")
    .then(output=>{
    //根据规定的模板,动态生成f1的HTML代码片段
    var html="";
    var f1=output.f1;
    for(var i=0;i<f1.length;i++){
      var p=f1[i];
      html+=i<2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="details">${p.details}</p>
            <p class="price">¥${
              parseFloat(p.price).toFixed(2)
            }</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}">
        </div>`:
        i==2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="price">¥${
                parseFloat(p.price).toFixed(2)
            }</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}" title="${p.details}">
        </div>`:
        `<div class="product">
          <img src="${p.pic}" title="${p.details}">
          <p class="name">${p.title}</p>
          <p class="price">¥${
            parseFloat(p.price).toFixed(2)
          }</p>
          <a href="${p.href}">查看详情</a>
        </div>`
    }
    document.getElementById("f1-content")
            .innerHTML=html;

    var html="";
    var f2=output.f2;
    for(var i=0;i<f2.length;i++){
      var p=f2[i];
      html+=i<2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="details">${p.details}</p>
            <p class="price">¥${
              parseFloat(p.price).toFixed(2)
            }</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}">
        </div>`:
        i==2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="price">¥${
                parseFloat(p.price).toFixed(2)
            }</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}" title="${p.details}">
        </div>`:
        `<div class="product">
          <img src="${p.pic}" title="${p.details}">
          <p class="name">${p.title}</p>
          <p class="price">¥${
            parseFloat(p.price).toFixed(2)
          }</p>
          <a href="${p.href}">查看详情</a>
        </div>`
    }
    document.getElementById("f2-content")
            .innerHTML=html;

    var html="";
    var f3=output.f3;
    for(var i=0;i<f3.length;i++){
      var p=f3[i];
      html+=i<2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="details">${p.details}</p>
            <p class="price">¥${
              parseFloat(p.price).toFixed(2)
            }</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}">
        </div>`:
        i==2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="price">¥${
                parseFloat(p.price).toFixed(2)
            }</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}" title="${p.details}">
        </div>`:
        `<div class="product">
          <img src="${p.pic}" title="${p.details}">
          <p class="name">${p.title}</p>
          <p class="price">¥${
            parseFloat(p.price).toFixed(2)
          }</p>
          <a href="${p.href}">查看详情</a>
        </div>`
    }
    document.getElementById("f3-content")
            .innerHTML=html;

    //获得id为f1的元素距页面顶部的总距离totalTop
    var f1TotalTop=getTotalTop(//红
      document.getElementById("f1")
    );
    //查找id为lift的div保存在变量lift中
    var lift=document.getElementById("lift");
    //为window添加滚动事件监听
    window.addEventListener("scroll",()=>{
      //获得页面滚动的高度scrollTop
      var scrollTop=document.body.scrollTop
        ||document.documentElement.scrollTop;
      //如果totalTop<=scrollTop+innerHeight/2
        //让lift显示
      //否则,让lift隐藏
      lift.style.display=
        f1TotalTop<=scrollTop+innerHeight/2?
          "block":"none";
      //只有电梯按钮显示时，才用判断按钮的亮灭
      if(lift.style.display=="block"){
        //定义楼层高度变量FHEIGHT=699
        var FHEIGHT=699;
        //找到class为floor的每个楼层元素fs
        var fs=
          document.querySelectorAll(".floor");
        //遍历fs中每个楼层
        for(var i=0;i<fs.length;i++){
          //获得当前楼层距body顶部的总距离totalTop
          var totalTop=getTotalTop(fs[i]);
          //计算楼层亮灯区域的开始位置
          var start=totalTop-innerHeight/2;
          //计算结束位置end为start+FHEIGHT
          var end=start+FHEIGHT;
          //如果scrollTop>=start且scrollTop<end
          if(scrollTop>=start&&scrollTop<end)
            break;//就退出循环
        }
        //在lift下找到class为lift_item_on的li，将其class恢复为lift_item
        var currLi=
          lift.querySelector(".lift_item_on")
        if(currLi)
          currLi.className="lift_item";
        //设置lift下第i个li的class为lift_item_on
        lift.querySelector(
          `li:nth-child(${i+1})`
        ).className="lift_item_on";
      }
    });

    //在lift下找class为lift_list下的class为lift_item的所有a保存在as中
    var as=lift.querySelectorAll(
      ".lift_list .lift_item"
    );
    for(let i=0;i<as.length;i++){//遍历as
      //为每个as绑定单击事件
      as[i].onclick=function(){
        //查找id为fi的元素fi
        var fi=
          document.getElementById("f"+(i+1));
        //获得fi距body顶部的总距离totalTop
        var totalTop=getTotalTop(fi);
        //让window滚动到totalTop
        //window.scrollTo(0,totalTop-70);
        $("html,body").stop(true).animate({
          //非css标准属性，jquery中独有
          scrollTop:totalTop-70
        },500);
      }
    }
  })
})();
//加载广告轮播
(()=>{
  ajax("get","data/01-index/banners.php","")
    .then(data=>{
    const LIWIDTH=960;
    var htmlImgs="";//保存图片li的HTML片段
    //for(var i=0;i<data.length;i++){
      //var p=data[i];
    data.push(data[0]);
    for(var p of data){
      htmlImgs+=`<li>
              <a href="${p.href}" title="${p.title}">
                <img src="${p.img}">
              </a>
            </li> `;
    }
    var bannerImg=
      document.getElementById("banner-img");
    bannerImg.style.width=
      LIWIDTH*data.length+"px";
    bannerImg.innerHTML=htmlImgs;
    document.getElementById("indicators")
            .innerHTML=
              "<li></li>".repeat(data.length-1);
    $("#indicators>li:first").addClass("hover");

    var i=0,wait=3000,timer=null;
        $banner=$(bannerImg);
    function move(){
      timer=setTimeout(()=>{
        if(i<data.length-1){
          i++;
          $banner.css("left",-LIWIDTH*i);
          if(i<data.length-1)
            $("#indicators>li:eq("+i+")")
              .addClass("hover")
              .siblings().removeClass("hover");
          else
            $("#indicators>li:eq("+0+")")
            .addClass("hover")
            .siblings().removeClass("hover");
          move();
        }else{
          $(bannerImg).css("transition","")
          $banner.css("left",0);
          setTimeout(()=>{
            $(bannerImg)
              .css(
              "transition","all .3s linear");
            i=1;
            $banner.css("left",-LIWIDTH*i);
            $("#indicators>li:eq("+i+")")
            .addClass("hover")
            .siblings().removeClass("hover");
          },50);
          $("#indicators>li:eq("+i+")")
            .addClass("hover")
            .siblings().removeClass("hover");
          move();
        }
        
      },3000);
    }
    move();
    $("#banner").hover(
      ()=>clearTimeout(timer),
      ()=>move()
    );
    $("#indicators")
      .on("mouseover","li",function(){
      var $this=$(this);
      if(!$this.hasClass("hover")){
        i=$this.index();
        $banner.css("left",-LIWIDTH*i);
        $("#indicators>li:eq("+i+")")
              .addClass("hover")
              .siblings().removeClass("hover");
      }
    })
  })
})();