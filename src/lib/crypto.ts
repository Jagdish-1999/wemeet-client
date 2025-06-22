import CryptoJS from "crypto-js";
import Toast from "./toast";

export const secretKey = "your-strong-secret-key"; // 🔐 choose a strong key

// Encrypt
function encryptData(data: unknown) {
    const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretKey
    ).toString();
    return ciphertext;
}

// Decrypt
function decryptData(ciphertext: string) {
    if (!ciphertext) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
            console.warn("Decryption produced empty string");
            return null;
        }
        const decryptedData = JSON.parse(decryptedString);
        return decryptedData;
    } catch (error) {
        Toast.error(`${error}`);
        return null;
    }
}

export { encryptData, decryptData };
