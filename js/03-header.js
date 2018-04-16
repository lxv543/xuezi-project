//加载header
(()=>{
  /*ajax("get","03-header.html","","text")
    .then(html=>{
    document.getElementById("header")
            .innerHTML=html;
  */
  $("#header").load("03-header.html",()=>{
    var $login=$("#listLogin"),
        $welcome=$("#listWelcome"),
        $dialogLogin=$("#dialog-login"),
        $form=$dialogLogin.children("form"),
        $txtName=$("#txtName"),
        $txtPwd=$("#txtPwd"),
        $valiTips=$("#valiTips");
    $.get("data/03-header/isLogin.php")
    .then(data=>{
      if(data.ok){
        $("#uname").text(data.uname);
        $welcome.show();
        $login.hide();
      }else{
        $welcome.hide();
        $login.show();
      }
    });
$dialogLogin.dialog({
  autoOpen:false,
  modal:true,
  show: { effect: "blind", duration: 500 },
  hide: { effect: "fade", duration: 500 },
  buttons:{
    "登录":()=>{
      if($txtName.val().trim()=="")
        $valiTips.html("用户名不能为空").show();
      else if($txtPwd.val().trim()=="")
        $valiTips.html("密码不能为空").show();
      else
        $.post(
          "data/03-header/login.php",
          $form.serialize()
        ).then(data=>{
          if(data.ok){
            location.reload();
          }else{
            $valiTips.html(data.msg).show();
          }
        })
    },
    "取消":()=>$dialogLogin.dialog("close")
  },
  close:()=>$valiTips.empty().hide()
});
$login.find("a").last().click(()=>{
  $dialogLogin.dialog("open");
});
$welcome.find("a").last().click(()=>{
  $.get("data/03-header/logout.php")
    .then(()=>location.reload());
});

    /*为查询按钮绑定单击事件跳转*/
    //查找id为top-input的div
    var topInput=
      document.getElementById("top-input");
    //在topInput下查找class为search-img的a元素，绑定单击事件
    topInput
      .getElementsByClassName("search-img")[0]
      .onclick=function(){
      //获取旁边id为txtSearch的input的内容
      var kw=
        document.getElementById("txtSearch").value;
      //如果内容不是空
      if(kw.trim().length!=0){
        //拼接url:
        var url=
          "http://localhost/xuezi-project-s/04-products.html?kw="+kw;
        //跳转到url的页面
        location=url;
      }
    }

    //为当前窗口添加滚动事件监听
    window.addEventListener("scroll",()=>{
      //(防止和页面内容中的其它滚动事件冲突)
      //获得滚动高度:
      var scrollTop=
        document.body.scrollTop
        ||
        document.documentElement.scrollTop;
      //如果滚动高度>=300
      if(scrollTop>=300)
        //设置id为header下的class为main的div的class为main和fixed_nav
        document.querySelector(
          "#header-top"
        ).className="clear fixed_nav";
      else//否则
        //设置id为header下的class为main的div的class为main
        document.querySelector(
          "#header-top"
        ).className="clear";
    })
  })
})();


  
