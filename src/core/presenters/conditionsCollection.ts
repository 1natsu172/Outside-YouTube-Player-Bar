import { isVideo } from './judgePage'
import { hasInjected, isActive } from '../infrastructures/repositories/extensionState'

export const conditionsCollection = {
  // handle extension.active
  isActiveReady() {
    return isVideo() && !hasInjected()
  },

  // handle extension.inactive
  isInactiveReady() {
    return !isVideo() && hasInjected() && isActive()
  },
}
