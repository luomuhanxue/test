
ListPage={
  init:function(pageInto,pageOut,response){
    //屏幕自适应
    //LayoutFix.resize($(".header-icon"));
    $(".list-item").click(function(event) {
      var self_page = document.querySelector(".in." + Mobilebone.classPage);
      var city_page = document.querySelector("#detail_page");
      var page_in = Mobilebone.createPage(city_page);
      Mobilebone.transition(page_in,self_page);
    });
  },
  anim_start:function(page,into_or_out){
    if (into_or_out=="into"){

    };
  },
  anim_end:function(page,into_or_out){
    if(into_or_out=="into"){

    };
  },
};
