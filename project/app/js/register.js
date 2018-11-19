require(["config"], function(){
	require(["jquery","header","footer"], function($, header){
		new Promise(function(resolve,reject){
			//处理表单提交
			var user_Boolean = false;
			var password_Boolean=false;
				$("#username").blur(function(){
				  if ((/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/).test($("#username").val())){
				    user_Boolean = true;
				    $(".usererr").html("");
				  }else {
				    $(".usererr").html("必须以字母开头，不低于6位！");
				    user_Boolean = false;
				  }
				});
				$("#password").blur(function(){
				  if ((/^[a-zA-Z0-9_-]{4,16}$/).test($("#password").val())){
				    password_Boolean = true;
				    $(".usererr").html("");
				  }else {
				    $(".usererr").html("密码不低于6位！");
				    password_Boolean = false;
				  }
				});
				
				$("form").submit(function(e){
					console.log(user_Boolean);
				if(user_Boolean==true && password_Boolean==true){
					var data = {
						username: $("#username").val(),
						password: $("#password").val()
					};
				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/DK-read/api/register.php",
					success: function(res){
						console.log(res);
						
						if(res.code == 1){
							//document.cookie = "login=true;path=/"; //使用cookie记录登录状态
							location.href = "http://localhost:2333/html/register-succ.html";
						}else{
							alert("用户名已存在！");
							location.href = "http://localhost:2333/html/register-fail.html";
						}
					}
				})
				}else{
					location.href = "http://localhost:2333/html/register-fail.html";
				}
				e.preventDefault();
			})
		})
	})
})