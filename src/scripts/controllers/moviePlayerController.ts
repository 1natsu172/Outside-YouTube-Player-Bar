export async function moviePlayerController(moviePlayer: Element) {
  const mousemoveEvent = new Event('mousemove')

  return {
    mousemove() {
      moviePlayer.dispatchEvent(mousemoveEvent)
    },
  }
}
