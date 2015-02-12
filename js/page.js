
Page = {
	isback:false,
	init:function(){
		alert("init error!!!!!!");
	},
	anim_start : function(page,into_or_out){
		if (into_or_out=='into') {
			this.isback = false;
		}else{
			this.out();
			KeyEventDispatcher.registerKeyDownEvent(null);
		}; 
	},
	anim_end : function(page,into_or_out){
		if (into_or_out=='into') {
			KeyEventDispatcher.registerKeyDownEvent(this);
			this.enter();
		}else{
			this.isback=false;
		};
	},
	onkeydown : function(keycode){
		switch(keycode){
			case KeyCode.back1:
			case KeyCode.back2:
				this.back();
				return;
		}
	},
	back : function(){
		if(!this.isback){
			this.isback = true;
			history.back();
		}
	},
	exit : function(){
	    if(window.NetCastBack){	//nc退出
	    	window.NetCastBack();
	    }
	},
	enter : function(){alert("enter error!!!!!!");},
	out : function(){alert("out error!!!!!!");}
};

function extend(child,parent){
	for(var i in parent){
		if(!child[i]){
			child[i] = parent[i];
		}
	}
	child.super = parent;
}

/*
//例子：
MyPage = {
	init:function(){
		setTimeout(function(){
			var self_page = document.querySelector(".in." + Mobilebone.classPage);
      		var city_page = document.querySelector("#test_page");
      		var page_in = Mobilebone.createPage(city_page,null,{history:true});
		},1500);
	},
	out:function(){
		
	}
}

extend(MyPage,Page);

MyPage2 = {
	init:function(){

	},
	enter:function () {

	},
	onkeydown:function (keycode) {
		this.super.onkeydown(keycode);
	}
}

extend(MyPage2,Page);
*/