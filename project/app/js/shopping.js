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
			//购物车列表
			if($.cookie("name")){
				$.ajax({
				url:"http://localhost/DK-read/api/shopping.php",
				method:"POST",
				dataType:"json",
				success: function(res){
					var str = template("banner-img",{product: res});
					$(".shopping-ul").html(str);
					/*$(".book-all").html($(".shopping-li").length);*/
					$(".delete").click(function(){
						var _this=$(this);
						var value=$(this).text();
		    	        $(".shopping-affirm1").fadeIn("fast").css("display","block");
		    	        $("#del-btn1").click(function(){
		    	        	$(".shopping-affirm1").fadeIn("fast").css("display","none");
		    	        })
		    	        $("#del-btn").click(function(){
		    	        	var str = value;
							console.log(str);
							var arr = str.split("="); // ["id","3"];
							var obj = {};
							obj[arr[0]] = arr[1];
							console.log(obj);
							$.ajax({
								url:"http://localhost/DK-read/api/delete.php",
								data: obj,
								method:"POST",
								dataType:"json",
								success: function(res){
									//console.log(res);
									if(res.code === 1){
										var add=_this.parent().parent();
										add.remove();
										$(".shopping-affirm1").fadeIn("fast").css("display","none");
										/*window.location.reload();*/
									}
								}
							})
		    	        })
		             })
					//删除购物车结束
					//计算总价开始（全选）
					var sum =  0;
					var allnum=0;
					$("#checkbox-all").click(function(){
						sum=0;
						if(this.checked==true){
							$(".checkbox").prop("checked", true);
							console.log($(".DK-list-price").length);
							
							//遍历价格
							 $(".DK-list-price").each(function(){
    								/*alert($(this).text())*/
    								var numsum=$(this).parent().nextAll().find(".num-sum").val();
    								var add=$(this).text();
    								allnum+=Number(numsum)
    								sum+=Number(add)*Number(numsum);
    								
 							})
                            
							 $(".book-all").html(allnum);
							 $(".all-price").html(sum);
						}else{
							sum=0;
						    allnum=0;
							$(".checkbox").prop("checked", false);
							$(".all-price").html(sum);
							$(".book-all").html(allnum);
						}
					})
					//计算总价结束
					//单选开始
					var allbook=0;
					$(".checkbox").each(function(){
						
						$(this).click(function(){
								
							if(	this.checked==true){
								/*查找当前图书价格*/
								var addprice=$(this).parent().nextAll().find(".DK-list-price").text();
								/*查找数量*/
								var num=$(this).parent().nextAll().find(".num-sum").val();
								sum+=Number(addprice)*Number(num);
								 $(".all-price").html(sum);
								var count=$(".checkbox").length;
								/*var allbook1=$(".checkbox:checked").parent().nextAll().find(".num-sum").val();
								allbook+=Number(allbook1);
								$(".book-all").html(allbook);*/
								if(count==$(".checkbox:checked").length){
									$("#checkbox-all").prop("checked", true);
								}
							}else{
							
								$("#checkbox-all").prop("checked", false);
								var addprice=$(this).parent().nextAll().find(".DK-list-price").text();
								var num=$(this).parent().nextAll().find(".num-sum").val();
								sum-=Number(addprice)*Number(num);
								 $(".all-price").html(sum);
								
							}
						})
					})
					//单选结束
					//数量编辑开始
					$(".num-add").click(function(){
						//将添加的数量添加到数据库
						var idnum=$(this).parent().parent().parent().find(".delete-span").text();
						var str = idnum;
							var arr = str.split("="); // ["id","3"];
							var obj = {};
							obj[arr[0]] = arr[1];
							$.ajax({
								url:"http://localhost/DK-read/api/num-add.php",
								data: obj,
								method:"POST",
								dataType:"json",
								success: function(res){
									//console.log(res);
									if(res.code === 1){
										
									}
								}
							})
						//将添加的数量添加到数据库结束
						/*var sum=$(this).prev(".num-sum").val();*/
						var numcheck=$(this).parent().parent().parent().find(".checkbox");
						if(numcheck.get(0).checked){
							
							var numprice=$(this).parent().parent().find(".DK-list-price").text();
							sum+=Number(numprice)
						    $(".all-price").html(sum);
						}
						var addnum=$(this).prev(".num-sum").val();
						addnum=Number(addnum)+1;
						$(this).prev(".num-sum").val(addnum);
					/*	$(".book-all").html(sum);*/
					})
					//数量减少
					$(".num-sub").click(function(){
						
						var addnum=$(this).next(".num-sum").val();
						if(addnum==1){
							$(this).next(".num-sum").val(1);
						}else{
							//将数据库的数量减少
						var idnum=$(this).parent().parent().parent().find(".delete-span").text();
						var str = idnum;
							console.log(str);
							var arr = str.split("="); // ["id","3"];
							var obj = {};
							obj[arr[0]] = arr[1];
							console.log(obj);
							$.ajax({
								url:"http://localhost/DK-read/api/num-sub.php",
								data: obj,
								method:"POST",
								dataType:"json",
								success: function(res){
									//console.log(res);
									if(res.code === 1){
										
									}
								}
							})
						//将数据库的数量减少结束
						    var subcheck=$(this).parent().parent().parent().find(".checkbox");
						    if(subcheck.get(0).checked){
								var subprice=$(this).parent().parent().find(".DK-list-price").text();
								sum-=Number(subprice)
							    $(".all-price").html(sum);
						    }
							addnum=Number(addnum)-1;
						    $(this).next(".num-sum").val(addnum);
						}
						
					})
					//数量编辑结束
				}
			  })
			}else{
				$(".shopping-ul").html("<li class='login-shopping'>"+"<a href='login.html'>"+"请登录查看购物车！"+"</a>"+"</li>");
			}
		}).then(function(){
		  
		})


	})
})