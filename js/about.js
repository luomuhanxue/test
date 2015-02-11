
AboutPage={
  init:function(pageInto,pageOut,response){
    //屏幕自适应
    var page = $("#about_page");
    var header = page.find("#about-head");
    var back_btn = header.find(".back")[0];
    /*
    back_btn.z_focus = function(){
      this.classList.add("btn-focus");
    };
    back_btn.z_unfocus = function(){
      this.classList.remove("btn-focus");
    };
    back_btn.onmouseover = function(){
      this.z_focus();
    };*/
    back_btn.classList.add('btn-focus');
    back_btn.onclick = function(){
    	history.back();
    };
  },
  enter:function(){

  },
  out:function(){

  },
  onkeydown:function(keycode){
  	switch(keycode){
  		case KeyCode.enter:
  		case KeyCode.back1:
  		case KeyCode.back2:
  			history.back();
  		  	return;
  	}
  }
};

extend(AboutPage,Page);