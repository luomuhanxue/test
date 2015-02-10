
CityPage={
  dictionary:null,      //所有城市的span
  city_contents:null,   //各个首字母的城市分类div
  kind_select:null,     //kind选中项
  char_select:null,     //字母选中项
  item_select:null,     //span选择项
  back_btn:null,        //返回按钮
  kind_controls:null,   //A-E
  char_controls:null,   //ABCDE
  select_item:null,  //选择选中的
  focus_item:null,   //鼠标焦点   全屏幕有且只有一个
  init:function(pageInto,pageOut,response){
    var that = this;
    //屏幕自适应
    console.log("----------------------");
    var page = $("#city_page");
    var header = page.find("#city-head");
    var layer = page.find("#city-layer");
    var back_btn = header.find(".back")[0];

    var left_layer = $(layer).find("#city-left");
    var kinds = $(left_layer).find(".city-item-head");
    this.kind_controls=[];
    var len = kinds.length;
    var focus = function(){this.classList.add("focus");};
    var unfocus = function(){this.classList.remove("focus");};
    var click = function(){that.clickedById(this.z_group,this.z_idx);};
    var mouseover = function(){
      if(that.focus_item) that.focus_item.z_unfocus();
      that.focus_item = this;
      that.focus_item.z_focus();
    };
    for(var i = 0; i < len; ++i){
      var temp = kinds[i];
      temp.z_idx = i;temp.z_focus = focus;temp.z_unfocus = unfocus;temp.onmouseover=mouseover;temp.onclick = click;temp.z_group=1;
      this.kind_controls[i] = temp;
    }
    
    var city_mid = $(layer).find("#city-mid");
    var chars = $(city_mid).find(".city-char");
    len = chars.length;
    for(var i = 0; i < len; ++i){
      var temp = chars[i];
      temp.z_idx = i;temp.z_focus = focus; temp.z_unfocus=unfocus; temp.onmouseover = mouseover; temp.onclick = click;temp.z_group=2;
    }

//----------------城市项页面------------------------
    this.dictionary = {};
    this.city_contents = {};
    var city_right = $(layer).find("#city-right")[0];
    for(var key in citysdata){
      var city_content = document.createElement("div");
      city_content.classList.add("city-content");
      var city_arr = citysdata[key];
      var span_arr = [];
      len = city_arr.length;
      for(var i = 0; i < len; ++i){
        var span = document.createElement("span");
        span.classList.add("city-item");
        span.setAttribute("data-code",city_arr[i].data);
        span.innerText = city_arr[i].display;
        city_content.appendChild(span);
        span_arr[i] = span;
        if(i%6==0&&i>0){
          var br = document.createElement("br");
        }
      }
      this.city_contents[key]=city_content;
      this.dictionary[key]=span_arr;
      city_right.appendChild(city_content);
    }
    //citysdata
    //cityKeyWord
  },
  enter:function(){

  },
  out:function(){

  },
  kindclicked:function(idx){
    this.kind_select = idx;
  },
  charclicked:function(idx){
    this.charclicked = idx;
  },
  itemclicked:function(idx){
    this.item_select = idx;
  },
  clickedById:function(group,idx){
    switch(group){
      case 1:
        this.kindclicked(idx);
        return;
      case 2:
        this.charclicked(idx);
        return;
      case 3:
        this.itemclicked(idx);
        return;
    }
  },

  onkeydown:function(keycode){

  }
};

extend(CityPage,Page);




