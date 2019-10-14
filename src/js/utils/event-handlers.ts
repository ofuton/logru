import { DetectPageDto, detectPage } from "./detect-page";

import { ActionType } from "../enums/action-type";

import { PageType } from "../enums/page-type";

import { extractContentsByActionType } from "./extract-page-content";

const addEventListenersIfNeed_ = (eventHandlerAddedElementMap: Map<string, string>): Map<string, string> => {
  Array.from(document.querySelectorAll('.ocean-ui-comments-commentbase')).forEach((commentBase) => {
    const identifyClassNames = Array.from(commentBase.classList).filter(c => (c.indexOf("id") > 0));
    if (identifyClassNames) {
      if (!eventHandlerAddedElementMap.hasOwnProperty(identifyClassNames[0])) {
        commentBase.querySelector('.ocean-ui-comments-commentbase-like').addEventListener('click', () => {
          const result1: DetectPageDto = detectPage();
          result1.actionType = ActionType.LIKE
          console.log(PageType[result1.pageType]);
          console.log(extractContentsByActionType(result1, commentBase));
        });
        eventHandlerAddedElementMap[identifyClassNames[0]] = "";
      }
    }
  })
  return eventHandlerAddedElementMap;
}

const addEventHandlers = () => {
  const contentsBodyOcean = document.querySelector('#contents-body-ocean');
  let eventHandlerAddedElementMap: Map<string, string> = new Map<string, string>();
  if (contentsBodyOcean) {
    const contentsBodyOceanObserver = new MutationObserver(mutations => {
      const commentComponent = document.querySelector('.ocean-ui-comments-commentcomponent');
      if (commentComponent) {
        addEventListenersIfNeed_(eventHandlerAddedElementMap);
        commentComponentObserver.observe(document.querySelector('.ocean-ui-comments-commentcomponent'), { childList: true, subtree: true });
        contentsBodyOceanObserver.disconnect();
      }
    });

    const commentComponentObserver = new MutationObserver(mutations => {
      eventHandlerAddedElementMap = addEventListenersIfNeed_(eventHandlerAddedElementMap);
    });

    contentsBodyOceanObserver.observe(document.querySelector('#contents-body-ocean'), { childList: true, subtree: true })
  }
}

export { addEventHandlers }
