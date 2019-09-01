/**
 * @fileoverview 今いるページが何のページか判定する
 */

import { PageType } from '../enum/page-type';

const detectPage = () => {
  const pathname = location.pathname
  const hash = location.hash

  if (PageType.regex(PageType.RECORD_COMMENT).test(pathname + hash)) {
    return PageType.RECORD_COMMENT
  }

  else if (PageType.regex(PageType.RECORD_DETAIL).test(pathname + hash)) {
    return PageType.RECORD_DETAIL
  }

  else if (PageType.regex(PageType.RECORD_INDEX).test(pathname + hash)) {
    return PageType.RECORD_INDEX
  }

  else if (PageType.regex(PageType.THREAD_COMMENT).test(pathname + hash)) {
    return PageType.THREAD_COMMENT
  }

  else if (PageType.regex(PageType.THREAD_POST).test(pathname + hash)) {
    return PageType.THREAD_POST
  }

  else if (PageType.regex(PageType.THREAD_INDEX).test(pathname + hash)) {
    return PageType.THREAD_INDEX
  }

  else if (PageType.regex(PageType.PEOPLE_COMMENT).test(pathname + hash)) {
    return PageType.PEOPLE_COMMENT
  }

  else if (PageType.regex(PageType.PEOPLE_POST).test(pathname + hash)) {
    return PageType.PEOPLE_POST
  }

  else if (PageType.regex(PageType.PEOPLE_INDEX).test(pathname + hash)) {
    return PageType.PEOPLE_INDEX
  }

  return PageType.UNKNOWN
}

export { detectPage }