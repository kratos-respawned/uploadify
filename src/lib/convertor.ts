const isNode = typeof module !== "undefined" && module.exports;
export const bufferToBase64 = (buffer: ArrayBuffer) => {
  if (isNode) {
    return Buffer.from(buffer).toString("base64");
  }
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return (typeof self !== "undefined" ? self : window).btoa(binary);
};
export const base64ToBuffer = (base64: string) => {
  if (isNode) {
    return Buffer.from(base64, "base64");
  }
  const binary = (typeof self !== "undefined" ? self : window).atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};
