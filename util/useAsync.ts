import {useCallback, useLayoutEffect, useRef, useState} from 'react';

export function useAsync<T>(
  initialState,
): {data: T; error: any; run: (promise: Promise<T>) => void} {
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<any>(null);

  const safeSetData = useSafeSetter(setData);
  const safeSetError = useSafeSetter(setError);

  const run = useCallback(
    (promise: Promise<T>) => {
      promise
        .then((result) => {
          safeSetData(result);
          safeSetError(null);
        })
        .catch(safeSetError);
    },
    [safeSetData, safeSetError],
  );

  return {
    data,
    error,
    run,
  };
}

function useSafeSetter(dispatch) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
}
