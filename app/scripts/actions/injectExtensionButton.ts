const waitElement = require('../libs/waitElement')
import extension from '../libs/extensionSwicher'

const extensionToggleButton = `
  <button id="oypb-toggleExtension" class="ytp-button ytp-settings-button ytp-right-controls__oypb-toggleExtensionButton" aria-haspopup="true" title="Outside player bar">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 16">
      <path id="oypb-toggle" fill="#fff" d="M0 0h18v5H0zm6.78 5v5.39H3.39L9 16l5.61-5.61h-3.39V5H6.78z"/>
    </svg>
  </button>
`

export default async () => {
  const playerBar = document.querySelector('.ytp-chrome-bottom')
  const rightControls = await waitElement(playerBar, '.ytp-right-controls')
  rightControls.insertAdjacentHTML('afterbegin', extensionToggleButton)

  const toggleExtension = document.getElementById(
    'oypb-toggleExtension'
  ) as HTMLElement
  toggleExtension.addEventListener('click', extension.toggle)
}
