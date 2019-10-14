/**
 * @fileoverview 今いるページが何のページか判定する
 */

import { PageType } from '../enums/page-type';
import { ActionType } from '../enums/action-type';

type DetectPageDto = {
  pageType: PageType
  actionType: ActionType
  matchedGroups: string[]
}

const detectPage = (): DetectPageDto => {
  const pathname = location.pathname
  const hash = location.hash
  const url = pathname + hash;

  if (PageType.regex(PageType.RECORD_COMMENT).test(url)) {
    const groups = url.match(PageType.regex(PageType.RECORD_COMMENT))['groups'];
    return {
      pageType: PageType.RECORD_COMMENT,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.RECORD_DETAIL).test(url)) {
    const groups = url.match(PageType.regex(PageType.RECORD_DETAIL))['groups'];
    return {
      pageType: PageType.RECORD_DETAIL,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.RECORD_INDEX).test(url)) {
    const groups = url.match(PageType.regex(PageType.RECORD_INDEX))['groups'];
    return {
      pageType: PageType.RECORD_INDEX,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.THREAD_COMMENT).test(url)) {
    const groups = url.match(PageType.regex(PageType.THREAD_COMMENT))['groups'];
    return {
      pageType: PageType.THREAD_COMMENT,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.THREAD_POST).test(url)) {
    const groups = url.match(PageType.regex(PageType.THREAD_POST))['groups'];
    return {
      pageType: PageType.THREAD_POST,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.THREAD_INDEX).test(url)) {
    const groups = url.match(PageType.regex(PageType.THREAD_INDEX))['groups'];
    return {
      pageType: PageType.THREAD_INDEX,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.PEOPLE_COMMENT).test(url)) {
    const groups = url.match(PageType.regex(PageType.PEOPLE_COMMENT))['groups'];
    return {
      pageType: PageType.PEOPLE_COMMENT,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.PEOPLE_POST).test(url)) {
    const groups = url.match(PageType.regex(PageType.PEOPLE_POST))['groups'];
    return {
      pageType: PageType.PEOPLE_POST,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.PEOPLE_INDEX).test(url)) {
    const groups = url.match(PageType.regex(PageType.PEOPLE_INDEX))['groups'];
    return {
      pageType: PageType.PEOPLE_INDEX,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.MESSAGE_POST).test(url)) {
    const groups = url.match(PageType.regex(PageType.MESSAGE_POST))['groups'];
    return {
      pageType: PageType.MESSAGE_POST,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.MESSAGE_INDEX).test(url)) {
    const groups = url.match(PageType.regex(PageType.MESSAGE_INDEX))['groups'];
    return {
      pageType: PageType.MESSAGE_INDEX,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.NOTIFICATION_MESSAGE_POST).test(url)) {
    const groups = url.match(PageType.regex(PageType.NOTIFICATION_MESSAGE_POST))['groups'];
    return {
      pageType: PageType.NOTIFICATION_MESSAGE_POST,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.NOTIFICATION_PEOPLE_COMMENT).test(url)) {
    const groups = url.match(PageType.regex(PageType.NOTIFICATION_PEOPLE_COMMENT))['groups'];
    return {
      pageType: PageType.NOTIFICATION_PEOPLE_COMMENT,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.NOTIFICATION_PEOPLE_POST).test(url)) {
    const groups = url.match(PageType.regex(PageType.NOTIFICATION_PEOPLE_POST))['groups'];
    return {
      pageType: PageType.NOTIFICATION_PEOPLE_POST,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.NOTIFICATION_THREAD_COMMENT).test(url)) {
    const groups = url.match(PageType.regex(PageType.NOTIFICATION_THREAD_COMMENT))['groups'];
    return {
      pageType: PageType.NOTIFICATION_THREAD_COMMENT,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  else if (PageType.regex(PageType.NOTIFICATION_THREAD_POST).test(url)) {
    const groups = url.match(PageType.regex(PageType.NOTIFICATION_THREAD_POST))['groups'];
    return {
      pageType: PageType.NOTIFICATION_THREAD_POST,
      actionType: ActionType.VISIT,
      matchedGroups: groups
    }
  }

  return {
    pageType: PageType.UNKNOWN,
    actionType: ActionType.UNKNOWN,
    matchedGroups: []
  }
}

export { detectPage, DetectPageDto }
