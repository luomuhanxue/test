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

Loading = {
	bg:null,
	parent_dispatcher:null,
	ajaxId:null,
	isShow:false,
	show:function(){
		//创建背景
		this.isShow = true;
	    history["pushState"](null, document.title, '#&dialog');
		Mobilebone.dialogManager.registerDialog(this);
		if(this.bg==null){
			this.bg = document.createElement("div");
			this.bg.className = "loading-bg";
			this.bg.style.display="block";
			this.bg.innerHTML = '<div id="caseBlanche"><div id="rond"><div id="test"></div></div><div id="load"><p>loading</p></div></div>';
			document.body.appendChild(this.bg);
		}else{
			this.bg.style.display = "block";
		}
		this.parent_dispatcher=KeyEventDispatcher.getDispatcher();
		KeyEventDispatcher.registerKeyDownEvent(this);
	},
	registerAjaxId:function(x){
		this.ajaxId = x;
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
		this.ajaxId.abort();
		this.remove();
	},
	onkeydown:function(key_code){
	    switch(key_code){
	      case KeyCode.back1:
	      case KeyCode.back2:
			history.back();
	        break;
	      default:return;
  		}
	}
};