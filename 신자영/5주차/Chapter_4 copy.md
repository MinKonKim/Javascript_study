#### 4-2-2 this

this - 콜백함수도 함수라서 기본적으로 this는 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백함수에 this를 직접 지정을 하는 경우가 있다(많다). 그런 경우 보통 this는 콜백함수를 호출하는 함수를 지칭한다.

+ex)map함수 내부에서는 this를 map함수를 호출하는 array로 명시적으로 바인딩 한다.
+ex)foreach함수는 별도의 인자로 this를 받아야지만 this가 호출한 배열을 가리킨다.
+ex)addEventListener는 내부에서 그 이벤트를 호출한 html 엘레멘트를 가리키도록 구현이 되어있다.

// 콜백 함수 예제 (2-3) Array.prototype.map - 구현
Array.prototype.map = function(callback, thisArg) {
var mappedArr = [];
for (var i = 0; i < this.length; i++) {
var mappedValue = callback.call(thisArg || window, this[i], i, this);
mappedArr[i] = mappedValue;
}
return mappedArr;
};
// 콜백 함수 내부에서의 this
setTimeout(function() {
console.log(this);
}, 300); // (1) Window { ... }

[1, 2, 3, 4, 5].forEach(function(x) {
console.log(this); // (2) Window { ... }
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a').addEventListener(
'click',
function(e) {
console.log(this, e); // (3) <button id="a">클릭</button>
} // MouseEvent { isTrusted: true, ... }
);

## 4-3 콜백함수는 함수다

콜백 함수로 어떤 객체의 매서드를 전달하더라도 그 객체의 매서드로 동작하는게 아니고 함수 자체로 동작한다.

// 메서드를 콜백 함수로 전달한 경우
var obj = {
vals: [1, 2, 3],
logValues: function(v, i) {
console.log(this, v, i);
},
};
obj.logValues(1, 2); // (1) { vals: [1, 2, 3], logValues: f } 1 2
[4, 5, 6].forEach(obj.logValues); // (2) Window { ... } 4 0
// Window { ... } 5 1
// Window { ... } 6 2

## 4-4 콜백 함수 내부의 this에 다른 값 바인딩 하기

03의 경우가 필요할 때도 있다. 콜백 함수가 호출 될 때, 함수를 정의한 그 객체를 this로 가리키고 싶은 경우다.
옛날에는 그 매서드 내부에서 this로 담을 변수를 정의를 하는 방법을 사용했다.(직접 지정을 하게되면 재활용을 못한다.) 매우 번거로웠다. 그러나 이제는 es5에 등장한 bind라는 매서드가 있다. 호출할 당시에 this를 지정해주는 방식이다.

// 콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(1) - 전통적인 방식
var obj1 = {
name: 'obj1',
func: function() {
var self = this;
return function() {
console.log(self.name);
};
},
};
var callback = obj1.func();
setTimeout(callback, 1000);

// 콜백 함수 내부에서 this를 사용하지 않은 경우
var obj1 = {
name: 'obj1',
func: function() {
console.log(obj1.name);
},
};
setTimeout(obj1.func, 1000);

// func 함수 재활용
var obj1 = {
name: 'obj1',
func: function() {
console.log(obj1.name);
},
};
var obj2 = {
name: 'obj2',
func: obj1.func,
};
var callback2 = obj2.func();
setTimeout(callback2, 1500);

var obj3 = { name: 'obj3' };
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 2000);

// 콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(2) - bind 메서드 활용
var obj1 = {
name: 'obj1',
func: function() {
console.log(this.name);
},
};
setTimeout(obj1.func.bind(obj1), 1000);

var obj2 = { name: 'obj2' };
setTimeout(obj1.func.bind(obj2), 1500);
