import { extensionBehavior } from '@/core/repositories/contentScript.repository.js'

// TODO
export const useExtenstionBehavior = () => {
  extensionBehavior.getValue()
}

// todo
export const useBarPosition = (): 'outside' | 'inside' => {
  return 'outside' as const
  // return extensionBehavior.getValue().barPosition
}
