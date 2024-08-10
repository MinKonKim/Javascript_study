import { create } from "zustand";

type TtestStoreState = {
  testStr: string;
  testObj: { a: { b: string }[] };
  testFn: (str: string) => void;
};

const useTestStore = create<TtestStoreState>((set) => ({
  testStr: "",
  testObj: { a: [{ b: "c" }, { b: "d" }, { b: "e" }] },
  testFn: (str: string) =>
    set({
      testObj: { a: [{ b: str }, { b: "d" }, { b: "e" }] },
    }),
}));

// type State = {
//   testStr: string;
//   testObj: { a: { b: string }[] };
// };

// type Actions = {
//   testFn: (str: string) => void;
// };

// const useTestStore = create<State & Actions>()(
//   immer((set) => ({
//     testStr: "",
//     testObj: { a: [{ b: "c" }, { b: "d" }, { b: "e" }] },
//     testFn: (str: string) =>
//       set((state) => {
//         state.testObj.a[0].b = str;
//       }),
//   }))
// );

export default useTestStore;
