define(function(){//兼容透明度的缓冲运动
move:function(obj,modeJson,fn){
	var startJson={};
	var speedJson={};

	for(var attr in modeJson){
		//判断startJson中有没有opacity
		startJson[attr]=attr==="opacity"?
		Number(QFTools.getStyle(obj, attr)).toFixed(2)*100:
		parseInt(QFTools.getStyle(obj,attr));
	}
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in modeJson){
			//计算速度
			speedJson[attr]=modeJson[attr]-startJson[attr]>0?
			Math.ceil((modeJson[attr]-startJson[attr])/10):
			Math.floor((modeJson[attr]-startJson[attr])/10);

			//起点值往前走一步
			startJson[attr]+=speedJson[attr];
			obj.style[attr]=attr==="opacity"?
			startJson[attr]/100:startJson[attr]+"px";
			if(startJson[attr]!==modeJson[attr]){
				flag=false;
			}
		}
		//判断flag状态来得到是否到达终点
		if(flag){
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
}
})