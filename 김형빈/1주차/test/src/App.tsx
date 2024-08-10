import { useEffect } from "react";
import "./App.css";
import DuplicateTest from "./components/DuplicateTest";
import ZustandTest from "./components/ZustandTest";

function App() {
  const testObj = { a: { b: 2 } };
  
  useEffect(() => {
    console.log("test");
  }, [testObj]);

  return (
    <>
      <DuplicateTest />
      {/* <UseEffectTest testObj={testObj} /> */}
      <ZustandTest />
    </>
  );
}

export default App;
