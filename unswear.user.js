// ==UserScript==
// @name         devrant-unswear
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  remove bad words from post
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  // Change this to false if you want specific badWords to be replace with their goodWords
  // but the goodWords must have the same lenght as badWords
  let randomMode = true;

  let goodWords = ["❤️", "🎀"];
  let badWords = ["fuck"];
  let elementToWatch = ["div.rantlist-title-text", "div.rantlist-tags > a", "div.rantlist-title", "h1.rantlist-content", "div.related-rant-text"];

  let badWordsReg = RegExp(badWords.join("|"));
  badWords = badWords.map(word => new RegExp(word, "i"));

  ("use strict");

  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      while (badWordsReg.test(el.innerHTML)) {
        if (goodWords.length === badWords.length && !randomMode) {
          badWords.forEach((reg, i) => {
            el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
          });
        } else {
          let i = Math.floor(Math.random() * Math.floor(goodWords.length));
          badWords.forEach(reg => {
            el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
          });
        }
      }
    });
  });
})();
