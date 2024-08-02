import { useEffect, useState } from "react";
interface UseEffectTestProps {
  testObj: { a: { b: number } };
}

function UseEffectTest({ testObj }: UseEffectTestProps) {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log("hello");
  }, [testObj]);

  const handleClick = () => {
    setState((prev) => prev + 1);
  };
  return (
    <div>
      useEffectTest
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}

export default UseEffectTest;
