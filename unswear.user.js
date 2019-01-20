// ==UserScript==
// @name         devrant-unswear
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  remove bad words from post
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  let randomMode = false;

  let goodWords = ["❤️"];
  let badWords = ["fuck"];
  let elementToWatch = ["div.rantlist-title-text", "div.rantlist-tags > a", "div.rantlist-title", "h1.rantlist-content"];

  badWords = badWords.map(word => new RegExp(word, "gi"));

  ("use strict");

  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      badWords.forEach((reg, i) => {
        if (randomMode || goodWords.length !== badWords) {
          i = Math.floor(Math.random() * Math.floor(goodWords.length - 1));
          el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
        } else {
          el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
        }
      });
    });
  });
})();
