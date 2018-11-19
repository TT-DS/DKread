<?php
    header("Access-Control-Allow-Origin:http://localhost:2333");
	include("connect.php");

	//获取前端传递过来的数据拼接sql
	$username = $_POST["username"];
	$password = $_POST["password"];
	    $cxsql="select * from user where name=$username";
		$sucsql=mysql_query($cxsql);
		if($sucsql){
			echo '{"code":0}';
		}else{
			$sql = "insert into user (name,password) values ('$username','$password')";
		    $isSuc = mysql_query($sql);
			if($isSuc){
				echo '{"code": 1}';
		    }else{
		    	echo '{"code": 0}';
		    }
		}
		
	mysql_close();
?>