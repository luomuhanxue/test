KeyCode={
  left:37,
  up:38,
  right:39,
  down:40,
  zero:48,
  one:49,
  two:50,
  three:51,
  four:52,
  five:53,
  six:54,
  seven:55,
  eight:56,
  nine:57,
  enter:13,
  back1:8,
  back2:461
};
//事件分发
KeyEventDispatcher={
  dispatcher:null,
  init:function(){
    var that = this;
    document.onkeydown = function(e){
      that.eventDispatcher(e);
    };
  },
  eventDispatcher:function(keyevent){
    if(this.dispatcher==null) return;
    this.dispatcher.onkeydown(keyevent.keyCode);
  },
  registerKeyDownEvent:function(page){
    this.dispatcher = page;
  },
  getDispatcher:function(){
    return this.dispatcher;
  }
};
KeyEventDispatcher.init();