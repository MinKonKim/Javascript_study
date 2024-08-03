import { produce } from "immer";

function DuplicateTest() {
  const a = 10;
  const obj1 = { c: 10, d: "ddd" };

  let b = a;
  const obj2 = obj1;

  b = 15;
  obj2.c = 20;

  const obj3 = { c: 10, d: "ddd" };
  const obj4 = produce(obj3, (draft) => {
    draft.c = 20;
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      <>Number 복사</>
      <div>
        <span style={{ fontWeight: "bold" }}>a: </span>
        {a}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>b: </span>
        {b}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontWeight: "bold" }}>a === b: </span>
        {JSON.stringify(a == b)}
      </div>
      <div>Object 복사</div>
      <div>
        <span style={{ fontWeight: "bold" }}>obj1: </span>
        {JSON.stringify(obj1)}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>obj2: </span>
        {JSON.stringify(obj2)}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>obj1 === obj2: </span>
        {JSON.stringify(obj1 == obj2)}
      </div>
      <div>immer 버전</div>
      <div>
        <span style={{ fontWeight: "bold" }}>obj3: </span>
        {JSON.stringify(obj3)}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>obj4: </span>
        {JSON.stringify(obj4)}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>obj3 === obj4: </span>
        {JSON.stringify(obj3 == obj4)}
      </div>
    </div>
  );
}

export default DuplicateTest;
