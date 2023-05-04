// Import the encryptors functions here.
import { caesarCipher, symbolCipher, reverseCipher } from "./encryptors.js";

const number = 5;

const encodeMessage = (str) => {
  // Use the encryptor functions here.

  return reverseCipher(symbolCipher(caesarCipher(str, number)));
};

const decodeMessage = (str) => {
  // Use the encryptor functions here.
  return caesarCipher(symbolCipher(reverseCipher(str)), -number);
};

// User input / output.

const handleInput = (userInput) => {
  const str = userInput.toString().trim();
  let output;
  if (process.argv[2] === "encode") {
    output = encodeMessage(str);
  }
  if (process.argv[2] === "decode") {
    output = decodeMessage(str);
  }

  process.stdout.write(output + "\n");
  process.exit();
};

// Run the program.
process.stdout.write("Enter the message you would like to encrypt...\n> ");
process.stdin.on("data", handleInput);
