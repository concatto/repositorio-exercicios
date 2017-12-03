export const TokenKey = "userToken";

export const storeItem = (key, value, session = false) => {
  const storage = session ? window.sessionStorage : window.localStorage;

  storage.setItem(key, value);
}

export const retrieveItem = (key, sessionFirst = false) => {
  const storages = [window.localStorage, window.sessionStorage];
  if (sessionFirst) {
    storages.reverse();
  }

  for (const storage of storages) {
    const item = storage.getItem(key);
    if (item !== null) {
      return item;
    }
  }

  return null;
}

export const containsItem = (key, sessionFirst = false) => {
  return retrieveItem(key, sessionFirst) !== null;
}

export const removeItem = (key, session = "both") => {
  if (session === "both") {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  } else {
    const storage = session ? window.sessionStorage : window.localStorage;

    storage.removeItem(key);
  }
}
