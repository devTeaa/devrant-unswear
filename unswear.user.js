// ==UserScript==
// @name         devrant-unswear
// @namespace    http://tampermonkey.net/
// @version      0.2
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

  let badRegex = badWords.map(word => new RegExp(word, "gi"));

  ("use strict");
  function replaceBadWords(el, random) {
    badRegex.forEach((reg, i) => {
      if (random || goodWords.length !== badWords) {
        i = Math.floor(Math.random() * Math.floor(goodWords.length - 1));
        el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
      } else {
        el.innerHTML = el.innerHTML.replace(reg, goodWords[i]);
      }
    });
  }

  elementToWatch.forEach(element => {
    document.querySelectorAll(element).forEach(el => {
      badRegex.forEach((reg, i) => {
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
