import { base64ToBuffer, bufferToBase64 } from "./convertor";
export const encryptKeys = async (key: CryptoKey, value: string) => {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = encoder.encode(value);
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedText
  );
  const combinedBuffer = new Uint8Array(
    iv.byteLength + encryptedData.byteLength
  );
  combinedBuffer.set(iv, 0);
  combinedBuffer.set(new Uint8Array(encryptedData), iv.byteLength);
  return bufferToBase64(combinedBuffer);
};

export const decryptKeys = async (
  key: CryptoKey,
  encryptedData: string
) => {
  const encryptedDataBuffer=base64ToBuffer(encryptedData) 
  const iv = encryptedDataBuffer.slice(0, 12);
  const data = encryptedDataBuffer.slice(12);
  console.log(data)
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(iv),
    },
    key,
    data
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
};
