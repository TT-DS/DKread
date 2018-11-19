require(["config"], function(){
	require(["jquery","template","header","footer","lunbo","cookie"], function($,template){
		//promise
		new Promise(function(resolve, reject){
		  //引入header头部
			$("header").load("/html/component/header.html", function(){
				resolve();
			});
			//引入搜索框
			$(".DK-seek").load("/html/component/DK-seek.html", function(){
			});
			//引入导航
			$(".DK-nav").load("/html/component/DK-nav.html", function(){
			});
			//引入footer尾部
			$("footer").load("/html/component/footer.html", function(){
			});
			/*$(".shopping-affirm-body").load("/html/addshopping.html",function(){
				
			});*/
		}).then(function(){
			//用户名cookie
			//如果有cookie则执行把cookie传到页面
					if($.cookie("name")){
						$("#DK-id").html("<a href='/index.html' class='DK-username'>"+$.cookie("name")+"</a>");
						//转换hi-DK的内容
						$(".hi-DK").load("/html/component/hi-DK.html");
					}
					//点击用户名清除cookie
					$(".DK-username").click(function(){
						$.cookie('name', '', { expires: -1 });
					})
		}).then(function(){
			//全部小说
			$.ajax({
				url:"http://localhost/DK-read/api/fiction.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					console.log(res);
					var str = template("banner-img",{product: res});
					$(".DK-classift-right-body").html(str);
				
					$(".DK-classift-shopping1").click(function(){
						if($.cookie("name")){
						//加入购物车
						$(".shopping-affirm-img-btn").click(function(){
							$(".shopping-affirm").css("display","none");
						})
						var str = $(this).text();
						console.log(str);
						var arr = str.split("="); // ["id","3"];
						var obj = {};
						obj[arr[0]] = arr[1];
						console.log(obj);
						$.ajax({
							url:"http://localhost/DK-read/api/addshopping.php",
							data: obj,
							method:"POST",
							dataType:"json",
							success: function(res){
								//console.log(res);
								if(res.code === 1){
									console.log(res);
									var str = template("banner-img",{product: res.product});
									$(".DK-detailPage").html(str);
								
								}
							}
						})
						$(".shopping-affirm").fadeIn(200,function(){
							$(".shopping-affirm").css('display','block');
						})
						}else{
					            alert("请登录后再加入购物车！");
				             }
					})
				}
			   })
		}).then(function(){
			//小说分类
			$.ajax({
				url:"http://localhost/DK-read/api/xs-fiction.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("xsfiction",{product: res});
					$("#DK-xsfiction").html(str);
					$(".DK-classift-shopping1").click(function(){
						//加入购物车
					if($.cookie("name")){
						$(".shopping-affirm-img-btn").click(function(){
							$(".shopping-affirm").css("display","none");
						})
						var str = $(this).text();
						console.log(str);
						var arr = str.split("="); // ["id","3"];
						var obj = {};
						obj[arr[0]] = arr[1];
						console.log(obj);
						$.ajax({
							url:"http://localhost/DK-read/api/addshopping.php",
							data: obj,
							method:"POST",
							dataType:"json",
							success: function(res){
								//console.log(res);
								if(res.code === 1){
									console.log(res);
									var str = template("banner-img",{product: res.product});
									$(".DK-detailPage").html(str);
								
								}
							}
						})
						$(".shopping-affirm").fadeIn(200,function(){
							$(".shopping-affirm").css('display','block');
						})
						}else{
					            alert("请登录后再加入购物车！");
				             }
					})
					
				}
			   })
		})


	})
})