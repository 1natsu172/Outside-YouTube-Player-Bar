import { isVideo } from './judgePage'
import { hasInjected, isActive } from '../repository/extensionState'

export const handle = {
  // handle extension.active
  isActiveReady() {
    return isVideo() && !hasInjected()
  },

  // handle extension.inactive
  isInactiveReady() {
    return !isVideo() && hasInjected() && isActive()
  },
}
