import { useEffect, useRef } from "react";

export function useClickOutside(close, capturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick, capturing);
    return () => document.removeEventListener("click", handleClick, capturing);
  }, [close]);
  return { ref };
}
