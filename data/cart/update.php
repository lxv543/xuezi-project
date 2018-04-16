<?php
header("Content-Type:text/plain");
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
$sql_update="update xz_shoppingcart_item set count=$count where iid=$iid";
$sql_delete="delete from xz_shoppingcart_item where iid=$iid";
if($count)
  sql_execute($sql_update);
else
  sql_execute($sql_delete);