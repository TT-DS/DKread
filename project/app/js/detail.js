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
			//详情页
				var str = location.search.slice(1);
				var arr = str.split("="); // ["id","3"];
				console.log(arr);
				var obj = {};
				obj[arr[0]] = arr[1];
				$.ajax({
					url:"http://localhost/DK-read/api/detail.php",
					data: obj,
					method:"POST",
					dataType:"json",
					success: function(res){
						//console.log(res);
						if(res.code === 1){
							console.log(res);
							var str = template("banner-img",{product: res.product});
							$(".DK-detailPage").html(str);
							$(".detail-shopping").click(function(){
						   //加入购物车
						   if($.cookie("name")){
						   $(".shopping-affirm-img-btn").click(function(){
							$(".shopping-affirm").css("display","none");
						   })
							var str = $(".detail-shopping1").text();
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
					}
				})
		})


	})
})