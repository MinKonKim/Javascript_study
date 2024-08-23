const ThisTest = () => {
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
  return <div>ThisTest</div>;
};

export default ThisTest;
