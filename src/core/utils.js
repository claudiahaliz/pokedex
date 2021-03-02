function clearAndUpper(text) {
  return text.replace(/-/, ' ').toUpperCase();
}
function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}
function padStartDigit(number) {
  return (`0000${number}`).substr(-4, 4);
}
function getUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
export default { toPascalCase, padStartDigit, getUniqueId };
