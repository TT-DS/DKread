define(["jquery"], function($){

$.fn.extend({
	lunbo:function(obj){

		var goPrev = $("#"+obj.goPrev);
		var goNext = $("#"+obj.goNext);

		var $ul = this.find("ul"),
			$imgs = this.find("ul li"),
			$ol = this.find("ol");

		var index = 0,
			len = $imgs.length,
			flag = false,
			timer = null,
			imgWidth = $imgs.eq(0).width();

		$imgs.each(function(){
			$("<li>")
				
				.addClass($(this).index()==0?"ac":"")
				.appendTo($ol);

		});
		$imgs.eq(0).clone(true).appendTo($ul);
		$ul.css("width", imgWidth*(len+1));

		$ol.on("click","li",function(){
			if(!flag){
				flag = true;
				$(this).addClass("ac").siblings().removeClass("ac");
				index = $(this).index();
				$ul.animate({"left":-index*imgWidth},"slow",function(){
					flag = false;
				});
			}
			

		})

		goPrev.click(function(){
			if(!flag){
				flag = true;
				if(--index < 0){
					$ul.css("left",-len*imgWidth);
					index = len-1;
					$ul.animate({"left":-index*imgWidth},"slow",function(){
						flag = false;
					});
				}else{
					$ul.animate({"left":-index*imgWidth},"slow", function(){
						flag = false;
					});
				}
				$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
			}
		})

		goNext.click(function(){
			if(!flag){
				flag = true;
				if(++index >= len){
					$ul.animate({"left":-len*imgWidth},"slow",function(){
						$ul.css("left", 0);
						//$ul.css({"left": 0});
						flag = false;
					})
					index = 0;
				}else{
					$ul.animate({"left":-index*imgWidth},"slow", function(){
						flag = false;
					})
				}
				$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
			}
		})
       timer = setInterval(function(){
				$(goNext).trigger("click");
			},2000);
		this.mouseenter(function(){
			$(".left").css('display','block');
			$(".right").css('display','block');
			clearInterval(timer);
		})
		this.mouseleave(function(){
			$(".left").css('display','none');
			$(".right").css('display','none');
			timer = setInterval(function(){
				$(goNext).trigger("click");
			},2000);
		})

	}
})

})