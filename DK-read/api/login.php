<?php
  /*多看阅读登录后台*/
  header("Access-Control-Allow-Origin:http://localhost:2333");
  include("connect.php");
  $username = $_POST["username"];
  $password = $_POST["password"];
  $sql = "select * from user where name='$username' and password='$password'";
  $sqlsucc=mysql_query($sql);
  //得到返回资源的条数
  /*echo $sql;*/
  $row = mysql_fetch_row($sqlsucc);
	if($row>0){
		echo '{"code": 1}';
	}else{
		echo '{"code":0}';
	}
	mysql_close();
?>
	