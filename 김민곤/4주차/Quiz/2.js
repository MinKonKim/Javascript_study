// Q2. 다음 코드가 올바르게 작동 되도록 수정해주세요.

var obj = {

  logThis: function (){
    console.log(this);
  },
  logThisLater1 : function(){
    setTimeout(this.logThis,500);
  },
  logThisLater2 : function(){
    setTimeout(this.logThis.bind(this),1000);

  }
};


obj.logThisLater1(); // Window { ...} --- this가 전역 객체를 가리킨다.
obj.logThisLater2(); // obj {logThis:f , ...}  ---- this가  obj를 가리킨다 