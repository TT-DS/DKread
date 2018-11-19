<?php
	
	header("Access-Control-Allow-Origin:*");

	include("connect.php");
	$id = $_POST['id'];
	    //判断购物车中是否有数据
	    $numsql = "select * from shopping where id=$id";
		$numres = mysql_query($numsql);
		if($numres){
			while($numrow = mysql_fetch_array($numres))
				{
				 /* $name = $numrow['name'];
				  $price = $numrow['price'];
				  $author = $numrow['author'];*/
			      $num = $numrow['num']+1;
				}
			$addnumsql = "update shopping set num='$num' where id=$id";
			mysql_query($addnumsql);
				
		}
	mysql_close();

?>

