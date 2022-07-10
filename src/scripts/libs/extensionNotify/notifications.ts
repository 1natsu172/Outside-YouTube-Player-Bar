import { onClickNotification } from './notificationEvents'

const NOTIFICATION_ID = chrome.runtime.getManifest().name

type NotifyType = 'install' | 'update'

const notifyOptions = (
  notifyType: NotifyType,
): chrome.notifications.NotificationOptions<true> => {
  const title =
    notifyType === 'install'
      ? chrome.i18n.getMessage('notifications_install_title')
      : chrome.i18n.getMessage('notifications_update_title')

  const message =
    notifyType === 'install'
      ? chrome.i18n.getMessage('notifications_install_message')
      : chrome.i18n.getMessage('notifications_update_message_special')
          .length !== 0
      ? chrome.i18n.getMessage('notifications_update_message_special')
      : chrome.i18n.getMessage('notifications_update_message')

  return {
    type: 'basic',
    title,
    message,
    iconUrl: '../../../images/icon-128.png',
  }
}

export const notification = (details: chrome.runtime.InstalledDetails) => {
  /**
   * @description clear reason: always show notification. update method is not re-push behavior.
   * @see https://stackoverflow.com/questions/26350747/chrome-notifications-update-or-create
   */
  chrome.notifications.clear(NOTIFICATION_ID, () => {
    if (details.reason === 'install') {
      // Welcome notification.
      chrome.notifications.create(
        NOTIFICATION_ID,
        notifyOptions(details.reason),
      )
      onClickNotification(NOTIFICATION_ID)
    }

    if (details.reason === 'update') {
      // Update infomation.
      chrome.notifications.create(
        NOTIFICATION_ID,
        notifyOptions(details.reason),
      )
      onClickNotification(NOTIFICATION_ID)
    }
  })
}
