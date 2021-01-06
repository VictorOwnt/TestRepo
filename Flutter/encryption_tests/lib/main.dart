import 'package:flutter/material.dart';
//import 'package:encrypt/encrypt.dart' as encrypt;

/*void main() {
  //Dit komt in functie in app ipv gewoon zo
  final plainText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

  final key = encrypt.Key.fromLength(32);
  final iv = encrypt.IV.fromLength(16);
  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final encrypted = encrypter.encrypt(plainText, iv: iv);
  final decrypted = encrypter.decrypt(encrypted, iv: iv);

  print(decrypted);
  print(encrypted.bytes);
  print(encrypted.base16);
  print(encrypted.base64);
}*/
import 'package:cryptography/cryptography.dart';
import 'dart:convert';

Future<void> main() async {
  // Choose the cipher
  final cipher = CipherWithAppendedMac(aesCtr, Hmac(sha256));

  // Choose some 256-bit secret key
  final secretKey = SecretKey.randomBytes(16);

  // Choose some unique (non-secret) nonce (max 16 bytes).
  // The same (secretKey, nonce) combination should not be used twice!
  final nonce = Nonce.randomBytes(12);

  // Our message
  final message = utf8.encode('encrypted message');

  // Encrypt
  final encrypted = await cipher.encrypt(
    message,
    secretKey: secretKey,
    nonce: nonce,
  );

  print('Encrypted: $encrypted');

  // Decrypt
  final decrypted = await cipher.decrypt(
    encrypted,
    secretKey: secretKey,
    nonce: nonce,
  );

  print('Decrypted: ' + utf8.decode(decrypted));
}

