export function parseStack(text) {
  const result = text.match(/^(.*)@(.*)*$/);
  return result?.slice(1);
}
