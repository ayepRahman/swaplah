import { useRef, useState } from "react";

/**
 * Enables a component state to be either CONTROLLED or UNCONTROLLED.
 * @link - https://github.com/amannn/react-hooks/tree/main/packages/use-optionally-controlled-state#the-problem
 *
 */

type ResultBox<T> = { v: T };

// React hook for creating a value exactly once. useMemo doesn't give this guarantee unfortunately -
// https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
function useConstant<T>(fn: () => T): T {
  const ref = useRef<ResultBox<T>>();

  if (!ref.current) {
    ref.current = { v: fn() };
  }

  return ref.current.v;
}

interface UseOptionalControlledStateProps<Value> {
  controlledValue?: Value;
  initialValue?: Value;
  onChange?(value: Value): void;
}

type UseOptionalControlledStateResponse<Value> = [
  Value | undefined,
  (value: Value) => void
];

export function useOptionalControlledState<Value>({
  controlledValue,
  initialValue,
  onChange,
}: UseOptionalControlledStateProps<Value>): UseOptionalControlledStateResponse<Value> {
  const isControlled = controlledValue !== undefined;
  const initialIsControlled = useConstant(() => isControlled);
  const [stateValue, setStateValue] = useState(initialValue);
  const __DEV__ = process.env.NODE_ENV === "development" || "test";

  if (__DEV__) {
    if (initialValue === undefined && controlledValue === undefined) {
      throw new Error(
        "Either an initial or a controlled value should be provided."
      );
    }

    if (initialIsControlled && !isControlled) {
      throw new Error(
        "Can not change from controlled to uncontrolled mode. If `undefined` needs to be used for controlled values, please use `null` instead."
      );
    }

    if (!initialIsControlled && isControlled) {
      throw new Error(
        "Can not change from uncontrolled to controlled mode. Please supply an initial value other than `undefined` to make the state controlled over its lifetime. If `undefined` needs to be used for controlled values, please use `null` instead."
      );
    }
  }

  const value = isControlled ? controlledValue : stateValue;

  const onValueChange = (nextValue: Value) => {
    if (!isControlled) setStateValue(nextValue);
    if (onChange) onChange(nextValue);
  };

  return [value, onValueChange];
}
