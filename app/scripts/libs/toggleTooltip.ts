export default function toggleTooltipText(e: any, f: string, s: string) {
  const element: HTMLElement = e.target || e || this
  const firstText = f
  const secondText = s
  const currentText = element.getAttribute('data-oypb-tooltip')

  let text = firstText
  if (currentText === firstText) {
    text = secondText
  }
  element.setAttribute('data-oypb-tooltip', text)
}
