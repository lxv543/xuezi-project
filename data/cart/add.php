<?php
session_start();
header("Content-Type:text/plain");
require_once("../init.php");
$uid=$_SESSION["uid"];
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
$sql_has="select * from xz_shoppingcart_item where product_id=$lid and user_id=$uid";
$sql_insert="insert into xz_shoppingcart_item(iid,user_id,product_id,count) values(null,$uid,$lid,$count)";
$sql_update="update xz_shoppingcart_item set count=count+$count where product_id=$lid and user_id=$uid";
if(count(sql_execute($sql_has)))
  sql_execute($sql_update);
else
  sql_execute($sql_insert);
//如果购物车中没有，就insert
//否则 就update