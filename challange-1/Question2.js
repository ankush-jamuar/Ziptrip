function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("Bhaskara"));

function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
console.log(reverseString("Bhaskara"));

function reverseString(str) {
  if (str === "") {
    return "";
  }
  return reverseString(str.substr(1)) + str.charAt(0);
}
console.log(reverseString("Bhaskara"));

function reverseString(str) {
  return str.split("").reduce((rev, char) => char + rev, "");
}
console.log(reverseString("Bhaskara"));
