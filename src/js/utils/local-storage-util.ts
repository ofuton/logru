import { UserHistory } from "../models/user-history";

const appendHistoryToLocalStorage = (history: UserHistory) => {
  const key = 'logru::history';
  let data = localStorage.getItem(key);
  let dataJson = data === null ? [] : JSON.parse(data);
  dataJson.push(history);
  localStorage.setItem(key, JSON.stringify(dataJson));
}

export { appendHistoryToLocalStorage }
