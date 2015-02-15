/*
'电影', '208'
'美食', '226'
'美发/美容/美体', '2'
'生活服务', '4'
'酒店', '209'
'摄影写真', '207'
'休闲娱乐', '3'
'运动健身', '206'
'旅游', '217'
'商品', '5'
'活动单', '6'
*/
SelectPage={
  controls:[],      //所有可选的项
  focus_item:null,  //当前选中的项
  city_btn:null,    //城市按钮
  line_count:4,     //一行的控件数
  select_layer:null,  //item 层
  history_city:null,
  kind:null,
  kinds:null,
  init:function(pageInto,pageOut,response){
    var that = this;
    //自适应
    var w = $("body").css("width");
    w = w.substring(0, (w.length - 2));
    var p = w / 1280 * 15;
    $("html").css("fontSize", p);  
    //转化控件
    var page = $('#select_page');
    
    this.select_layer = page.find('.select-layer')[0];
    var arr = page.find(".select-kind");
    var len = arr.length;
    for(var i = 0;i < len; ++i){

    }
    var city = page.find("#city-select")[0];
    city.z_idx = -4;city.z_itemId = "city";
    city.zfocus = function(){
      this.classList.add("select-anim");
    };
    city.zunfocus = function(){
      this.classList.remove("select-anim");
    };
    city.onclick = function(){
      that.clickById(this.z_itemId,'');
    };
    city.onmouseover = function(){
      if (that.focus_item) {that.focus_item.zunfocus();};
      that.focus_item = this;
      that.focus_item.zfocus();
    }
    this.city_btn = city;
    this.city_name = '北京';
    this.city_code = 'beijing';
    this.history_city = 'beijing';
    this.city_btn.innerText = this.city_name+" >";
    //第一次进入的页面要在此注册键盘事件
    KeyEventDispatcher.registerKeyDownEvent(this);
    //this.focus_item = this.controls[0];
    //this.focus_item.zfocus();
    setTimeout(function(){
      that.getCityKind();
    },500);
  },
  setCityData:function(name,code,arr){
    this.city_name = name;
    this.city_code = code;
    this.kinds = arr;
  },
  updateCity:function(){
    this.city_btn.innerText = this.city_name+' >';
    if (this.history_city!=this.city_code) {
      this.history_city = this.city_code;
      this.updateItems(this.kinds);
      //this.getCityKind();
    };
  },
  getCityKind:function(){ //获取城市对应的分类
    var that = this;
    Loading.show();
    var ajaxId = DealPost.cateList(this.city_code,function(data){
      Loading.close();
      var kindCity = {2:{name:"丽人",style:"cosmetics",img:"img/liren.png",code:2},
                      4:{name:"生活服务",style:"serve",img:"img/fuwu.png",code:3},
                      3:{name:'休闲娱乐',style:"amuse",img:"img/yule.png",code:4},
                      //5:{name:"商品",style:"shop",img:"img/gouwu.png",code:5},
                      206:{name:"运动健身",style:"jianshen",img:"img/fuwu.png",code:206},
                      207:{name:"摄影写真",style:"photo",img:"img/sheying.png",code:207},
                      208:{name:"电影",style:"film",img:"img/dianying.png",code:208},
                      209:{name:"酒店",style:"hotel",img:"img/jiudian.png",code:209},
                      217:{name:"旅游",style:"journey",img:"img/lvyou.png",code:217},
                      226:{name:"美食",style:"food",img:"img/meishi.png",code:226}};
      var items = [];
      var i = 0;
      if (data.length==0) {
        setTimeout(
          function(){
            Tips.show("当前城市没有团购!","确  定");
          },200
        );
      };
      for(key in data){
        if(data[key].deal_cate==undefined){}
        else{
          items[i] = kindCity[data[key].deal_cate_id];
          ++i;
        }
      }
      that.updateItems(items);
    },function(msg){
      Loading.close();
      setTimeout(
        function(){
          Tips.show("加载数据错误!","确  定");
        },200
      );
      var items = [];
      that.updateItems(items);
    });
    Loading.registerAjaxId(ajaxId);
  },
  updateItems:function(items){ //更新分类项
//<div class="select-kind"><div id="food"><img src="img/meishi.png"></img><div>美食</div></div></div> <div class="select-kind"><div id="hotel"><img src="img/jiudian.png"></img><div>酒店</div></div></div> <div class="select-kind"><div id="cosmetics"><img src="img/liren.png"></img><div>丽人</div></div></div> <div class="select-kind"><div id="journey"><img src="img/lvyou.png"></img><div>旅游</div></div></div><br><div class="select-kind"><div id="film"><img src="img/dianying.png"></img><div>电影</div></div></div> <div class="select-kind"><div id="serve"><img src="img/fuwu.png"></img><div>生活服务</div></div></div> <div class="select-kind"><div id="amuse"><img src="img/yule.png"></img><div>休闲娱乐</div></div></div> <div class="select-kind"><div id="about"><img src="img/meishi.png"></img><div>关于</div></div></div>
    this.select_layer.innerHTML='';
    //var len = items.length>=7?7:items.length;
    var kinds = [];
    this.controls = [];
    var i = 0;
    for(key in items)
    {
      var temp = items[key];
      if(temp!=null){
        kinds[i]=temp;
        var div = this.getItem(temp.name,temp.style,temp.img);
        this.controls[i] = div;div.z_idx = i;div.z_itemId = temp.code;div.z_name = temp.name;
        this.select_layer.appendChild(div);
        if (i == 3) {
          var br = document.createElement("br");
          this.select_layer.appendChild(br);
        };
        i++;
      }
      if(i>=7)break;
    }
    this.kind = kinds;
    /*
    for(; i < len; ++i){
      var temp = items[i];
      var div = this.getItem(temp.name,temp.style,temp.img);
      this.controls[i] = div;div.z_idx = i;div.z_itemId = temp.code;div.z_name = temp.name;
      this.select_layer.appendChild(div);
      if (i == 3) {
        var br = document.createElement("br");
        this.select_layer.appendChild(br);
      };
    }*/
    var div = this.getItem("关于","about","img/guanyu.png");
    this.controls[i] = div;div.z_idx = i;div.z_itemId = 'about';div.z_name='关于';
    this.select_layer.appendChild(div);
    if(this.focus_item)this.focus_item.zunfocus();
    this.focus_item = this.controls[0];
    this.focus_item.zfocus();
  },
  getItem:function(name,style,src){
    var that = this;
    var mouseover = function(){
      if (that.focus_item) {that.focus_item.zunfocus();};
      that.focus_item = that.controls[this.z_idx];
      that.focus_item.zfocus();
    };
    var click = function(){
      that.clickById(this.z_itemId,this.z_name);
    };
    var zfocus = function(){
      this.classList.add("select-focus");
    };
    var zunfocus = function(){
      this.classList.remove("select-focus");
    };
    var div = document.createElement("div");
    div.classList.add("select-kind");
    div.innerHTML = '<div id="'+style+'"><img src="'+src+'"></img><div>'+name+'</div></div>';
    div.zfocus = zfocus;
    div.zunfocus = zunfocus;
    div.onclick = click;
    div.onmouseover = mouseover;
    return div;
  },
  enter:function(){
    //注意:首次默认进入的界面不会调用 
    //触发条件:每次进入页面会调用此方法
    //作用:页面进入初始化控件状态
    if (this.focus_item==null) {
      this.focus_item = this.controls[0];
      this.focus_item.zfocus();
    };
    this.updateCity();
  },
  out:function(){
    //每次离开页面会调用此方法
    //再次可以内存回收
  },
  onkeydown:function(keycode){
    var now_idx = this.focus_item.z_idx;
    var next_idx = now_idx;
    var z_itemId = this.focus_item.z_itemId;
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
        this.clickById(z_itemId,this.focus_item.z_name);
        return;
      case KeyCode.back1:
      case KeyCode.back2:
        this.exit();  //退出
        return;
    }
    //this.super.onkeydown(keycode);  //调用父类的键盘处理事件
  },
  clickById:function(idx,title){
    if(idx=='city'){  //跳转到城市选择页面
      var self_page = document.querySelector(".in." + Mobilebone.classPage);
      var city_page = document.querySelector("#city_page");
      var page_in = Mobilebone.createPage(city_page);
      return;
    }
    if(idx=='about'){
      var self_page = document.querySelector(".in." + Mobilebone.classPage);
      var city_page = document.querySelector("#about_page");
      var page_in = Mobilebone.createPage(city_page);
      return;
    }
    //跳转到列表页面
    //console.log(idx);
    //return;
    var that = this;
    Loading.show();
    var ajaxId = DealPost.dealList(this.city_code, idx, null, 1, 6, function(data,count){
        //console.log(data.length+"  "+count);
        if (data.length===0) {
          Loading.close();
          return;
        };
        Loading.close();
        ListPage.setData(title,data,that.city_code,idx,count);
        var self_page = document.querySelector(".in." + Mobilebone.classPage);
        var city_page = document.querySelector("#list_page");
        setTimeout(function(){
          Mobilebone.createPage(city_page);
        },500);
    }, function(error){
        Loading.close();
    });
    Loading.registerAjaxId(ajaxId);
  },
};
//继承Page
extend(SelectPage,Page);
