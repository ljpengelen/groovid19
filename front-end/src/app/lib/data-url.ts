export const withoutPrefix = (dataUrl: string) =>
  dataUrl.substr(dataUrl.indexOf(',') + 1);
