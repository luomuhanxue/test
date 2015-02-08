
ListPage={
	header_controls:null,
	items_controls:[],
	items_line_count:3,
	select_item:null,
	init:function(pageInto,pageOut,response){
		//屏幕自适应
	  	var that = this;
	  	//转化控件
	  	var page = $('#list_page');
	  	var head = page.find("#list-head");
	  	var title = head.find("#list-title");
	  	var back = head.find(".back")[0];	back.z_idx = 0; back.z_group = 1; 
	  	var btn_last = head.find("#up-btn")[0];	btn_last.z_idx=1;	btn_last.z_group = 1;	
	  	var btn_next = head.find("#down-btn")[0];	btn_next.z_idx = 2;	btn_next.z_group = 1;
	  	this.header_controls = [back,btn_last,btn_next];
		var focus = function(){
			this.classList.add("btn-focus");
		};
		var unfocus = function(){
			this.classList.remove("btn-focus");
		};
		var mouseover = function(){
			if (that.select_item) {
				that.select_item.z_unfocus();
			};
			if(this.z_group===1){
				that.select_item = this;
			}else{
				that.select_item = this;
			}
			that.select_item.z_focus();
		};
		var click = function(){
			that.clickById(this.z_idx,this.z_group);
		};
		this.header_controls.forEach(function(item){
			item.z_focus = focus;item.z_unfocus = unfocus;item.onmouseover = mouseover;item.onclick = click;
		});
		var content = $(page.find(".content")[0]);
		var items = content.find(".list-item");
		var len = items.length;
		for(var i = 0; i < len; ++i){
			var item = items[i];
			var border = $(item).find(".border")[0];
			border.z_idx = i;border.z_group = 2;
			border.z_focus = focus;border.z_unfocus=unfocus;border.onmouseover=mouseover;border.onclick=click;
			this.items_controls[i] = border;
		}
	},
	enter:function(){

	},
	out:function(){

	},
	clickById:function(idx,group){
		if (group==1) {
			switch(idx){
				case 0:
					history.back();
					return;
				case 1:
					alert("last click!!!!");
					return;
				case 2:
					alert("next click!!!!");
					return;
			}
		}else{
			alert("item"+idx+" click!!!!");
		};
	},
	onkeydown:function(keycode){
		var group = this.select_item.z_group;
		var now_idx = this.select_item.z_idx;
		var next_idx = now_idx;
		var detal = -1;
		switch(keycode){
		  case KeyCode.up: detal = -detal;
		  case KeyCode.down: detal = -detal;
		  	if(group===1){
		  		if(detal===1){ //标题按下键 需要切换到items
		  			this.select_item.z_unfocus();
		  			this.select_item = this.items_controls[0];
		  			this.select_item.z_focus();
		  		}
		  	}else{
		  		next_idx = now_idx+detal*this.items_line_count;
		  		if (next_idx >= 0 && next_idx<this.items_controls.length) {
		  		 	this.select_item.z_unfocus();
		  		 	this.select_item = this.items_controls[next_idx];
		  		 	this.select_item.z_focus();
		  		}else{
		  			if (detal===-1){	//焦点切换到头部
		  				this.select_item.z_unfocus();
		  				this.select_item = this.header_controls[1];
		  				this.select_item.z_focus();
		  			};
		  		}
		  	}
		  	return;
		  case KeyCode.left: detal = -detal;
		  case KeyCode.right: detal = -detal;
		  	next_idx = now_idx+detal;
		  	if(group===1){
		  		if (next_idx>=0&&next_idx<3) {
		  			this.select_item.z_unfocus();
		  			this.select_item = this.header_controls[next_idx];
		  			this.select_item.z_focus();
		  		};
		  	}else{
		  		if(next_idx>=0&&next_idx<this.items_controls.length){
		  			this.select_item.z_unfocus();
		  			this.select_item = this.items_controls[next_idx];
		  			this.select_item.z_focus();
		  		}
		  	}
		  	return;
		  case KeyCode.enter:
		  	this.clickById(now_idx,group);
		  	return;
		  case KeyCode.back1:
		  case KeyCode.back2:
		  	history.back();
		    return;
		}
	}
};

extend(ListPage,Page);
