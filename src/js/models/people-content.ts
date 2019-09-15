import { PageType } from "../enums/page-type";
import { ActionType } from "../enums/action-type";
import { ContentBase } from "./content-base";

class PeopleIndexContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  userCode: string;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, userCode: string) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.userCode = userCode;
  }
}

class PeoplePostContent implements ContentBase {
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

class PeopleCommentContent implements ContentBase {
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

export { PeopleIndexContent, PeoplePostContent, PeopleCommentContent };
