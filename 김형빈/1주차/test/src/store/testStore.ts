import { create } from "zustand";

type TtestStoreState = {
  testStr: string;
  testObj: { a: { b: string } };
  testFn: (str: string) => void;
};

const useTestStore = create<TtestStoreState>((set) => ({
  testStr: "",
  testObj: { a: { b: "c" } },
  testFn: (str: string) =>
    set({
      testObj: { a: { b: str } },
    }),
}));

// type State = {
//   testStr: string;
//   testObj: { a: { b: string } };
// };

// type Actions = {
//   testFn: (str: string) => void;
// };

// const useTestStore = create<State & Actions>()(
//   immer((set) => ({
//     testStr: "",
//     testObj: { a: { b: "c" } },
//     testFn: (str: string) =>
//       set((state) => {
//         state.testObj.a.b = str;
//       }),
//   }))
// );

export default useTestStore;
