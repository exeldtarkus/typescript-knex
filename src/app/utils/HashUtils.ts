import CryptoJS from 'crypto-js';

const encryptWithPrivateKey = (
  inputString: string,
  privateKey: string,
): string => {
  const encrypted = CryptoJS.AES.encrypt(inputString, privateKey).toString();
  return encrypted;
};

const decryptWithPrivateKey = (
  encryptedString: string,
  privateKey: string,
): string => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedString, privateKey);
  const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedString;
};

const encryptMd5 = (encryptedString: string): string => {
  const encrypt = CryptoJS.MD5(encryptedString).toString();
  return encrypt;
};

export {encryptWithPrivateKey, decryptWithPrivateKey, encryptMd5};
