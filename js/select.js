
SelectPage={
  init:function(pageInto,pageOut,response){
    //转化控件
    $(".select-kind").hover(function() {
      $(this).addClass('select-focus');      
    }, function() {
      $(this).removeClass('select-focus');      
    });
    $(".select-kind").click(function(event) {
      var self_page = document.querySelector(".in." + Mobilebone.classPage);
      var city_page = document.querySelector("#list_page");
      var page_in = Mobilebone.createPage(city_page);
    });

    //第一次进入的页面要在此注册键盘事件
    KeyEventDispatcher.registerKeyDownEvent(this);
  },
  enter:function(){
    //注意:首次默认进入的界面不会调用 
    //触发条件:每次进入页面会调用此方法
    //作用:页面进入初始化控件状态
    
  },
  out:function(){
    //每次离开页面会调用此方法
    //再次可以内存回收
  },
  onkeydown:function(keycode){
    this.super.onkeydown(keycode);  //调用父类的键盘处理事件
  }
};
//继承Page
extend(SelectPage,Page);
