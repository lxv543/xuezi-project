<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];
$sql="select iid,lid,title,price,count from xz_shoppingcart_item inner join xz_laptop on lid=product_id where user_id=$uid";
echo json_encode(sql_execute($sql));
