import { useMemo } from 'react'
import ToggleIcon from '@/public/images/oypb-toggle.svg'
import { useBarPosition } from '@/core/services/behaviorServices/index.service.js'

export const OypbButton = () => {
  const currentBarPosition = useBarPosition()
  const tooltipText = useMemo(
    () =>
      currentBarPosition === 'outside'
        ? browser.i18n.getMessage('tooltipText_toInside')
        : browser.i18n.getMessage('tooltipText_toOutside'),
    [currentBarPosition],
  )

  return (
    <button
      id="oypb-toggleExtension"
      className="ytp-button oypb-toggleExtensionButton oypb-tooltip"
      data-oypb-tooltip={tooltipText}
    >
      <ToggleIcon />
    </button>
  )
}
