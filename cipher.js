// ROT13 function
function rot13(str) {
    return str.replace(/[a-zA-Z]/g, (c) =>
      String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      )
    );
  }
  
  // Caesar Cipher function (Shift of 3)
  function caesarCipher(str, shift = 3) {
    return str.replace(/[a-zA-Z]/g, (c) =>
      String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'x' ? shift : -23)
      )
    );
  }
  
  // Vigenère Cipher function
  function vigenereCipher(str, key) {
    let result = '';
    let keyIndex = 0;
    key = key.toLowerCase();
  
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
  
      if (c.match(/[a-z]/i)) {
        const code = str.charCodeAt(i);
        const keyChar = key[keyIndex % key.length];
        const keyShift = keyChar.charCodeAt(0) - 97; // 'a' = 97
        if (code >= 65 && code <= 90) {
          // Uppercase
          result += String.fromCharCode(((code - 65 + keyShift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          // Lowercase
          result += String.fromCharCode(((code - 97 + keyShift) % 26) + 97);
        }
        keyIndex++;
      } else {
        result += c;
      }
    }
    return result;
  }
  
  // Event to encode text
  function encodeText() {
    const inputText = document.getElementById("inputText").value;
    const vigenereKey = document.getElementById("vigenereKey").value;
  
    document.getElementById("rot13Output").value = rot13(inputText);
    document.getElementById("vigenereOutput").value = vigenereCipher(inputText, vigenereKey);
    document.getElementById("caesarOutput").value = caesarCipher(inputText);
  }
  
  // Event to decode text
  function decodeText() {
    const rot13Text = document.getElementById("rot13Output").value;
    const caesarText = document.getElementById("caesarOutput").value;
    const vigenereKey = document.getElementById("vigenereKey").value;
    const vigenereText = document.getElementById("vigenereOutput").value;
  
    // For ROT13, decoding is same as encoding
    document.getElementById("rot13Output").value = rot13(rot13Text);
    
    // Reverse Caesar Cipher
    document.getElementById("caesarOutput").value = caesarCipher(caesarText, -3);
    
    // Reverse Vigenère Cipher (using negative shift)
    document.getElementById("vigenereOutput").value = vigenereCipher(vigenereText, vigenereKey.split('').map(c => String.fromCharCode(219 - c.charCodeAt(0))).join(''));
  }
  