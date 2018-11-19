require(["config"], function(){
	require(["jquery","header","footer","cookie"], function($, header){
		new Promise(function(resolve,reject){
			//处理表单提交
			$("form").submit(function(e){
				//构造请求携带的参数
				var data = {
					username: $("#username").val(),
					password: $("#password").val()
				};
				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/DK-read/api/login.php",
					success: function(res){
						console.log(res);
						if(res.code === 1){
							//使用cookie记录登录状态
							location.href = "http://localhost:2333/index.html";
							$.cookie.raw = true;
				            $.cookie("name", data.username,{
						        expires:1,
						        path:"/"
				            });
						}else{
							alert("用户名或者密码错误");
						}
					}
				})



				e.preventDefault();
			})
		})
	})
})