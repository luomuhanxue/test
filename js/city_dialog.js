var dialog_citys;
CityDialog={
	select_city:null,	//城市选择的控件
	parent_dispatcher:null,	//弹出此页的父事件代理
	dialog:null,		//对话框
	headerKey:null,		//所有的标题
	select_key:null,	//选中的标题
	pages:null,			//所有的页面
	show_page:null,		//当前页
	current_id:null,	//当前的页码
	call_back:null,		//
	header:null,	//头
	dialogbody:null,		//身体
	init:function(kind){
		if(kind==1){	//酒店
			dialog_citys = jiudian;
		}else if(kind==2){	//机票
			dialog_citys = guonei;
		}else if(kind==3){	//国际机票
			dialog_citys = guoji;
		}
		if(this.dialog==null){
			var doc = document.querySelector("#dialog_city");
			this.dialog = new Dialog(doc);
		}
		var header = this.dialog.doc.querySelector(".dialog-head");
		this.header = header;
		var tips = document.createElement("span");
		tips.classList.add("tip");
		tips.innerText="请选择城市：";
		header.appendChild(tips);
		this.headerKey = [];
		var that = this;
		var index = 0;
		var keyNum = 1;
		for(var key in dialog_citys){
			var the = document.createElement("span");
			if (kind==3) {
				the.classList.add('s-item2');
			}else{
				the.classList.add('s-item');
			};
			the.setAttribute("data-key",key);
			the.innerText = keyNum+'. '+key; keyNum++;
			header.appendChild(the);
			this.headerKey[index] = the;
			the.z_idx = index;
			the.zfocu=function(){this.classList.add("city-kind-over");};
			the.zunfocu=function(){this.classList.remove("city-kind-over");};
			the.sfocu=function(){this.classList.add('city-kind-focus');};
			the.sunfocu=function(){this.classList.remove('city-kind-focus');};
			the.onmouseout=function(){this.zunfocu();};
			the.onmouseover=function(){this.zfocu();};
			the.onclick=function(){
				if (that.select_key!=null&&that.select_key!=this) {
					that.select_key.sunfocu();
					that.select_key=null;
				}else{return;};
				this.sfocu();that.select_key = this;that.selectKind(this.z_idx);
			};
			index++;
		}
		if (this.show_page) {return;};
		this.select_key = this.headerKey[0];
		this.select_key.sfocu();
		//var dialogBody = this.dialog.doc.querySelector(".dialog-body"); //$("#dialog_city").children('.dialog-body');
		this.dialogBody = this.dialog.doc.querySelector(".dialog-body");//dialogBody;
		//var cityKindDivs = dialogBody.children('div');
		this.pages = [];
		var pagecount = this.headerKey.length;
		for (var i = 0; i < pagecount; i++) {
			var key = this.headerKey[i].getAttribute("data-key");
			var staut = i==0?"in":"out";
			var citys_div = document.createElement("div");
			citys_div.classList.add("city-kind");
			citys_div.classList.add(i==0?"in":"out");
			this.dialogBody.appendChild(citys_div);
			if(dialog_citys[key] instanceof Array){
				var cityarr = dialog_citys[key];
				var citys_len = cityarr.length;
				for (var j = 0; j < citys_len; j++) {
					var span = document.createElement("span");
					if(kind==3) span.classList.add("c-item-gj");
					else span.classList.add("c-item-h");
					span.setAttribute("data-code",cityarr[j].data);
					span.innerText = cityarr[j].display;//arr[j];
					span.z_idx = j;
					span.onclick=function(){
						that.dismiss();
					};
					span.zfocu = function(){this.classList.add("focus");};
					span.zunfocu = function(){this.classList.remove("focus");};
					span.onmouseover = function(){
						if (that.select_city!=this) {that.select_city.zunfocu()};
						this.zfocu();
						that.select_city = this;
					};
					citys_div.appendChild(span);
				};
				if (kind==3) citys_div.z_width = 6;
				else citys_div.z_width = 8;
			}else{
				//var citynames = my_citys[key];//var codenames = my_citys_code[key];
				var cityarr = dialog_citys[key];
				var alllen=0;
				for(var word in cityarr ){
					var arr = cityarr[word];//var carr = codenames[word];
					var citys_len = arr.length;
					for (var k = 0; k < citys_len; k++) {
						var span = document.createElement("span");
						// if(arr[k].display.length>4){
						// 	span.classList.add("c-item-m");
						// }else{
						span.classList.add("c-item");
						// }
						span.setAttribute("data-code",arr[k].data);
						span.innerText = arr[k].display;
						span.z_idx = alllen;
						span.onclick=function(){
							that.dismiss();
						};
						span.zfocu = function(){this.classList.add("focus");};
						span.zunfocu = function(){this.classList.remove("focus");};
						span.onmouseover = function(){
							if (that.select_city!=this) {that.select_city.zunfocu()};
							this.zfocu();
							that.select_city = this;
						};
						citys_div.appendChild(span);
						alllen++;
					};
				};						
				citys_div.z_width = 10;
			}
			this.pages[i] = citys_div;
		};
		this.show_page = this.pages[0];
		this.current_id = 0;
		this.select_city = this.pages[0].childNodes[0];
		this.select_city.zfocu();
		//}
	},
	selectKind:function(idx){
		var len = this.pages.length;
		if (idx<len) {
			var incity = this.pages[idx];
			var outcity = this.show_page;
			if (incity!=outcity) {
				var isback = this.current_id>idx?"back":"anim";
				if (outcity!=null) {
					outcity.classList.remove("in");
					outcity.classList.remove("back");
					outcity.classList.remove("anim");
					outcity.classList.add("out");
					outcity.classList.add(isback);
				};
				incity.classList.remove("out");
				incity.classList.remove("back");
				incity.classList.remove("anim");
				incity.classList.add("in");
				incity.classList.add(isback);
				this.show_page = this.pages[idx];
				this.current_id = idx;
				this.select_city.zunfocu();
				this.select_city = this.pages[idx].childNodes[0];
				this.select_city.zfocu();
			};
		};
	},
	clear:function(){
		this.header.innerHTML = "";
		this.dialogBody.innerHTML="";
		this.select_city=null;	//城市选择的控件
		this.headerKey.length=0;		//所有的标题
		this.select_key=null;	//选中的标题
		//this.pages.length = 0;			//所有的页面
		//for(var page in this.pages) this.dialogBody.removeChild(page);
		this.pages.length = 0;
		this.show_page=null;		//当前页
		this.current_id=null;	//当前的页码
		call_back=null;		//
	},
	setCallBack:function(fun){
		this.call_back = fun;
	},
	city_click:function(city){
		//alert(city.getAttribute("data-code")+"  "+city.innerText);
		this.call_back(city.getAttribute("data-code"),city.innerText);
	},
	move_city:function(move_step){
		var length = this.show_page.childNodes.length;
		var nowidx = this.select_city.z_idx+move_step;
		if(nowidx<0) nowidx=0;
		if (nowidx>=length) nowidx=length-1;
		this.select_city.zunfocu();
		this.select_city = this.show_page.childNodes[nowidx];
		this.select_city.zfocu();
	},
	show:function(){
		Mobilebone.dialogManager.registerDialog(this.dialog);
		this.dialog.show();
		this.parent_dispatcher=KeyEventDispatcher.getDispatcher();
		var that = this;
		this.dialog.startShow(function(){
			KeyEventDispatcher.registerKeyDownEvent(null);
		});
		this.dialog.onShow(function(){
			KeyEventDispatcher.registerKeyDownEvent(that);
		});
		this.dialog.startExit(function(){
			KeyEventDispatcher.registerKeyDownEvent(null);
		});
		this.dialog.onExit(function(){
			that.clear();
			KeyEventDispatcher.registerKeyDownEvent(that.parent_dispatcher);
		});
	},
	dismiss:function(){
		this.city_click(this.select_city);
		history.back();
		//this.dialog.dismiss();
	},
	onkeydown:function(key_code){
		var sid = this.headerKey.length;
		var len = this.headerKey.length-1;
	    switch(key_code){
	      case KeyCode.seven:sid--;
	      case KeyCode.six:sid--;
	      case KeyCode.five:sid--;
	      case KeyCode.four:sid--;
	      case KeyCode.three:sid--;
	      case KeyCode.two:sid--;
	      case KeyCode.one:sid--;
	      	if(this.select_key!=this.headerKey[len-sid]){this.select_key.sunfocu()}
	      	this.select_key = this.headerKey[len-sid];
			this.select_key.sfocu();
	      	this.selectKind(len-sid);
	      	return;
	      case KeyCode.left:
	        this.move_city(-1);
	        return;
	      case KeyCode.right:
	       	this.move_city(1);
	        return;
	      case KeyCode.up:
	       	this.move_city(-this.show_page.z_width);
	        return;
	      case KeyCode.down:
	       	this.move_city(this.show_page.z_width);
	        return;
	      case KeyCode.enter:
	        this.dismiss();
	       case KeyCode.back1:
	       case KeyCode.back2:
	       	history.back();
	        break;
	      default:return;
    	}
  	},
};