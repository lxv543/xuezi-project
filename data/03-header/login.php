<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
$sql="select uid from xz_user where uname='$uname' and upwd='$upwd'";
$result=sql_execute($sql);
if(count($result)){
  $_SESSION["uid"]=$result[0]["uid"];
  echo json_encode(
    ["ok"=>1,"msg"=>""]
  );
}else
  echo json_encode(
    ["ok"=>0,"msg"=>"用户名或密码错误!"]
  );