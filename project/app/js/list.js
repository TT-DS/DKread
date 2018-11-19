require(["config"], function(){
	require(["jquery", "template", "header", "footer","lunbo"], function($, template, header){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			})
		}).then(function(){
			//执行header和footer的逻辑代码，实现交互
			header.nav();
		}).then(function(){
			$.ajax({
				method: "get",
				url:"http://rap2api.taobao.org/app/mock/115081/products",
				success: function(res){

					var html = template("pro-template",{products: res.products});
					console.log(html);
					$("#proList").html(html);
				}

			})
		}).then(function(){
			$("#div1").lunbo({
				goPrev:"left",
				goNext: "right"
			})
		})
	})
})