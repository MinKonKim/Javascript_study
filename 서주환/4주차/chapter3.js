// console.log(this)
// console.log(global)
// console.log(this === global)

// var a = 1
// console.log(a)
// console.log(window.a)
// console.log(this.a)

// var a = 1;
// window.b = 2;
// console.log(a, window.a, this.a);
// console.log(b, window.b, this.b);

// window.a = 3;
// b = 4;
// console.log(a, window, this.a);
// console.log(b, window.b, this.b);

// var Cat = function (name,age) {
//     this.bark = '야옹'
//     this.name = name
//     this.age = age
// }
// var choco = new Cat('초코', 7)
// var nabi = new Cat('나비', 5)
// console.log(choco, nabi)

// var func = function (a, b, c) {
//   console.log(this, a, b, c);
// };

// func(1, 2, 3);
// func.call({ x: 1 }, 4, 5, 6);

// var func = function (a, b, c) {
//   console.log(this, a, b, c);
// };
// func.apply({ x: 1 }, [4, 5, 6]);

// var obj = {
//   a: 1,
//   method: function (x, y) {
//     console.log(this.a, x, y);
//   },
// };
// obj.method.apply({ a: 4 }, [5, 6]);

// var obj = {
//     0: 'a',
//     1: 'b',
//     2: 'c',
//     length: 3
// }
// var arr = Array.from(obj)
// console.log(arr)

// function Person(name, gender) {
//   this.name = name;
//   this.gender = gender;
// }
// function Student(name, gender, school) {
//   Person.call(this, name, gender);
//   this.school = school;
// }
// function Employee(name, gender, company) {
//   Person.apply(this, [name, gender]);
//   this.company = company;
// }
// var by = new Student("보영", "female", "단대");
// var jn = new Employee("재난", "male", "google");


const number = [10, 20, 3, 19, 25, 39]
const max = Math.max(...number)
const min = Math.min(...number)
console.log(max,min)