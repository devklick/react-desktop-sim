import { useEffect, useState } from "react";

interface UseToggleParams {
  initialValue?: boolean;
  onChanged?(value: boolean): void;
}

function useToggle({ initialValue = false, onChanged }: UseToggleParams = {}) {
  const [state, setState] = useState(initialValue);

  function toggle() {
    setState((prev) => !prev);
  }

  useEffect(() => {
    onChanged?.(state);
  }, [onChanged, state]);

  return {
    state,
    setState,
    toggle,
  };
}

export default useToggle;
