//jshint esversion:6
function charCount(str){
  let result = {};
  for (var char of str.toLowerCase()) {
    if((char >= "a" && char <= "z") || (char >= "0" && char <= "9")){
      result[char] = ++result[char] || 1; // Something new or use terery operator
    }
  }
  return result;
}

console.log(charCount("Hello Mr. 007!!"));
