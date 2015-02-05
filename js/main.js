
//index 为启动页
/*  
data-root="StartPage" 
data-onpagefirstinto="init" 
data-animationstart="anim_start" 
data-animationend="anim_end" 
id="start_page"
*/
StartPage={
  init:function(pageInto,pageOut,response){
    var go = function(){
      window.location.replace("meituan.html");
    };
    setTimeout(go,1500);
  },
  anim_start:function(page,into_or_out){

  },
  anim_end:function (page,into_or_out) {

  }
}



