import { waitElement } from '@1natsu/wait-element'
import { NodeLike } from '@1natsu/wait-element/dist/types/options'
import { extensionSwitcher } from '../controllers/extensionSwicher'
import toggleTooltip from '../usecases/toggleTooltip'
import { hasInjected, isActive } from '../repository/extensionState'

/**
 * about UIs
 */

const tooltipText = {
  isActive: chrome.i18n.getMessage('tooltipText_isActive') as string,
  isInactive: chrome.i18n.getMessage('tooltipText_isInactive') as string,
}

const initialTooltipText = (): string => {
  if (!hasInjected()) {
    console.log('Tooltip: Init tooltip mode')
    return tooltipText.isActive
  } else {
    console.log('Tooltip: NAVIGATING tooltip mode')
    return isActive() ? tooltipText.isActive : tooltipText.isInactive
  }
}

const extensionToggleButton = (): string => `
  <button id="oypb-toggleExtension" class="ytp-button oypb-toggleExtensionButton oypb-tooltip" data-oypb-tooltip="${initialTooltipText()}">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 16">
      <path id="oypb-toggle" fill="#fff" d="M0 0h18v5H0zm6.78 5v5.39H3.39L9 16l5.61-5.61h-3.39V5H6.78z"/>
    </svg>
  </button>
`

/**
 * META LOGICS
 */

const setExtensionButtonEvent = (): void => {
  const button = document.getElementById('oypb-toggleExtension') as HTMLElement

  button.addEventListener('click', extensionSwitcher.toggle)
  button.addEventListener('click', (e) =>
    toggleTooltip(e, tooltipText.isActive, tooltipText.isInactive),
  )
}

export const injectButton = async (): Promise<void> => {
  console.log('INJECTING BUTTON...')
  // Wait target node.
  const playerBar = document.querySelector('.ytp-chrome-bottom') as NodeLike
  const rightControls = await waitElement('.ytp-right-controls', {
    target: playerBar,
  })
  const button = extensionToggleButton()

  // Inject button dom.
  rightControls.insertAdjacentHTML('afterbegin', button)

  // Set Events.
  setExtensionButtonEvent()
}

export const removeButton = (): void => {
  console.log('REMOVING BUTTON...')
  const button = document.getElementById('oypb-toggleExtension')
  if (button) button.remove()
}
