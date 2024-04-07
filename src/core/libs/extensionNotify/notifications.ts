import { onClickNotification } from './notificationEvents'
import iconUrl from '../../../images/icon-128.png'

const NOTIFICATION_ID = browser.runtime.getManifest().name

type NotifyType = 'install' | 'update'

const notifyOptions = (
  notifyType: NotifyType
): browser.notifications.NotificationOptions<true> => {
  const title =
    notifyType === 'install'
      ? browser.i18n.getMessage('notifications_install_title')
      : browser.i18n.getMessage('notifications_update_title')

  const message =
    notifyType === 'install'
      ? browser.i18n.getMessage('notifications_install_message')
      : browser.i18n.getMessage('notifications_update_message_special')
          .length !== 0
      ? browser.i18n.getMessage('notifications_update_message_special')
      : browser.i18n.getMessage('notifications_update_message')

  return {
    type: 'basic',
    title,
    message,
    iconUrl: iconUrl,
  }
}

export const notification = (details: browser.runtime.InstalledDetails) => {
  /**
   * @description clear reason: always show notification. update method is not re-push behavior.
   * @see https://stackoverflow.com/questions/26350747/chrome-notifications-update-or-create
   */
  browser.notifications.clear(NOTIFICATION_ID, () => {
    if (details.reason === 'install') {
      // Welcome notification.
      browser.notifications.create(
        NOTIFICATION_ID,
        notifyOptions(details.reason)
      )
      onClickNotification(NOTIFICATION_ID)
    }

    if (details.reason === 'update') {
      // Update infomation.
      browser.notifications.create(
        NOTIFICATION_ID,
        notifyOptions(details.reason)
      )
      onClickNotification(NOTIFICATION_ID)
    }
  })
}
