define(["jquery"], function($){

$.fn.extend({
	lunbo:function(obj){
		var goNext = $("#"+obj.goNext);

	var $imgs = $("#div1 #ul li"),
		$btns = $("#div1 #ol li");

	var index = 0; //当前播放的图片下标
	var flag = false; //默认没有开始播放
	var timer = null;

$btns.click(function(){
	if(!flag){
		flag = true;
		$(this).addClass("ac").siblings().removeClass("ac");
		$imgs.eq(index).fadeOut();
		index = $(this).index();
		$imgs.eq(index).fadeIn(function(){
			flag = false;
		});
	}
	
})


$("#goNext").click(function(){
	if(!flag){
		flag = true;
		$imgs.eq(index).fadeOut();
		if(++index >= $imgs.length){
			index = 0;
		}
		$btns.eq(index).addClass("ac").siblings().removeClass("ac");
		$imgs.eq(index).fadeIn(function(){
			flag = false;
		});
	}
})


$("#div1").hover(function(){
	clearInterval(timer);
},(function autoPlay(){
	timer = setInterval(function(){
		$("#goNext").trigger("click");
	},500);
	return autoPlay;
})());

	}
})

})