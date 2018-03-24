import waitElement from '@1natsu/wait-element'
import extension from './extensionSwicher'
import state from '../libs/stateMap'
import toggleTooltip from '../libs/toggleTooltip'

const tooltipText = {
  isActive: chrome.i18n.getMessage('tooltipText_isActive') as string,
  isInactive: chrome.i18n.getMessage('tooltipText_isInactive') as string
}

const initialTooltipText = (): string => {
  if (!state.get('hasInjected')) {
    console.log('Tooltip: Init tooltip mode')
    return tooltipText.isActive
  } else {
    console.log('Tooltip: NAVIGATING tooltip mode')
    return state.get('isActive') ? tooltipText.isActive : tooltipText.isInactive
  }
}

const extensionToggleButton = (): string => `
  <button id="oypb-toggleExtension" class="ytp-button oypb-toggleExtensionButton oypb-tooltip" data-oypb-tooltip="${initialTooltipText()}">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 16">
      <path id="oypb-toggle" fill="#fff" d="M0 0h18v5H0zm6.78 5v5.39H3.39L9 16l5.61-5.61h-3.39V5H6.78z"/>
    </svg>
  </button>
`

const setExtensionButtonEvent = (): void => {
  const button = document.getElementById('oypb-toggleExtension') as HTMLElement

  button.addEventListener('click', extension.toggle)
  button.addEventListener('click', e =>
    toggleTooltip(e, tooltipText.isActive, tooltipText.isInactive)
  )
}

export const injectButton = async (): Promise<void> => {
  console.log('INJECTING BUTTON...')
  // Wait target node.
  const playerBar = document.querySelector('.ytp-chrome-bottom')
  const rightControls = await waitElement('.ytp-right-controls', {
    target: playerBar
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
