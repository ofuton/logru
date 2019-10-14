/**
 * @fileoverview logruで監視したいページのタイプ
 */

enum PageType {
  PEOPLE_COMMENT,
  PEOPLE_INDEX,
  PEOPLE_POST,
  RECORD_COMMENT,
  RECORD_DETAIL,
  RECORD_INDEX,
  THREAD_COMMENT,
  THREAD_INDEX,
  THREAD_POST,
  MESSAGE_INDEX,
  MESSAGE_POST,
  NOTIFICATION_THREAD_INDEX,
  NOTIFICATION_THREAD_POST, // 現状、コメントと同じURLなので入る系はない TODO
  NOTIFICATION_THREAD_COMMENT,
  NOTIFICATION_PEOPLE_POST, // 現状、コメントと同じURLなので入る系はない TODO
  NOTIFICATION_PEOPLE_COMMENT,
  NOTIFICATION_MESSAGE_POST,
  UNKNOWN
}

namespace PageType {
  export function regex(type: PageType): RegExp | null {
    const PEOPLE_PREFIX = '^/k/#/people/user/(?<userCode>.+)'
    const RECORD_PREFIX = '^/k/\\d+/'
    const THREAD_PREFIX = '^/k/#/space/(?<spaceId>\\d+)/thread/(?<threadId>\\d+)'
    const MESSAGE_PREFIX = '^/k/#/message/(?<myCode>\\d+);(?<otherCode>\\d+)'
    const NOTIFICATION_THREAD_PREFIX  = '^/k/#/ntf/(?<filterName>.+)/k/space/s'
    const NOTIFICATION_PEOPLE_PREFIX  = '^/k/#/ntf/(?<filterName>.+)/k/people/p'
    const NOTIFICATION_RECORD_PREFIX  = '^/k/#/ntf/(?<filterName>.+)/k/a'
    const NOTIFICATION_MESSAGE_PREFIX = '^/k/#/ntf/(?<filterName>.+)/k/p2p/m'

    switch (type) {
      /** People */
      case PageType.PEOPLE_COMMENT:
        return RegExp(PEOPLE_PREFIX + '/(?<postId>\\d+)/(?<commentId>\\d+)')
      case PageType.PEOPLE_POST:
        return RegExp(PEOPLE_PREFIX + '/(?<postId>\\d+)')
      case PageType.PEOPLE_INDEX:
        return RegExp(PEOPLE_PREFIX)
      /** Record */
      case PageType.RECORD_COMMENT:
        return RegExp(RECORD_PREFIX + 'show#record=(?<recordId>\\d+)&comment=(?<commentId>\\d+)')
      case PageType.RECORD_DETAIL:
        return RegExp(RECORD_PREFIX + 'show#record=(?<recordId>\\d+)')
      case PageType.RECORD_INDEX:
        return RegExp(RECORD_PREFIX)
      /** Thread */
      case PageType.THREAD_COMMENT:
        return RegExp(THREAD_PREFIX + '/(?<postId>\\d+)/(?<commentId>\\d+)')
      case PageType.THREAD_POST:
        return RegExp(THREAD_PREFIX + '/(?<postId>\\d+)')
      case PageType.THREAD_INDEX:
        return RegExp(THREAD_PREFIX)
      /** Message */
      case PageType.MESSAGE_POST:
        return RegExp(MESSAGE_PREFIX + '/(?<postId>\\d+)')
      case PageType.MESSAGE_INDEX:
        return RegExp(MESSAGE_PREFIX)
      /** Notifications */
      /** Notification Thread */
      case PageType.NOTIFICATION_THREAD_COMMENT:
        return RegExp(NOTIFICATION_THREAD_PREFIX + ':(?<spaceId>\\d+):(?<threadId>\\d+):(?<postId>\\d+):/(?<notificationId>\\d+)')
      case PageType.NOTIFICATION_THREAD_POST:
        return RegExp(NOTIFICATION_THREAD_PREFIX + ':(?<spaceId>\\d+):(?<threadId>\\d+):(?<postId>\\d+):/(?<notificationId>\\d+)')
      case PageType.NOTIFICATION_THREAD_INDEX:
        return RegExp(NOTIFICATION_THREAD_PREFIX)
      /** Notification People */
      case PageType.NOTIFICATION_PEOPLE_COMMENT:
        return RegExp(NOTIFICATION_PEOPLE_PREFIX + ':(?<userId>\\d+):(?<postId>\\d+):/(?<notificationId>\\d+)')
      case PageType.NOTIFICATION_PEOPLE_POST:
        return RegExp(NOTIFICATION_PEOPLE_PREFIX + ':(?<userId>\\d+):(?<postId>\\d+):/(?<notificationId>\\d+)')
      /** Notification Message */
      case PageType.NOTIFICATION_MESSAGE_POST:
        return RegExp(NOTIFICATION_MESSAGE_PREFIX + ':(?<postId>\\d+):/(?<notificationId>\\d+)')

      case PageType.UNKNOWN:
      default:
        return null
    }
  }
}

export { PageType }
