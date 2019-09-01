/**
 * @fileoverview 今いるページが何のページか判定する
 */

import { PageType } from '../enum/page-type';

const detectPage = () => {
  const pathname = location.pathname
  const hash = location.hash

  if (PageType.regex(PageType.RECORD_COMMENT).test(pathname + hash)) {
    return "record comment"
  }

  else if (PageType.regex(PageType.RECORD_DETAIL).test(pathname + hash)) {
    return "record detail"
  }

  else if (PageType.regex(PageType.RECORD_INDEX).test(pathname + hash)) {
    return "record index"
  }

  else if (PageType.regex(PageType.THREAD_COMMENT).test(pathname + hash)) {
    return "thread comment"
  }

  else if (PageType.regex(PageType.THREAD_POST).test(pathname + hash)) {
    return "thread post"
  }

  else if (PageType.regex(PageType.THREAD_INDEX).test(pathname + hash)) {
    return "thread index"
  }

  else if (PageType.regex(PageType.PEOPLE_COMMENT).test(pathname + hash)) {
    return "people comment"
  }

  else if (PageType.regex(PageType.PEOPLE_POST).test(pathname + hash)) {
    return "people post"
  }

  else if (PageType.regex(PageType.PEOPLE_INDEX).test(pathname + hash)) {
    return "people index"
  }

  return PageType.UNKNOWN
}

export { detectPage }