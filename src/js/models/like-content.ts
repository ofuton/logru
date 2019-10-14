import { ContentBase } from "./content-base";
import { PageType } from "../enums/page-type";
import { ActionType } from "../enums/action-type";

class LikePostContent implements ContentBase {
  title: string;  content: string;
  pageType: import("../enums/page-type").PageType;
  actionType: import("../enums/action-type").ActionType;
  
  constructor(title: string, content: string, pageType: PageType, actionType: ActionType) {
    this.title = title;
    this.content = content;
    this.pageType = pageType;
    this.actionType = actionType;
  }
}

export { LikePostContent }
