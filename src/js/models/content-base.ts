import { PageType } from "../enums/page-type";
import { ActionType } from "../enums/action-type";

export interface ContentBase {
  title: string;
  content: string;
  pageType: PageType;
  actionType: ActionType;
}
