/*
	<div id="caseBlanche">
	  <div id="rond">
	    <div id="test"></div>
	  </div>
	  <div id="load">
	    <p>loading</p>
	  </div>
	</div>

*/

Tips = {
	bg:null,
	parent_dispatcher:null,
	isShow:false,
	show:function(str,btn_name){
		//创建背景
		var that = this;
		this.isShow = true;
	    history["pushState"](null, document.title, '#&tips');
		Mobilebone.dialogManager.registerDialog(this);
		if(this.bg==null){
			this.bg = document.createElement("div");
			this.bg.className = "loading-bg";
			this.bg.style.display="block";
			//this.bg.innerHTML = '<div id="tips"><p>当前城市没有团购信息！</p><br><span class="select-anim">选择城市&nbsp;&rsaquo;</span></div>';
			document.body.appendChild(this.bg);
		}else{
			this.bg.style.display = "block";
		}
		var bg_div = document.createElement("div");
		bg_div.id = "tips";
		var p = document.createElement("p");
		p.innerText = str?str:'a';
		bg_div.appendChild(p);            
		var span = document.createElement("span");
		span.classList.add('select-anim');
		span.innerText = btn_name?btn_name:'啊';
		bg_div.appendChild(span);
		this.bg.appendChild(bg_div);
		span.onclick=function(){
			history.back();
		}
		this.parent_dispatcher=KeyEventDispatcher.getDispatcher();
		KeyEventDispatcher.registerKeyDownEvent(this);
	},
	remove:function(){
		this.bg.style.display="none";
		KeyEventDispatcher.registerKeyDownEvent(this.parent_dispatcher);
	},
	close:function(){
		if(this.isShow){
			this.isShow = false;
			history.back();
		}
	},
	dismiss:function(){
		this.isShow = false;
		this.remove();
	},
	onkeydown:function(key_code){
	    switch(key_code){
	      case KeyCode.enter:
	      case KeyCode.back1:
	      case KeyCode.back2:
			history.back();
	        break;
	      default:return;
  		}
	}
};