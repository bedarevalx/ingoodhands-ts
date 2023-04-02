import { useEffect, useState } from 'react';

interface IUseDebounceProps {
  value: string;
  delay: number;
}

function useDebounce(props: IUseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(props.value);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(props.value),
      props.delay || 500,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [props.value, props.delay]);

  return debouncedValue;
}

export default useDebounce;
