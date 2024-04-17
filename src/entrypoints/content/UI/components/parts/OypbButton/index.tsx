/// <reference types="vite-plugin-svgr/client" />

import { useMemo } from 'react'
import ToggleIcon from '@/public/images/oypb-toggle.svg?react'
import { useBarPosition } from '@/core/services/behaviorServices/index.service.js'
import style from './style.module.css'

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
    <div>
      <span className={style.tooltip}>{tooltipText}</span>
      <button
        id="oypb-toggleExtension"
        className="ytp-button oypb-toggleExtensionButton oypb-tooltip"
      >
        <ToggleIcon />
      </button>
    </div>
  )
}
