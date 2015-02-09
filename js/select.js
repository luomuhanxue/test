
SelectPage={
  controls:[],      //所有可选的项
  focus_item:null,  //当前选中的项
  city_btn:null,    //城市按钮
  line_count:4,     //一行的控件数
  init:function(pageInto,pageOut,response){
    var that = this;
    //转化控件
    var page = $('#select_page');
    var mouseover = function(){
      if (that.focus_item) {that.focus_item.zunfocus();};
      that.focus_item = that.controls[this.z_idx];
      that.focus_item.zfocus();
    };
    var click = function(){
      that.clickById(this.z_idx);
    };
    var zfocus = function(){
      this.classList.add("select-focus");
    };
    var zunfocus = function(){
      this.classList.remove("select-focus");
    };
    var arr = page.find(".select-kind");
    var len = arr.length;
    for(var i = 0;i < len; ++i){
      var temp = arr[i];
      this.controls[i]=temp;
      temp.z_idx = i;
      temp.zfocus = zfocus;
      temp.zunfocus = zunfocus;
      temp.onclick = click;
      temp.onmouseover = mouseover;
    }
    var city = page.find("#city-select");
    city[0].z_idx = -4;
    city[0].zfocus = function(){
      this.classList.add("select-anim");
    };
    city[0].zunfocus = function(){
      this.classList.remove("select-anim");
    };
    city[0].onclick = function(){
      that.clickById(this.z_idx);
    };
    city[0].onmouseover = function(){
      if (that.focus_item) {that.focus_item.zunfocus();};
      that.focus_item = this;
      that.focus_item.zfocus();
    }
    this.city_btn = city[0];

    //第一次进入的页面要在此注册键盘事件
    KeyEventDispatcher.registerKeyDownEvent(this);
    this.focus_item = this.controls[0];
    this.focus_item.zfocus();
  },
  enter:function(){
    //注意:首次默认进入的界面不会调用 
    //触发条件:每次进入页面会调用此方法
    //作用:页面进入初始化控件状态
    if (this.focus_item==null) {
      this.focus_item = this.controls[0];
      this.focus_item.zfocus();
    };
  },
  out:function(){
    //每次离开页面会调用此方法
    //再次可以内存回收
  },
  onkeydown:function(keycode){
    var now_idx = this.focus_item.z_idx;
    var next_idx = now_idx;
    var detal = -1;
    switch(keycode){
      case KeyCode.up: detal = -detal;
      case KeyCode.down: detal = -detal;
        next_idx = now_idx+detal*this.line_count;
        if (next_idx >= 0 && next_idx<this.controls.length) {
          this.focus_item.zunfocus();
          this.focus_item = this.controls[next_idx];
          this.focus_item.zfocus();
        }else{
          if (next_idx<0&&next_idx>-6) {//城市选择设置焦点
            this.focus_item.zunfocus();
            this.focus_item = this.city_btn;
            this.focus_item.zfocus();
          };
        };
        return;
      case KeyCode.left: detal = -detal;
      case KeyCode.right: detal = -detal;
        next_idx = now_idx+detal;
        if (next_idx >= 0 && next_idx<this.controls.length) {
          this.focus_item.zunfocus();
          this.focus_item = this.controls[next_idx];
          this.focus_item.zfocus();
        };
        return;
      case KeyCode.enter:
        this.clickById(now_idx);
        return;
      case KeyCode.back1:
      case KeyCode.back2:
        return;
    }
    //this.super.onkeydown(keycode);  //调用父类的键盘处理事件
  },
  clickById:function(idx){
    if(idx==-4){  //跳转到城市选择页面
      var self_page = document.querySelector(".in." + Mobilebone.classPage);
      var city_page = document.querySelector("#list_page");
      var page_in = Mobilebone.createPage(city_page);
      return;
    }
    //跳转到列表页面
    if (idx===3) {
        var self_page = document.querySelector(".in." + Mobilebone.classPage);
        var city_page = document.querySelector("#detail_page");
        var page_in = Mobilebone.createPage(city_page);
    }else if(idx===0){
        var self_page = document.querySelector(".in." + Mobilebone.classPage);
        var city_page = document.querySelector("#city_page");
        var page_in = Mobilebone.createPage(city_page);
    };
  },
};
//继承Page
extend(SelectPage,Page);
