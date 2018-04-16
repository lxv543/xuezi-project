<?php
header("Content-Type:application/json");
require_once("../init.php");
$output=[
  /*
  "laptop"=>[lid,fid,title,details,spec,...,pics=>[],
  "family"=>[fid,fname,laptop_list:[...]]
  */
];
@$lid=$_REQUEST["lid"];
if($lid){
  $sql="select * from xz_laptop where lid=$lid";
  $output["laptop"]=sql_execute($sql)[0];
  $sql="select * from xz_laptop_pic where laptop_id=$lid";
  $output["laptop"]["pics"]=sql_execute($sql);
  $fid=$output["laptop"]["family_id"];
  $sql="select fid,fname from xz_laptop_family where fid=$fid";
  $output["family"]=sql_execute($sql)[0];
  $sql="select lid,spec from xz_laptop where family_id=$fid";
  $output["family"]["laptop_list"]=
    sql_execute($sql);
  echo json_encode($output);
}else{
  echo "[]";
}

