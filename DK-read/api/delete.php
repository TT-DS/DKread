<?php
   header("Access-Control-Allow-Origin:*");
   include("connect.php");
   $id=$_POST["id"];
   $sql="delete from shopping where id=$id";
   $deletesucc=mysql_query($sql);
   if($deletesucc){
   	echo '{"code":1}';
   }else{
   	echo '{"code":0}';
   }
?>