export default function checkLocalStorage(name: string, initValue: any): any {
  let newValue;
  if (localStorage.getItem(name) !== null) {
    newValue = JSON.parse(localStorage.getItem(name) || "");
  } else {
    newValue = initValue;
  }
  return newValue;
}
