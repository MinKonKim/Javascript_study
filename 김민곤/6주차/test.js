function createFunction() {
  let largeArray = new Array(1000000).fill("data");
  return function () {
    console.log("Closure with large data");
  };
}

const myFunction = createFunction();
myFunction();
console.log("!!!!!!!!!!");
