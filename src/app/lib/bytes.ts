export const toByteArray = (base64EncodedString: string) => {
  const rawString = atob(base64EncodedString);
  return Uint8Array.from(rawString, (ch) => ch.charCodeAt(0)).buffer;
};
