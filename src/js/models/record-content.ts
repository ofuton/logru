import { ContentBase } from "./content-base";
import { PageType } from "../enums/page-type";
import { ActionType } from "../enums/action-type";

class RecordIndexContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  appId: number;
  viewId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, appId: number, viewId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.appId = appId;
    this.viewId = viewId;
  }
};

class RecordDetailContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  appId: number;
  recordId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, appId: number, recordId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.appId = appId;
    this.recordId = recordId;
  }
};

class RecordCommentContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  appId: number;
  recordId: number;
  commentId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, appId: number, recordId: number, commentId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.appId = appId;
    this.recordId = recordId;
    this.commentId = commentId;
  }
};

export { RecordIndexContent, RecordDetailContent, RecordCommentContent };
