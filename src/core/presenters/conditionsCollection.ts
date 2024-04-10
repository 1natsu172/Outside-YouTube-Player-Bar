import { isVideoPage } from './judgePage'
import { hasInjected, isActive } from '../repositories/extensionState'

export const conditionsCollection = {
  // handle extension.active
  isActiveReady() {
    return isVideoPage() && !hasInjected()
  },

  // handle extension.inactive
  isInactiveReady() {
    return !isVideoPage() && hasInjected() && isActive()
  },
}
