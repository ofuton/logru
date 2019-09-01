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
  UNKNOWN
}

namespace PageType {
  export function regex(type: PageType) {
    const PEOPLE_PREFIX = '^/k/#/people/user/.+'
    const RECORD_PREFIX = '^/k/\\d+/'
    const THREAD_PREFIX = '^/k/#/space/\\d+/thread/\\d+'

    switch (type) {
      case PageType.PEOPLE_COMMENT:
        return RegExp(PEOPLE_PREFIX + '\\d+/\\d+')
      case PageType.PEOPLE_POST:
        return RegExp(PEOPLE_PREFIX + '\\d+')
      case PageType.PEOPLE_INDEX:
        return RegExp(PEOPLE_PREFIX)
      case PageType.RECORD_COMMENT:
        return RegExp(RECORD_PREFIX + 'show#record=\\d+&comment=\\d+')
      case PageType.RECORD_DETAIL:
        return RegExp(RECORD_PREFIX + 'show#record=\\d+')
      case PageType.RECORD_INDEX:
        return RegExp(RECORD_PREFIX)
      case PageType.THREAD_COMMENT:
        return RegExp(THREAD_PREFIX + '/\\d+/\\d+')
      case PageType.THREAD_POST:
        return RegExp(THREAD_PREFIX + '/\\d+')
      case PageType.THREAD_INDEX:
        return RegExp(THREAD_PREFIX)

      case PageType.UNKNOWN:
      default:
        return null
    }
  }
}

export { PageType }
