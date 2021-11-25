(function () {
  function checkPalindrome(word) {

    if (!word) throw "Enter word to search"
    if (!word.replace(/\s/g, "").length == true) throw "Word provided is not should be empty string";
    if (typeof word != 'string') throw 'the word provided is not a string';

    var punctuationRegEx = (word.replace(/[^a-zA-Z0-9]/g, "").replace(/\s/g, ""));
    var x = punctuationRegEx.split(" ").join("").toLowerCase()
    var lastIndex = Math.ceil(x.length / 2);
    for (var i = 0; i < lastIndex && i < x.length; i++) {
      if (x[i] != x[x.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  const checkPls = document.getElementById("check-Palindromes");
  const text = document.getElementById("text");
  const ol = document.getElementById("attempts");

  if (checkPls) {

    checkPls.addEventListener("submit", event => {
      event.preventDefault();
      try {
        const textInputData = text.value;
        const isPalindromesCheck = checkPalindrome(textInputData);
        const li = document.createElement("li");
        if (isPalindromesCheck) {
          var ispalindrome = document.createTextNode(`${textInputData} is Palindromes`)
          li.appendChild(ispalindrome);
          li.setAttribute("class", "is-palindrome");
        } else {
          var isNotpalindrome = document.createTextNode(`${textInputData} is not Palindromes`)
          li.appendChild(isNotpalindrome);
          li.setAttribute("class", "not-palindrome");
        }
        ol.appendChild(li);
        text.value = "";
      } catch (e) {
        const message = e ? e : PASS;
        alert(`${message}`);
      }
    });
  }
})();