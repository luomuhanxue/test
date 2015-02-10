
CityPage={
  dictionary:null,      //所有城市的span
  city_contents:null,   //各个首字母的城市分类div
  kind_select:null,     //kind选中项
  char_select:null,     //字母选中项
  item_select:null,     //span选择项
  back_btn:null,        //返回按钮
  kind_controls:null,   //A-E
  char_controls:null,   //ABCDE
  focus_item:null,   //鼠标焦点   全屏幕有且只有一个
  history_select:[0,1,0],
  init:function(pageInto,pageOut,response){
    var that = this;
    //屏幕自适应
    console.log("----------------------");
    var page = $("#city_page");
    var header = page.find("#city-head");
    var layer = page.find("#city-layer");
    var back_btn = header.find(".back")[0];
    back_btn.z_group = 0;
    back_btn.z_focus = function(){
      this.classList.add("btn-focus");
    };
    back_btn.z_unfocus = function(){
      this.classList.remove("btn-focus");
    };
    back_btn.onmouseover = function(){
      if (that.focus_item) {
        that.focus_item.z_unfocus();
      };
      that.focus_item = this;
      that.focus_item.z_focus();
    };
    back_btn.onclick = function(){
      that.clickedById(this.z_group,0);
    };
    this.back_btn = back_btn;

    var left_layer = $(layer).find("#city-left");
    var kinds = $(left_layer).find(".city-item-head");
    this.kind_controls=[];
    var len = kinds.length;
    var focus = function(){this.classList.add("focus");};
    var unfocus = function(){this.classList.remove("focus");};
    var click = function(){that.clickedById(this.z_group,this.z_idx);};
    var select = function(){this.classList.add("select");}
    var unselect = function(){this.classList.remove("select");};
    var mouseover = function(){
      if(that.focus_item) that.focus_item.z_unfocus();
      that.focus_item = this;
      that.focus_item.z_focus();
    };
    for(var i = 0; i < len; ++i){
      var temp = kinds[i];
      temp.z_idx = i;temp.z_focus = focus;temp.z_unfocus = unfocus;temp.onmouseover=mouseover;temp.onclick = click;temp.z_group=1;
      temp.z_select = select; temp.z_unselect = unselect;
      this.kind_controls[i] = temp;
    }
    this.char_controls=[];
    var city_mid = $(layer).find("#city-mid");
    var chars = $(city_mid).find(".city-char");
    len = chars.length;
    for(var i = 0; i < len; ++i){
      var temp = chars[i];
      temp.z_idx = i;temp.z_focus = focus; temp.z_unfocus=unfocus; temp.onmouseover = mouseover; temp.onclick = click;temp.z_group=2;
      temp.z_select = select; temp.z_unselect = unselect;
      this.char_controls[i]=temp;
    }

//----------------城市项页面------------------------
    this.dictionary = {};
    this.city_contents = {};
    var city_right = $(layer).find("#city-right")[0];
    var jj = 0;
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
        span.z_idx = i;span.z_group=3;span.z_focus=focus;span.z_unfocus=unfocus;span.onmouseover=mouseover;span.onclick=click;
        span.z_code = city_arr[i].data;
        city_content.appendChild(span);
        span_arr[i] = span;
        if(i%6==0&&i>0){
          var br = document.createElement("br");
        }
      }
      city_content.classList.add(jj===1?"in":"out");
      city_content.z_idx = jj;++jj;
      this.city_contents[key]=city_content;
      this.dictionary[key]=span_arr;
      city_right.appendChild(city_content);
    }
    //citysdata
    //cityKeyWord
    
    this.kind_select = 0;
    this.char_select = 1;
    this.item_select = 0;
    this.focus_item = this.dictionary['B'][0];
    this.focus_item.z_focus();
    this.show_page = this.city_contents['B'];
    this.updateSelect();
  },
  enter:function(){
    if (this.focus_item===this.back_btn) {

      this.focus_item.z_unfocus();
      var letter = cityKeyWord[this.history_select[0]][this.history_select[1]];
      this.focus_item = this.dictionary[letter][this.history_select[2]];
      this.focus_item.z_focus();
    };
    //this.updateSelect();
  },
  out:function(){

  },
  switchPage:function(c_idx){
    var incity = this.city_contents[c_idx];
    var outcity = this.show_page;
    if (incity!=outcity) {
      var isback = incity.z_idx>outcity.z_idx?"back":"anim";
      if (outcity!=null) {
        outcity.classList.remove("in");
        outcity.classList.remove("back");
        outcity.classList.remove("anim");
        outcity.classList.add(isback);
        outcity.classList.add("out");
      };
      incity.classList.remove("out");
      incity.classList.remove("back");
      incity.classList.remove("anim");
      incity.classList.add(isback);
      incity.classList.add("in");
      this.show_page = this.city_contents[c_idx];
      // this.focus_item.z_unfocus();
      // this.focus_item = this.dictionary[c_idx][f_id];
      // this.focus_item.z_focus();
    }
  },
  updateSelect:function(){
    this.kind_controls[this.kind_select].z_select();
    this.char_controls[this.char_select].z_select();
    var letter = cityKeyWord[this.kind_select][this.char_select];
    this.switchPage(letter,this.item_select);
  },
  updateChars:function(idx){
    this.char_controls[this.char_select].z_unselect();
    this.char_select = 0;
    this.char_controls[this.char_select].z_select();
    var arr = cityKeyWord[idx];
    var len = this.char_controls.length;
    for(var i = 0; i < len; ++i){
      if(arr[i]){
        this.char_controls[i].style.display="inline-block";
        this.char_controls[i].innerText=arr[i];
        this.char_controls[i].z_code = arr[i];
      }
      else
        this.char_controls[i].style.display="none";
    }
    this.switchPage(cityKeyWord[idx][this.char_select]);
  },
  kindclicked:function(idx){
    this.kind_controls[this.kind_select].z_unselect();
    this.kind_controls[idx].z_select();
    this.kind_select = idx;
    this.updateChars(idx);
  },
  charclicked:function(idx){
    this.char_controls[this.char_select].z_unselect();
    this.char_controls[idx].z_select();
    this.char_select = idx;
    this.switchPage(cityKeyWord[this.kind_select][this.char_select]);
  },
  itemclicked:function(idx){
    this.item_select = idx;
    var letter = cityKeyWord[this.kind_select][this.char_select];
    var span = this.dictionary[letter][idx];
    SelectPage.setCityData(span.innerText,span.z_code);
    this.history_select[0] = this.kind_select;
    this.history_select[1] = this.char_select;
    this.history_select[2] = this.item_select;
    history.back();
  },
  clickedById:function(group,idx){
    switch(group){
      case 0:
        history.back();
        return;
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
    var group = this.focus_item.z_group;
    var now_idx = this.focus_item.z_idx;
    var next_idx = now_idx;
    var detal = -1;
    switch(keycode){
      case KeyCode.up: detal = -detal;
      case KeyCode.down: detal = -detal;
        if(group===0){
          if (detal===1) {
            this.focus_item.z_unfocus();
            this.focus_item = this.kind_controls[0];
            this.focus_item.z_focus();
          };
        }else if (group===1) {
          next_idx+=detal;
          if(next_idx>=0&&next_idx<4){
            this.focus_item.z_unfocus();
            this.focus_item = this.kind_controls[next_idx];
            this.focus_item.z_focus();
          }else{
            if(detal===-1){
              this.focus_item.z_unfocus();
              this.focus_item = this.back_btn;
              this.focus_item.z_focus();
            }
          }
        }else if(group===2){
          next_idx+=detal;
          var len = cityKeyWord[this.kind_select].length;
          if(next_idx>=0&&next_idx<len){
            this.focus_item.z_unfocus();
            this.focus_item = this.char_controls[next_idx];
            this.focus_item.z_focus();
          }else{
            if(detal===-1){
              this.focus_item.z_unfocus();
              this.focus_item = this.back_btn;
              this.focus_item.z_focus();
            }
          }
        }else{
          next_idx = next_idx + detal*6;
          var letter = cityKeyWord[this.kind_select][this.char_select];
          var len = citysdata[letter].length;
          if(next_idx>=0&&next_idx<len){
            this.focus_item.z_unfocus();
            this.focus_item = this.dictionary[letter][next_idx];
            this.focus_item.z_focus();          
          }else{
            if(detal===-1){
              this.focus_item.z_unfocus();
              this.focus_item = this.back_btn;
              this.focus_item.z_focus();
            }
          }
        }
        return;
      case KeyCode.left: detal = -detal;
      case KeyCode.right: detal = -detal;
        if (group===1) {
          if (detal===1) {
            this.focus_item.z_unfocus();
            this.focus_item = this.char_controls[0];
            this.focus_item.z_focus();
          };
        }else if(group===2){
          if(detal===1){
            var letter = cityKeyWord[this.kind_select][this.char_select];
            this.focus_item.z_unfocus();
            this.focus_item = this.dictionary[letter][0];
            this.focus_item.z_focus(); 
          }else{
            this.focus_item.z_unfocus();
            this.focus_item = this.kind_controls[this.kind_select];
            this.focus_item.z_focus();
          }
        }else{
          next_idx = next_idx + detal;
          var letter = cityKeyWord[this.kind_select][this.char_select];
          var len = citysdata[letter].length;
          if(next_idx>=0&&next_idx<len){
            if(next_idx%6===5&&detal===-1){//返回
              this.focus_item.z_unfocus();
              this.focus_item = this.char_controls[this.char_select];
              this.focus_item.z_focus();
              return;
            }
            this.focus_item.z_unfocus();
            this.focus_item = this.dictionary[letter][next_idx];
            this.focus_item.z_focus();          
          }else{
            if(detal===-1){
              this.focus_item.z_unfocus();
              this.focus_item = this.char_controls[this.char_select];
              this.focus_item.z_focus();
            }
          }
        }        
        return;
      case KeyCode.enter:
        this.clickedById(group,now_idx);
        return;
      case KeyCode.back1:
      case KeyCode.back2:
        history.back();
        return;
    }
  }
};

extend(CityPage,Page);




