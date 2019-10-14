import { detectPage, DetectPageDto } from '../utils/detect-page'
import { extractContentsByPageType, extractContentsByActionType } from '../utils/extract-page-content'
import { PageType } from '../enums/page-type';
import { extractScripts } from '../content/utils';
import { ActionType } from '../enums/action-type';
import { addEventHandlers } from '../utils/event-handlers';

const result: DetectPageDto = detectPage();
extractContentsByPageType(result);

window.addEventListener("hashchange", () => {
  // ハッシュが変わったら、ページの種類を検知して、コンテンツを抽出して、handlerを付与する
  const result: DetectPageDto = detectPage();
  extractContentsByPageType(result);
  addEventHandlers();
}, false);

addEventHandlers();
