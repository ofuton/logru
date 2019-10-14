import { PageType } from '../enums/page-type';
import { ThreadIndexContent, ThreadPostContent, ThreadCommentContent } from '../models/thread-content';
import { PeopleIndexContent, PeoplePostContent, PeopleCommentContent } from '../models/people-content';
import { RecordIndexContent, RecordDetailContent, RecordCommentContent } from '../models/record-content';
import { ContentBase } from '../models/content-base';
import { ActionType } from '../enums/action-type';
import { DetectPageDto } from './detect-page';
import { MessageIndexContent, MessagePostContent } from '../models/message-content';
import { NotificationMessagePostContent } from '../models/notification-message-content';
import { NotificationPeopleCommentContent, NotificationPeoplePostContent } from '../models/notification-people-content';
import { NotificationThreadCommentContent, NotificationThreadPostContent, NotificationThreadIndexContent } from '../models/notification-thread-content';
import { appendHistoryToLocalStorage } from './local-storage-util';
import { LikePostContent } from '../models/like-content';

const extractContentsByActionType = (target: DetectPageDto, element: Element) => {
  switch (target.actionType) {
    case ActionType.LIKE:
      return extractLikedPost(target, element);
    default:
      return null;
  }
}

// ページ遷移時はコメントなどのコンポーネントが描画されていないので、PageTypeによって特定のコンポーネントを待つ必要がある
const extractContentsByPageType = (target: DetectPageDto) => {
  if (target.pageType === PageType.PEOPLE_POST) {
    waitRenderingContentsBodyOcean('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.PEOPLE_COMMENT) {
    waitRenderingContentsBodyOcean('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.THREAD_POST) {
    waitRenderingContentsBodyOcean('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.THREAD_COMMENT) {
    waitRenderingContentsBodyOcean('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.THREAD_INDEX) {
    waitRenderingContentsBodyOcean('.ocean-space-thread-name', target);
  } else if (target.pageType === PageType.MESSAGE_POST) {
    waitRenderingContentsBodyOcean('.ocean-message-header-title', target);
  } else if (target.pageType === PageType.MESSAGE_INDEX) {
    waitRenderingContentsBodyOcean('.ocean-message-header-title', target);
  } else if (target.pageType === PageType.NOTIFICATION_MESSAGE_POST) {
    waitRenderingNtfTwoPaneContents('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.NOTIFICATION_PEOPLE_COMMENT) {
    waitRenderingNtfTwoPaneContents('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.NOTIFICATION_PEOPLE_POST) {
    waitRenderingNtfTwoPaneContents('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.NOTIFICATION_THREAD_INDEX) {
    waitRenderingNtfTwoPaneContents('', target);
  } else if (target.pageType === PageType.NOTIFICATION_THREAD_POST) {
    waitRenderingNtfTwoPaneContents('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text', target);
  } else if (target.pageType === PageType.NOTIFICATION_THREAD_COMMENT) {
    waitRenderingNtfTwoPaneContents('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text', target);
  } else if (
    target.pageType === PageType.RECORD_INDEX ||
    target.pageType === PageType.RECORD_DETAIL ||
    target.pageType === PageType.RECORD_COMMENT
  ) {
    appendHistoryToLocalStorage({
      pageType: target.pageType,
      actionType: target.actionType,
      value: extractPageContents(target),
      timestamp: new Date()
    })
  } else {
    console.log("");
  }
}

const extractPageContents = (target: DetectPageDto): ContentBase => {
  switch (target.pageType) {
    case PageType.THREAD_INDEX:
      return extractThreadIndexContent(target);
    case PageType.THREAD_POST:
      return extractThreadPostContent(target);
    case PageType.THREAD_COMMENT:
      return extractThreadCommentContent(target);
    case PageType.PEOPLE_INDEX:
      return extractPeopleIndexContent(target);
    case PageType.PEOPLE_POST:
      return extractPeoplePostContent(target);
    case PageType.PEOPLE_COMMENT:
      return extractPeopleCommentContent(target);
    case PageType.RECORD_INDEX:
      return extractRecordIndexContent();
    case PageType.RECORD_DETAIL:
      return extractRecordDetailContent();
    case PageType.RECORD_COMMENT:
      return extractRecordCommentContent(target);
    case PageType.MESSAGE_POST:
      return extractMessagePostContent(target);
    case PageType.MESSAGE_INDEX:
      return extractMessageIndexContent(target);
    case PageType.NOTIFICATION_MESSAGE_POST:
      return extractNotificationMessagePostContent(target);
    case PageType.NOTIFICATION_PEOPLE_COMMENT:
      return extractNotificationPeopleCommentContent(target);
    case PageType.NOTIFICATION_PEOPLE_POST:
      return extractNotificationPeoplePostContent(target);
    case PageType.NOTIFICATION_THREAD_COMMENT:
      return extractNotificationThreadCommentContent(target);
    case PageType.NOTIFICATION_THREAD_POST:
      return extractNotificationThreadPostContent(target);
    case PageType.NOTIFICATION_THREAD_INDEX:
      return extractNotificationThreadIndexContent(target);
  }
};

const extractThreadIndexContent = (target: DetectPageDto): ThreadIndexContent => {
  const title: string = document.querySelector('.ocean-space-thread-name').textContent;
  const test: string = '';
  const threadId = parseInt(target.matchedGroups['threadId']);
  return new ThreadIndexContent(title, test, PageType.THREAD_INDEX, ActionType.VISIT, threadId);
}

const extractThreadPostContent = (target: DetectPageDto): ThreadPostContent => {
  const title: string = document.querySelector('.ocean-space-thread-name').textContent;
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text').textContent;
  const threadId = parseInt(target.matchedGroups['threadId']);
  const postId = parseInt(target.matchedGroups['postId']);
  return new ThreadPostContent(title, content, PageType.THREAD_POST, ActionType.VISIT, threadId, postId);
}
const extractThreadCommentContent = (target: DetectPageDto): ThreadCommentContent => {
  const title: string = document.querySelector('.ocean-space-thread-name').textContent;
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text').textContent;
  const threadId = parseInt(target.matchedGroups['threadId']);
  const postId = parseInt(target.matchedGroups['postId']);
  const commentId = parseInt(target.matchedGroups['commentId']);
  return new ThreadCommentContent(title, content, PageType.THREAD_COMMENT, ActionType.VISIT, threadId, postId, commentId);
}

const extractPeopleIndexContent = (target: DetectPageDto): PeopleIndexContent => {
  const title: string = target.matchedGroups['userCode'] + 'のピープル';
  const test: string = '';
  const userCode: string = target.matchedGroups['userCode'];
  return new PeopleIndexContent(title, test, PageType.PEOPLE_INDEX, ActionType.VISIT, userCode);
}

const extractPeoplePostContent = (target: DetectPageDto): PeoplePostContent => {
  // 画像あり、リンクありを取得したいかも
  const title: string = target.matchedGroups['userCode'] + 'のピープル 投稿';
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text').textContent;
  const userCode: string = target.matchedGroups['userCode'];
  const postId = parseInt(target.matchedGroups['postId']);
  return new PeoplePostContent(title, content, PageType.PEOPLE_POST, ActionType.VISIT, userCode, postId);
}
const extractPeopleCommentContent = (target: DetectPageDto): PeopleCommentContent => {
  const title: string = target.matchedGroups['userCode'] + 'のピープル 返信';
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text').textContent;
  const userCode: string = target.matchedGroups['userCode'];
  const postId = parseInt(target.matchedGroups['postId']);
  const commentId = parseInt(target.matchedGroups['commentId']);
  return new PeopleCommentContent(title, content, PageType.PEOPLE_COMMENT, ActionType.VISIT, userCode, postId, commentId);
}

const extractRecordIndexContent = (): RecordIndexContent => {
  const title: string = cybozu.data.page.APP_DATA.name;
  const appId: number = parseInt(cybozu.data.page.APP_DATA.id);
  const selectedViewName: string = cybozu.data.page.VIEW_DATA.name;
  const viewId = cybozu.data.page.VIEW_DATA.viewId;
  return new RecordIndexContent(title, selectedViewName, PageType.RECORD_INDEX, ActionType.VISIT, appId, viewId);
}

const extractRecordDetailContent = (): RecordDetailContent => {
  const title: string = document.querySelector('.gaia-argoui-app-breadcrumb-record .gaia-argoui-app-breadcrumb-item').textContent;
  const appId: number = parseInt(cybozu.data.page.APP_DATA.id);
  const appName: string = cybozu.data.page.APP_DATA.name;
  const recordId = kintone.app.record.getId();
  return new RecordDetailContent(title, appName, PageType.RECORD_DETAIL, ActionType.VISIT, appId, recordId);
}

const extractRecordCommentContent = (target: DetectPageDto): RecordCommentContent => {
  const title: string = cybozu.data.page.APP_DATA.name;
  const appId: number = parseInt(cybozu.data.page.APP_DATA.id);
  // TODO: コメントは非同期で取ってくるので連続で叩くと取得するコメントがズレる
  const commentContent: string = document.querySelector('.itemlist-item-featured-gaia .commentlist-body-gaia').textContent;
  const recordId: number = parseInt(target.matchedGroups['recordId']);
  const commentId: number = parseInt(target.matchedGroups['commentId']);
  return new RecordCommentContent(title, commentContent, PageType.RECORD_COMMENT, ActionType.VISIT, appId, recordId, commentId);
}

const extractMessageIndexContent = (target: DetectPageDto): MessageIndexContent => {
  const title: string = document.querySelector('.ocean-message-header-title').textContent;
  const commentContent: string = '';
  const myCode: number = parseInt(target.matchedGroups['myCode']);
  const otherCode: number = parseInt(target.matchedGroups['otherCode']);
  return new MessageIndexContent(title, commentContent, PageType.MESSAGE_INDEX, ActionType.VISIT, myCode, otherCode);
}

const extractMessagePostContent = (target: DetectPageDto): MessagePostContent => {
  const title: string = document.querySelector('.ocean-message-header-title').textContent;
  const postContent: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text').textContent;
  const myCode: number = parseInt(target.matchedGroups['myCode']);
  const otherCode: number = parseInt(target.matchedGroups['otherCode']);
  const postId: number = parseInt(target.matchedGroups['postId'])
  return new MessagePostContent(title, postContent, PageType.MESSAGE_POST, ActionType.VISIT, myCode, otherCode, postId);
}

const extractNotificationMessagePostContent = (target: DetectPageDto): NotificationMessagePostContent => {
  const title: string = document.querySelector('.ocean-message-header-title').textContent;
  const postContent: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text').textContent;
  const myCode: number = 1;
  const otherCode: number = 2;
  const postId: number = parseInt(target.matchedGroups['postId']);
  return new NotificationMessagePostContent(title, postContent, PageType.NOTIFICATION_MESSAGE_POST, ActionType.VISIT, myCode, otherCode, postId);
}

const extractNotificationPeopleCommentContent = (target: DetectPageDto): NotificationPeopleCommentContent => {
  const title: string = document.querySelector('.gaia-argoui-people-cover-name').textContent + 'のピープル 返信';
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text').textContent;
  const profileLink = document.querySelector('.gaia-argoui-people-userprofile-breadcrumb .gaia-argoui-ntf-breadcrumb-item').getAttribute('href');
  const result = profileLink.match(PageType.regex(PageType.PEOPLE_INDEX));
  const userCode: string = result['groups']['userCode'];
  const postId = parseInt(target.matchedGroups['postId']);
  const commentId = parseInt(target.matchedGroups['commentId']);
  return new NotificationPeopleCommentContent(title, content, PageType.PEOPLE_COMMENT, ActionType.VISIT, userCode, postId, commentId);
}

const extractNotificationPeoplePostContent = (target: DetectPageDto): NotificationPeoplePostContent => {
  // 画像あり、リンクありを取得したいかも
  const title: string = document.querySelector('.gaia-argoui-people-cover-name').textContent + 'のピープル 投稿';
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text').textContent;
  const profileLink = document.querySelector('.gaia-argoui-people-userprofile-breadcrumb .gaia-argoui-ntf-breadcrumb-item').getAttribute('href');
  const result = profileLink.match(PageType.regex(PageType.PEOPLE_INDEX));
  const userCode: string = result['groups']['userCode'];
  const postId = parseInt(target.matchedGroups['postId']);
  return new NotificationPeoplePostContent(title, content, PageType.PEOPLE_POST, ActionType.VISIT, userCode, postId);
}

const extractNotificationThreadCommentContent = (target: DetectPageDto): NotificationThreadCommentContent => {
  const title: string = document.querySelector('.ocean-space-thread-name').textContent;
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-comment .ocean-ui-comments-commentbase-text').textContent;
  const threadId = parseInt(target.matchedGroups['threadId']);
  const postId = parseInt(target.matchedGroups['postId']);
  // const commentId = parseInt(target.matchedGroups['commentId']);
  return new NotificationThreadCommentContent(title, content, PageType.PEOPLE_POST, ActionType.VISIT, threadId, postId, 1);
}

const extractNotificationThreadPostContent = (target: DetectPageDto): NotificationThreadPostContent => {
  const title: string = document.querySelector('.ocean-space-thread-name').textContent;
  const content: string = document.querySelector('.ocean-ui-comments-commentbase-featured.ocean-ui-comments-post .ocean-ui-comments-commentbase-text').textContent;
  const threadId = parseInt(target.matchedGroups['threadId']);
  const postId = parseInt(target.matchedGroups['postId']);
  return new NotificationThreadPostContent(title, content, PageType.PEOPLE_POST, ActionType.VISIT, threadId, postId);
}

const extractNotificationThreadIndexContent = (target: DetectPageDto): NotificationThreadIndexContent => {
  const title: string = document.querySelector('.ocean-space-thread-name').textContent;
  const test: string = '';
  const threadId = parseInt(target.matchedGroups['threadId']);
  return new NotificationThreadIndexContent(title, test, PageType.PEOPLE_POST, ActionType.VISIT, threadId);
}

const extractLikedPost = (target: DetectPageDto, element: Element) => {
  const title: string = element.querySelector('.ocean-ui-comments-commentbase-text').textContent;
  const content: string = "いいねしました";
  appendHistoryToLocalStorage({
    pageType: target.pageType,
    actionType: target.actionType,
    value: new LikePostContent(title, content, target.pageType, ActionType.LIKE),
    timestamp: new Date()
  })
  return new LikePostContent(title, content, target.pageType, ActionType.LIKE);
};

const waitRenderingContentsBodyOcean = (checkElementSelector: string, target: DetectPageDto) => {
  let el: Element;
  let observer: MutationObserver;
  observer = new MutationObserver(() => {
    el = document.querySelector(checkElementSelector);
    if (el) {
      appendHistoryToLocalStorage({
        pageType: target.pageType,
        actionType: target.actionType,
        value: extractPageContents(target),
        timestamp: new Date()
      })
      observer.disconnect();
    }
  })
  observer.observe(document.querySelector('#contents-body-ocean'), { childList: true, subtree: true });
}

/**
 * contents-body-oceanを描画したあとにgaia-argoui-ntf-twopane-contentsの描画を待つ
 * @param checkElementSelector
 */
const waitRenderingNtfTwoPaneContents = (checkElementSelector: string, target: DetectPageDto) => {
  let el: Element;
  let twopaneObserver: MutationObserver;
  twopaneObserver = new MutationObserver((mutations) => {
    el = document.querySelector(checkElementSelector);
    if (el) {
      appendHistoryToLocalStorage({
        pageType: target.pageType,
        actionType: target.actionType,
        value: extractPageContents(target),
        timestamp: new Date()
      })
      twopaneObserver.disconnect();
    }
  })

  let contentsBodyObserver: MutationObserver;
  contentsBodyObserver = new MutationObserver(() => {
    el = document.querySelector('.gaia-argoui-ntf-twopane-contents');
    if (el) {
      twopaneObserver.observe(document.querySelector('.gaia-argoui-ntf-twopane-contents'), { childList: true, subtree: true })
      contentsBodyObserver.disconnect();
    }
  })

  contentsBodyObserver.observe(document.querySelector('#contents-body-ocean'), { childList: true, subtree: true });
}

export { extractPageContents, extractContentsByPageType, extractContentsByActionType }
