import { useShallow } from "zustand/react/shallow";
import useTestStore from "../store/testStore";

function ZustandTest() {
  const { testObj, testFn } = useTestStore(
    useShallow((state) => ({
      testObj: state.testObj,
      testFn: state.testFn,
    }))
  );

  const handleClick = () => {
    testFn("d");
  };

  return (
    <div>
      <h1>ZustandTest</h1>
      <div>{JSON.stringify(testObj)}</div>
      <button onClick={handleClick}>버튼</button>
    </div>
  );
}

export default ZustandTest;
