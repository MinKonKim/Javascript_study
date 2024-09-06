// var car = {
//   fuel: Math.ceil(Math.random() * 10 + 10),
//   power: Math.ceil(Math.random() * 3 + 2),
//   run: function() {
//     console.log(this.fuel * this.power)
//   }
// }

// car.fuel = 1000;
// car.power = 100;
// car.run()

// var createCar = function () {
//   var fuel = Math.ceil(Math.random() * 10 + 10);
//   var power = Math.ceil(Math.random() * 3 + 2);
//   var runObj = {
//     run: function () {
//       console.log(fuel * power);
//     },
//   };

//   Object.freeze(runObj);

//   return runObj;
// };

// var car = createCar();
// car.run = function () {
//   console.log(2000000);
// };

// car.run();

var fruits = ["apple", "banana", "peach"];
var $ul = document.createElement("ul");

var alertFruit = function (fruit) {
  alert("your choice is" + fruit);
};

fruits.forEach(function (fruit) {
  var $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruit);
  $ul.appendChild($li);
});

document.body.appendChild($ul);
alertFruit(fruits[1]);