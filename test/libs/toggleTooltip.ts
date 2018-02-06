import test from 'ava'
import toggleTooltipText from '../../app/scripts/libs/toggleTooltip'

const buttonString = `
  <button id="oypb-toggleExtension" class="ytp-button oypb-toggleExtensionButton oypb-tooltip" data-oypb-tooltip="test-tooltipText2">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 16">
      <path id="oypb-toggle" fill="#fff" d="M0 0h18v5H0zm6.78 5v5.39H3.39L9 16l5.61-5.61h-3.39V5H6.78z"/>
    </svg>
  </button>
  `
document.body.insertAdjacentHTML('afterbegin', buttonString)

const tooltipText1: string = 'test-tooltipText1'
const tooltipText2: string = 'test-tooltipText2'

const tooltipTextTest = (expectedText: string) => {
  test('toggleTooltipText.js', t => {
    const button = document.getElementById(
      'oypb-toggleExtension'
    ) as HTMLElement

    toggleTooltipText(button, tooltipText1, tooltipText2)

    const currentText = button.getAttribute('data-oypb-tooltip')

    t.is(currentText, expectedText)
  })
}

tooltipTextTest(tooltipText1)
tooltipTextTest(tooltipText2)
