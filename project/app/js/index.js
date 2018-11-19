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
				/*banner图片的调用*/
            $.ajax({
				url:"http://localhost/DK-read/api/banner.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("banner-img",{product: res});
					$("#banner-ul").html(str);
					//轮播
					$("#banner").lunbo({
						goPrev:"left",
						goNext: "right"
					})
				}
			   })
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
			//销售榜
			$.ajax({
				url:"http://localhost/DK-read/api/Toplist.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					console.log(res);
					var str = template("detil-template",{product: res});
					$(".list-ul1").html(str);
					
				}
			   })
			//月度榜
			$.ajax({
				url:"http://localhost/DK-read/api/ydlist.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					console.log(res);
					var str = template("detil-template",{product: res});
					$(".list-ul2").html(str);
					
				}
			   })
			//好评榜
			$.ajax({
				url:"http://localhost/DK-read/api/hplist.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					console.log(res);
					var str = template("detil-template",{product: res});
					$(".list-ul3").html(str);
					
				}
			   })
		}).then(function(){
			//重磅推荐
			$.ajax({
				url:"http://localhost/DK-read/api/recommend.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					console.log(res);
					var str = template("zb-recommend",{product: res});
					$("#DK-ul").html(str);
					
					
				}
			   })
		}).then(function(){
			//轮播
			$("#zb-banner").lunbo({
				goPrev:"left",
				goNext: "right1"
			})
		}).then(function(){
			//特价图书
			$.ajax({
				url:"http://localhost/DK-read/api/tj-book.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("tjbook",{product: res});
					$(".DK-tj-ul").html(str);
					
				}
			   })
		}).then(function(){
			//书评广场
			$.ajax({
				url:"http://localhost/DK-read/api/sp-book.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("spbook",{product: res});
					$(".DK-sp-ul").html(str);
					
				}
			   })
		}).then(function(){
			//最新上架
			$.ajax({
				url:"http://localhost/DK-read/api/zx-book.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("zxbook",{product: res});
					$(".DK-zx-ul").html(str);
					
				}
			   })
		}).then(function(){
			//合资书架
			$.ajax({
				url:"http://localhost/DK-read/api/hz-book.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("hzbook",{product: res});
					$(".DK-hz-ul").html(str);
					
				}
			   })
		}).then(function(){
			//销售榜选项卡
			$("#list-btn-1").click(function(){
                $(".top-img").animate({left: '20px'}, 100);
                $(".list-ul1").css("display","block");
                $(".list-ul2").css("display","none");
                $(".list-ul3").css("display","none");
                $("#list-btn-1").attr("class","btn-1");
				$("#list-btn-2").attr("class","");
                $("#list-btn-3").attr("class","");

			})
			$("#list-btn-2").click(function(){
				 $(".top-img").animate({left: '98px'}, 100);
				 $(".list-ul1").css("display","none");
				 $(".list-ul2").css("display","block");
                 $(".list-ul3").css("display","none");
                 $("#list-btn-1").attr("class","");
				 $("#list-btn-2").attr("class","btn-1");
                 $("#list-btn-3").attr("class","");
				 
			})
			$("#list-btn-3").click(function(){
				 $(".top-img").animate({left: '175px'}, 100);
				 $(".list-ul1").css("display","none");
				 $(".list-ul2").css("display","none");
                 $(".list-ul3").css("display","block");
                 $("#list-btn-1").attr("class","");
				 $("#list-btn-2").attr("class","");
                 $("#list-btn-3").attr("class","btn-1");
			})
		}).then(function(){
			//合资平品牌选项卡
			$(".hz-li").click(function(){
				console.log($(".hz-li"));
				 $(".top-img1").animate({left: '104px'}, 100);
				 $("#hz-body").css("display","block");
				 $("#hz-body1").css("display","none");
				 $("#hz-body2").css("display","none");
                 $("#hz-body3").css("display","none");
			})
			$(".hz-li1").click(function(){
				 $(".top-img1").animate({left: '319px'}, 100);
				 $("#hz-body").css("display","none");
				 $("#hz-body1").css("display","block");
				 $("#hz-body2").css("display","none");
                 $("#hz-body3").css("display","none");
			})
			$(".hz-li2").click(function(){
				 $(".top-img1").animate({left: '520px'}, 100);
			})
			$(".hz-li3").click(function(){
				 $(".top-img1").animate({left: '737px'}, 100);
			})
			$(".hz-li4").click(function(){
				 $(".top-img1").animate({left: '951px'}, 100);
			})
		})


	})
})