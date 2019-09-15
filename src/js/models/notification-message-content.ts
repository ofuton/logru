import { ContentBase } from "./content-base";
import { PageType } from "../enums/page-type";
import { ActionType } from "../enums/action-type";


class NotificationMessagePostContent implements ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
  myCode: number;
  otherCode: number;
  postId: number;

  constructor(title: string, content: string, pageType: PageType, actionType: ActionType, myCode: number, otherCode: number, postId: number) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
    this.myCode = myCode;
    this.otherCode = otherCode;
    this.postId = postId;
  }
}

export { NotificationMessagePostContent }
