
var ES5 = function (name) {
  this.name = name;
};

ES5.staticMethod = function () {
  return this.name + " staticMethod";
};

ES5.prototype.method = function () {
  return this.name + " method";
};

var es5Instance = new ES5("es2");
console.log(ES5.staticMethod()); 
console.log(es5Instance.method()); 

var ES6 = class {
  constructor(name) {
    this.name = name;
  }

  static staticMethod = function () {
    return this.name + " staticMethod";
  };

  method() {
    return this.name + " method";
  };
};

var es6Instance = new ES6("es5");
console.log(ES6.staticMethod()); 
console.log(es6Instance.method());

var Grade = function () {
 	var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
    	this[i] = args[i];
    }
    this.length = args.length;
};

Grade.prototype = ['a', 'b', 'c', 'd'];
var g = new Grade(100, 80);

g.push(90);
console.log(g); // Grade {0: 100, 1: 80, 2: 90, length: 3};

delete g.length;
g.push(70);
console.log(g); // Grade {0: 100, 1: 80, 2: 90, 4: 70, length: 5}

var Rectangle = function (width, height) {
	this.width = width;
  this.height = height;
};
Rectangle.prototype.getArea = function () {
	return this.width * this.height;
};
var rect = new Rectangle(3,4);
console.log(rect.getArea());  // 12

var Square = function (width) {
	this.width = width;
};
Square.prototype.getArea = function () {
	return this.width * this.width;
};
var sq = new Square(5);
console.log(sq.getArea());  // 25

Square.prototype.width = 2;
delete sq.width;
console.log(sq.getArea()); //4