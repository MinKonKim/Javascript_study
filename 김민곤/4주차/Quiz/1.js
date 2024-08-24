//   Q1.  this가 가리키는 것은 ?

var obj1 = {
  outer: function () {
    console.log(this); // --------------------- (1)

    var innerFunc = function () {
      console.log(this); // --------------------- (2)
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // ---------------------  (3)
  },
};

obj1.outer();
