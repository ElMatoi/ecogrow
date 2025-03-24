export function generateRandomPassword(): string {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!?@#$%^&*.,_-";
    const allChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;
  
    const passwordLength = Math.floor(Math.random() * (35 - 8 + 1)) + 8;
    let password = "";
  
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
  
    for (let i = password.length; i < passwordLength; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }