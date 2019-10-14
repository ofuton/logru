import { PageType } from "../enums/page-type";
import { ContentBase } from "./content-base";
import { ActionType } from "../enums/action-type";

class ThreadIndexContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  threadId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, threadId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.threadId = threadId;
  }
}

class ThreadPostContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  threadId: number;
  postId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, threadId: number, postId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.threadId = threadId;
    this.postId = postId;
  }
}

class ThreadCommentContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  threadId: number;
  postId: number;
  commentId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, threadId: number, postId: number, commentId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.threadId = threadId;
    this.postId = postId;
    this.commentId = commentId;
  }
}

export { ThreadIndexContent, ThreadPostContent, ThreadCommentContent }
