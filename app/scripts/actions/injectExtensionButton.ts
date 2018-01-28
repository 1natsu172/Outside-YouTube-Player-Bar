const waitElement = require('../libs/waitElement')
import extension from '../libs/extensionSwicher'

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

function toggleTooltipText(e: any, f: string, s: string) {
  const element: HTMLElement = e.target || this
  const firstText = f
  const secondText = s
  const currentText = element.getAttribute('data-oypb-tooltip')

  let text = firstText
  if (currentText === firstText) {
    text = secondText
  }
  element.setAttribute('data-oypb-tooltip', text)
}

export default async () => {
  const playerBar = document.querySelector('.ytp-chrome-bottom')
  // inject button dom.
  const rightControls = await waitElement(playerBar, '.ytp-right-controls')
  rightControls.insertAdjacentHTML('afterbegin', extensionToggleButton)

  // regist listeners.
  const toggleExtension = document.getElementById(
    'oypb-toggleExtension'
  ) as HTMLElement
  toggleExtension.addEventListener('click', extension.toggle)
  toggleExtension.addEventListener('click', e =>
    toggleTooltipText(e, tooltipText.active, tooltipText.inactive)
  )
}
