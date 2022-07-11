const CHANGELOG_URL =
  'https://github.com/1natsu172/Outside-YouTube-Player-Bar/releases'

export const onClickNotification = (id: string) => {
  const onClickCallback = (notificationId: string) => {
    if (notificationId === id) {
      window.open(CHANGELOG_URL, '_blank')
    }
  }

  chrome.notifications.onClicked.addListener(onClickCallback)
  chrome.notifications.onButtonClicked.addListener(onClickCallback)
}
