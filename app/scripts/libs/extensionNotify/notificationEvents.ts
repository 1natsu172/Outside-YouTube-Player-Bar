const CHANGELOG_URL =
  'https://github.com/1natsu172/Outside-YouTube-Player-Bar/blob/master/CHANGELOG.md'

export const onClickNotification = (id: string) => {
  chrome.notifications.onClicked.addListener(notificationId => {
    console.log('ID~~~~~~~~~~', notificationId)

    if (notificationId === id) {
      window.open(CHANGELOG_URL, '_blank')
    }
  })
}
