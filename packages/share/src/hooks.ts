import { useCallback, useState, DependencyList } from 'react'
import isHotkey from 'is-hotkey'
import { useKey } from 'react-use'
import { Handler, UseKeyOptions } from 'react-use/lib/useKey'
import { UseEventTarget } from 'react-use/lib/useEvent'

export { usePreviousDistinct, useKey } from 'react-use'

// Fork from https://github.com/CharlesStover/use-force-update
export function useForceUpdate(): () => void {
  const [, dispatch] = useState<{}>(Object.create(null))

  // Turn dispatch(required_parameter) into dispatch().
  const memoizedDispatch = useCallback((): void => {
    dispatch(Object.create(null))
  }, [dispatch])
  return memoizedDispatch
}

export function useHotkey<T extends UseEventTarget>(
  hotkey: string | ReadonlyArray<string>,
  fn?: Handler,
  opts?: UseKeyOptions<T>,
  deps?: DependencyList,
) {
  return useKey(isHotkey(hotkey), fn, opts, deps)
}
