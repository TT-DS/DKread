<?php
	header("Access-Control-Allow-Origin:*");
	include("connect.php");
	$sql = "select * from fiction";

    $res1 = mysql_query($sql);
	$rows = mysql_num_rows($res1);

	$arr = array();
	while ($row = mysql_fetch_assoc($res1)) {
		array_push($arr, $row);
	}
	echo json_encode($arr);
	mysql_close();

?>

