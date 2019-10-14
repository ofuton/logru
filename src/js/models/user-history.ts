import { PageType } from "../enums/page-type";
import { ContentBase } from "./content-base";
import { ActionType } from "../enums/action-type";

export class UserHistory {
  pageType: PageType
  actionType: ActionType
  value: ContentBase
  timestamp: Date
}
