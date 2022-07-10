import { waitElement } from '@1natsu/wait-element'
import { isActive } from '../repository/extensionState'

/**
 * @deprecated v2までビデオタイトルのマウスホバーでプレイヤーバーの開閉機能を提供していたが提供停止した
 */
export const willMouseEnterToPlayer = async () => {
  const movieTitleElement = await waitElement('h1.title')

  movieTitleElement &&
    movieTitleElement.addEventListener(
      'mouseenter',
      () => {
        if (isActive()) {
          document.body.classList.add('oypb-is-visible-playerBar')
        }
      },
      { passive: true },
    )
}
