define(["jquery"], function($){
$.fn.extend({
	drag: function(selector){
		var _this = this;

		var obj = selector ? this.find(selector) : this;
		obj.mousedown(function(e){
			var _top = e.pageY - _this.offset().top,
				_left = e.pageX - _this.offset().left;
			$(document).mousemove(function(e){
				var top = e.pageY - _top,
					left = e.pageX - _left;
				_this.css({top,left});
				e.preventDefault();
			})
			$(document).mouseup(function(){
				$(this).off("mousemove");
			})
			e.preventDefault();
		})
		
		
	}
})

})