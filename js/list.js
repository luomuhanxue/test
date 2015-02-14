
//var price_html = '<div class="price"><span class="price-unit">￥</span>
//<span class="price-value">'+info.price+'</span><del class="del-price">
//<span>门店价</span><span>￥'+info.value+'</span></del></div>';

function ListItem(item){
	var root = $(item);
	this.img = root.find('img')[0];
	this.name = root.find('.info>span')[0];
	var price_div = $(root.find('.price')[0]);
	this.price = price_div.find('.price-value')[0];
	this.value = price_div.find('del>.del-value')[0];
}
ListItem.prototype.update=function(info){
	this.img.src = info.src;
	this.name.innerText = info.name;
	this.price.innerText = info.price;
	this.value.innerText = '￥'+info.value;
}

ListPage={
	title:null,				//标题元素
	title_name:null,		//标题文字
	header_controls:null,	//返回 上一页 下一页
	list_gallery:null,		//添加item层
	city_code:null,			//城市代码
	cate_id:null,			//分类的id
	items_controls:[],		//item外层div		控制显示不显示
	items_divs:[],			//item焦点border div 控制焦点
	items_line_count:3,		//每行3个
	select_item:null,	//当前焦点的元素
	list_data:null,		//缓存获取的数据
	is_update:false,	//首页进入创建列表的表示
	start_idx:0,		//起始idx
	page_size:6,		//页面条数
	now_idx:1,		//当前的数据页面
	all_count:0,	//总条数
	all_pages:0,	//总页数
	show_count:6,	//当前显示的长度 1~6 不足6个 移动焦点根据此长度来判断
	is_clear:true,	//离开界面是否清数据
	page_idx:null,	//页面页码
	init:function(pageInto,pageOut,response){
		//屏幕自适应
	  	var that = this;
	  	//转化控件
	  	var page = $('#list_page');
	  	var head = page.find("#list-head");
	  	this.title = head.find("#list-title")[0];
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
		this.page_idx = content.find("#page-idx")[0];
		this.list_gallery = $(content).find('.list-gallery')[0];
	},
	enter:function(){
		this.is_clear = true;
		this.header_controls.forEach(function(item){
			item.z_unfocus();
		});
		if(this.is_update)
			this.createList();
	},
	out:function(){
		this.is_update = false;
		if(this.is_clear)
			this.clear();
	},
	setData:function(title,data,city_code,cate_id,count){
		this.title_name = title;
		var len = data.length;
		var s = this.start_idx;
		this.city_code = city_code;
		this.cate_id = cate_id;
		this.all_count = count;
		this.all_pages = Math.ceil(count/this.page_size);
		this.list_data = [];
		for(var i = 0;i < len; ++i){
			this.list_data[s] = {name:data[i].dealName,src:data[i].dealImg,price:data[i].price,value:data[i].value,id:data[i].dealId};
			++s;
		}
		this.is_update = true;
	},
	requestLastPage:function () {
		var next_idx =  this.now_idx-1;
		if (next_idx>=0) {
			--this.now_idx;
			this.updateList();
		};
	},
	requestNextPage:function () {
		var len = this.list_data.length;
		var next_idx = this.now_idx+1;
		var count = next_idx*6;
		if(count<=len){	//小于缓存长度  直接更新
			this.now_idx++;
			this.updateList();
		}else{
			if(len==this.all_count){//数据全部加载	直接更新
				if(this.now_idx<this.all_pages){
					this.now_idx++;
					this.updateList();
				}
			}else{	//拉取数据
				var that = this;
				var start_pos = this.now_idx+1;
				Loading.show();
				//alert(this.city_code+' '+this.cate_id+' '+start_pos);
				//console.log("requset for "+this.city_code+' cate_id:'+this.cate_id+'  s:'+start_pos+' len:'+6);
				var ajaxId = DealPost.dealList(this.city_code, this.cate_id, null, start_pos, 6, function(data,count){
				    that.appendData(data);
				    Loading.close();
				}, function(error){
					Loading.close();
				});
				Loading.registerAjaxId(ajaxId);
			}
		}
	},
	updatePageIndex:function(){//更新页码
		this.page_idx.innerText = this.now_idx+'/'+this.all_pages;
	},
	appendData:function (data) {	//获取回来数据 增加
		var len = data.length;
		var s = this.now_idx*this.page_size;
		for(var i = 0;i < len; ++i){
			this.list_data[s] = {name:data[i].dealName,src:data[i].dealImg,price:data[i].price,value:data[i].value,id:data[i].dealId};
			++s;
		}
		this.now_idx++;
		//更新界面
		this.updateList();
	},
	updateList:function() {		//刷新当前页的数据
		var s = (this.now_idx-1)*this.page_size;
		this.show_count = 0;
		for(var i = 0; i < 6;++i,++s){
			if(s < this.all_count){
				this.items_divs[i].style.display = 'inline-block';
				this.items_controls[i].z_item.update(this.list_data[s]);
				this.show_count++;
			}else{	//超出项隐藏
				this.items_divs[i].style.display = 'none';
			}
		}
		this.updatePageIndex();
	},
	createList:function(){
		this.title.innerText = this.title_name;
		this.list_gallery.innerHTML='';
		this.items_controls = [];
		this.show_count = 0;
		for(var i = 0;i < 6; ++i){
			var div = this.creatItem(this.list_data[i],i);
			if(this.list_data[i]==null){
				div.style.display = 'none';	//不足6个时候 隐藏
			}else{
				this.show_count++;
			}
			this.list_gallery.appendChild(div);
			this.items_divs[i] = div;
			if(i==2){
				var br = document.createElement("br");
				this.list_gallery.appendChild(br);
			}
		}
		if(this.select_item){this.select_item.z_unfocus();}
		this.select_item = this.items_controls[0];
		this.select_item.z_focus();
		this.updatePageIndex();
	},
	creatItem:function(info,idx){	//更新
/*
<div class="list-item">
	<div class="border">
		<img src="img/101.jpg" alt="">
		<div class="info">
			<span>罗曼蒂克鲜花店香水白百合</span>
		</div>
		<div class="price">
			<span class='price-unit'>￥</span><span class="price-value">128</span>
			<del class='del-price'><span>门店价</span><span class="del-value">￥258</span></del>
		</div>
	</div>
</div>*/
		var that = this;
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
		var img_html = '<img src="'+info.src+'">';
		var name_html = '<div class="info"><span>'+info.name+'</span></div>';
		var price_html = '<div class="price"><span class="price-unit">￥</span><span class="price-value">'+info.price+'</span><del class="del-price"><span>门店价</span><span class="del-value">￥'+info.value+'</span></del></div>';
		var div = document.createElement("div");
    	div.classList.add("list-item");
    	var border = document.createElement("div");
    	border.classList.add("border");
    	border.innerHTML = img_html+name_html+price_html;
    	border.z_idx = idx;border.z_group = 2;
		border.z_focus = focus;border.z_unfocus=unfocus;border.onmouseover=mouseover;border.onclick=click;
		this.items_controls[idx] = border;
    	div.appendChild(border);
    	var zitem = new ListItem(border);
    	border.z_item = zitem;
    	return div;
	},
	clickById:function(idx,group){
		if (group==1) {
			switch(idx){
				case 0:
					this.back();
					return;
				case 1:
					this.requestLastPage();
					return;
				case 2:
					this.requestNextPage();
					return;
			}
		}else{
			var s_idx = (this.now_idx-1)*this.page_size+idx;
			//console.log(this.list_data[s_idx]);
			var city_page = document.querySelector("#detail_page");
			Loading.show();
			var that = this;
			var ajaxId = DealPost.detail(this.list_data[s_idx].id,function(data){
				Loading.close();
			    DetailPage.setData(data[0]);
			    that.is_clear=false;
			    setTimeout(function(){
			      Mobilebone.createPage(city_page);
			    },500);
			},function(msg){
				Loading.close();
				//console.log(msg);
			});
			Loading.registerAjaxId(ajaxId);
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
		  		if (next_idx >= 0 && next_idx<this.show_count) {
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
		  		if(next_idx>=0&&next_idx<this.show_count){
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
		  	this.back();
		    return;
		}
	},
	clear:function(){
		//console.log('clear----------------------------');
		this.items_controls=[];
		this.items_divs=[];
		this.select_item=null;
		this.list_data=null;	 //缓存获取的数据
		this.is_update=false;
		this.start_idx=0; //起始idx
		this.page_size=6; //页面条数
		this.now_idx=1; //当前的数据页面
	}
};

extend(ListPage,Page);
