// ==UserScript==
// @name         devrant-unswear
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Remove bad words from any post
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  // Change randomMode to false if you want specific badWords to be replaced with their goodWords.
  // If randomMode's false, goodWords must have the same length as badWords.
  let randomMode = true;

  // Word to watch/find
  let badWords = ["fuck", "motherfuck", "shit", "bitch"];
  // and will be replaced with
  let goodWords = ["❤️", "🎀", "🤬", "hug", "duck"];

  // List of element to watch
  let elementToWatch = ["div.rantlist-title-text", "div.rantlist-tags > a", "div.rantlist-title", "h1.rantlist-content", "div.related-rant-text"];

  // Create badWords and verb with tenses regex
  let badWordsReg = RegExp(badWords.join("|"), "i");
  let badWordsTenseReg = RegExp(`(${badWords.join("|")})+(ing|ed)+`, "i");

  badWords = badWords.map(word => new RegExp(word, "i"));
  ("use strict");

  // Safe while loop break
  let breakLoop = 0;
  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      while (badWordsReg.test(el.innerHTML)) {
        // Replace badWords witht their goodWords repectively
        if (goodWords.length === badWords.length && !randomMode) {
          badWords.forEach((reg, i) => {
            el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
          });
        } else {
          // Find verb with tenses, and replaced with goodWords that is less than 3 letters only
          let i = Math.floor(Math.random() * Math.floor(goodWords.filter(x => x.length < 3).length));
          let detectedWord = el.innerHTML.match(badWordsTenseReg);
          let replacementWord = goodWords.filter(x => x.length < 3)[i];

          if (detectedWord === null) {
            // If no verb with tenses left then replace randomly
            i = Math.floor(Math.random() * Math.floor(goodWords.length));
            detectedWord = el.innerHTML.match(badWordsReg);
            replacementWord = goodWords[i];
          }

          el.innerHTML = el.innerHTML.replace(detectedWord[0], replacementWord);
        }

        // Safe while loop break
        if (breakLoop < 1000) {
          breakLoop++;
        } else {
          break;
        }
      }
    });
  });
})();
