define(["tools"],function(tools){
	function Header(){}
	//实现下拉菜单
	Header.prototype.nav = function(){
		var subMenu = tools.$(".subMenu");
		for (var i = 0; i < subMenu.length; i++) {
			subMenu[i].onclick = function(){
				tools.$("ul",this)[0].style.display = "block";
			}
		}
	}

	return new Header();
})