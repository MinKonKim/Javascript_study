// 함수와 메서드에서의 this 바인딩
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc1 = function () {
      console.log(this);
    };
    innerFunc1();
    var self = this;
    var innerFunc2 = function () {
      console.log(self);
    };
    innerFunc2();
  },
};

obj.outer();

// 콜백 함수 내부에서의 this

setTimeout(function () {
  console.log(this);
}, 3000);

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e);
});
