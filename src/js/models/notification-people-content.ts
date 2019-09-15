import { ContentBase } from "./content-base";
import { PageType } from "../enums/page-type";
import { ActionType } from "../enums/action-type";

class NotificationPeoplePostContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  userCode: string;
  postId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, userCode: string, postId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.userCode = userCode;
    this.postId = postId;
  }
}

class NotificationPeopleCommentContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  userCode: string;
  postId: number;
  commentId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, userCode: string, postId: number, commentId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.userCode = userCode;
    this.postId = postId;
    this.commentId = commentId;
  }
}

export { NotificationPeoplePostContent, NotificationPeopleCommentContent }
