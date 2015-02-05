
Dialog = function(doc){
	this.doc = doc;
	this.pfx = ['webkit','moz','MS','o',''];
	var that = this;
	//创建背景
	this.bg = document.querySelector("body > .dialog-bg");
	if(this.bg==null){
		this.bg = document.createElement("div");
		this.bg.className = "dialog-bg";
		this.bg.style.display="none";
	}
	this.bg.addEventListener("click",function(){
		//that.dismiss();
		history.back();
	},true);
	document.body.appendChild(this.bg);
	var isWebkit = 'WebkitAppearance' in document.documentElement.style || typeof document.webkitHidden != "undefined";
	["animationstart", "animationend"].forEach(function(animationkey, index) {
		var webkitkey = "webkit" + animationkey.replace(/^a|s|e/g, function(matchs){return matchs.toUpperCase();});
		var animateEventName = isWebkit? webkitkey: animationkey;
		doc.addEventListener(animateEventName, function() {
			if(index==0){
				that.startAnimation(this.classList.contains("up")? "into": "out");
			}else{
				that.endAnimation(this.classList.contains("up")? "into": "out");
			}
		});
	});	
	this.showbeagin=null;this.showend=null;
	this.exitbeagin=null;this.exitend=null;
};
Dialog.prototype.startShow=function(fun){
	this.showbeagin = fun;
};
Dialog.prototype.startExit=function(fun){
	this.exitbeagin = fun;
};
Dialog.prototype.onShow=function(fun){
	this.showend = fun;
};
Dialog.prototype.onExit=function(fun){
	this.exitend = fun;
};
Dialog.prototype.startAnimation=function(e){
	if(e=="into"){
		if(this.showbeagin!=null)this.showbeagin();
	}else{
		if(this.exitbeagin!=null)this.exitbeagin();
	}
};
Dialog.prototype.endAnimation=function(e){
	if(e=="into"){
		if(this.showend!=null)this.showend();
	}else{
		if(this.exitend!=null)this.exitend();
		this.bg.style.display="none";
	}
};
Dialog.prototype.show=function(){
	this.bg.style.display="block";
	this.doc.classList.remove("down");
	this.doc.classList.add("up");
    this.doc.classList.add("slide");
    history["pushState"](null, document.title, '#&dialog');
};
Dialog.prototype.dismiss = function(){
	this.doc.classList.add("down");
	this.doc.classList.remove("up");
	//history["replaceState"](null, document.title, url_push.replace(/^#/, "#&"));
};

