const waitElement = require('../libs/waitElement')
import extension from '../libs/extensionSwicher'
import toggleTooltip from '../libs/toggleTooltip'

const tooltipText = {
  active: chrome.i18n.getMessage('tooltipText_active') as string,
  inactive: chrome.i18n.getMessage('tooltipText_inactive') as string
}

const initialTooltipText = () => {
  if (extension.isExtensionActioning) {
    return tooltipText.inactive
  } else {
    return tooltipText.active
  }
}

const extensionToggleButton = `
  <button id="oypb-toggleExtension" class="ytp-button oypb-toggleExtensionButton oypb-tooltip" data-oypb-tooltip="${initialTooltipText()}">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 16">
      <path id="oypb-toggle" fill="#fff" d="M0 0h18v5H0zm6.78 5v5.39H3.39L9 16l5.61-5.61h-3.39V5H6.78z"/>
    </svg>
  </button>
`

const setToggleExtensionEvent = () => {
  const button = document.getElementById('oypb-toggleExtension') as HTMLElement

  button.addEventListener('click', extension.toggle)
  button.addEventListener('click', e =>
    toggleTooltip(e, tooltipText.active, tooltipText.inactive)
  )
}

export const injectButton = async () => {
  // Wait target node.
  const playerBar = document.querySelector('.ytp-chrome-bottom')
  const rightControls = await waitElement(playerBar, '.ytp-right-controls')

  // Inject button dom.
  rightControls.insertAdjacentHTML('afterbegin', extensionToggleButton)

  // Set Events.
  setToggleExtensionEvent()
}

export const removeButton = () => {
  const button = document.getElementById('oypb-toggleExtension')
  if (button) button.remove()
}
