export async function moviePlayerController(moviePlayer: Element) {
  const mousedownEvent = new Event('mousedown')
  const mousemoveEvent = new Event('mousemove')
  // const mouseoverEvent = new Event("mouseover");
  // const mouseleaveEvent = new Event("mouseleave");

  return {
    mousemove() {
      // mousedownしておかないとmousemoveバー表示が効かないので雑に呼んでおく
      moviePlayer.dispatchEvent(mousedownEvent)
      moviePlayer.dispatchEvent(mousemoveEvent)
    },
  }
}
