export async function setItem(key: string, data: object) {
  const str = JSON.stringify(data);
  return Promise.resolve().then(() => localStorage.setItem(key, str));
}

export async function getItem(key: string, defaultValue: any) {
  return Promise.resolve().then(() => {
    const str = localStorage.getItem(key);
    if (str !== null) {
      return JSON.parse(str);
    }

    return defaultValue;
  });
}
