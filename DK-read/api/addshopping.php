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
			//添加购物车
			$sql = "select * from allbook where id=$id";
	        $res = mysql_query($sql);
		   while($row = mysql_fetch_array($res))
			{
			  $name = $row['name'];
			  $price = $row['price'];
			  $author = $row['author'];
		      $url = $row['url'];
			}
			$addsql = "insert into shopping (id,name,price,author,url,num) values ('$id','$name','$price','$author','$url','1')";
			$arr=mysql_query($addsql);

    
	 
	

	mysql_close();

?>

