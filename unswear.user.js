// ==UserScript==
// @name         devrant-unswear
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Remove bad words from any post
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  // Change randomMode to false if you want specific badWords to be replaced with their goodWords.
  // If randomMode's false, goodWords must have the same length as badWords. 
  let randomMode = true;

  let goodWords = ["❤️", "🎀", "hug"];
  let badWords = ["fuck(\\w+)?", "motherfuck(\\w+)?", "shit(\\w+)?", "bitch(\\w+)?"];
  
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
