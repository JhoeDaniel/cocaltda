import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityCap {
  constructor() {}
  /**
   * Encripta un string con AES (encriptación simétrica)
   * @param text
   * @returns texto encriptado con AES-256
   */
  aesEncrypt(text: string): string {
    const passEncryptEncrypted = this.algorithm_encrypt(
      environment.passwordEncrypt
    );
    const textEncrypted = this.algorithm_encrypt(text);

    const hex = this.hexEncode(passEncryptEncrypted);

    const key = CryptoJS.enc.Hex.parse(hex);
    var iv = CryptoJS.enc.Hex.parse(hex);

    let encrypted = CryptoJS.AES.encrypt(textEncrypted, key, { iv });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }
  /**
   * Desencripta un string con AES (encriptación simétrica)
   * @param encryptText
   * @returns Texto desencriptado
   */
  aesDecrypt(encryptText: string): string {
    const passEncryptEncrypted = this.algorithm_encrypt(
      environment.passwordEncrypt
    );

    const hex = this.hexEncode(passEncryptEncrypted);

    const key = CryptoJS.enc.Hex.parse(hex);
    var iv = CryptoJS.enc.Hex.parse(hex);

    const bytes = CryptoJS.AES.decrypt(encryptText, key, { iv });
    return this.algorithm_decrypt(bytes.toString(CryptoJS.enc.Utf8));
  }
  /**
   * aesEncryptObject
   * const jsonEncrypt = this._securityCap.aesEncryptObject(json);
   * @param object
   * @returns
   */
  aesEncryptObject(object: object | []): string {
    const objectText = JSON.stringify(object);
    return this.aesEncrypt(objectText);
  }
  /**
   * aesDecryptObject
   * const jsonDecrypt = this._securityCap.aesDecryptObject(jsonEncrypt);
   * @param encryptText
   * @returns
   */
  aesDecryptObject(encryptText: string): object | [] {
    const decryptText = this.aesDecrypt(encryptText);
    return JSON.parse(decryptText);
  }
  /**
   * Aplica el cifrado de caracteres
   * @param text
   * @returns texto cifrado
   */
  algorithm_encrypt(text: string): string {
    const _stringInvert = this.stringInvert(text);
    return this.stringPositionInvert(_stringInvert);
  }
  /**
   * Aplica el descifrado de caracteres
   * @param stringPositionInvert
   * @returns texto descifrado
   */
  algorithm_decrypt(stringPositionInvert: string): string {
    let _stringInvert = this.stringPositionInvert(stringPositionInvert);
    return this.stringInvert(_stringInvert);
  }
  /**
   * Algoritmo para invertir caracteres de un string
   * @param string
   * @returns
   */
  stringInvert = (string: string): string => {
    let inverted = '';
    for (var i = string.length - 1; i >= 0; i--) {
      inverted += string.charAt(i);
    }
    return inverted;
  };
  /**
   * Algoritmo para invertir las posiciones de un string
   * @param string
   * @returns
   */
  stringPositionInvert = (string: string): string => {
    let positionInvert = '';
    let first = '';
    let second = '';

    let intermediatePosition = Math.trunc(string.length / 2);

    first = string.substring(0, intermediatePosition);

    if (string.length % 2 == 0) {
      second = string.substring(intermediatePosition, string.length);
      positionInvert = `${second}${first}`;
    } else {
      second = string.substring(intermediatePosition + 1, string.length);
      positionInvert = `${second}${string.charAt(
        intermediatePosition
      )}${first}`;
    }
    return positionInvert;
  };
  /**
   * Codifica un string a hexadecimal
   * @param string
   * @returns
   */
  hexEncode = (string: string): string => {
    var hex, i;
    var result = '';
    for (i = 0; i < string.length; i++) {
      hex = string.charCodeAt(i).toString(16);
      result += ('0' + hex).slice(-2);
    }
    return result;
  };
  /**
   * Decodifica un hexadecimal a string
   * @param string
   * @returns
   */
  hexDecode = (string: string): string => {
    var j;
    var hexes = string.match(/.{1,2}/g) || [];
    var back = '';
    for (j = 0; j < hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
  };
}
