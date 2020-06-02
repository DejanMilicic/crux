import { useContext } from "react";
import { selectPop, PopStore } from "stores/pop";

export function Pop() {
  const { show, current } = selectPop(useContext(PopStore));
  return show && current ? current : null;
}
