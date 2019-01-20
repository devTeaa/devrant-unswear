// ==UserScript==
// @name         devrant-unswear
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  remove bad words from post
// @author       devTeaa
// @match        https://devrant.com/*
// @grant        none
// ==/UserScript==

(function() {
  let randomMode = false;

  let goodWords = ["❤️"];
  let badWords = ["fucking", "fuck"];

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

  document.querySelectorAll("div.rantlist-title-text").forEach(el => {
    replaceBadWords(el, randomMode);
  });
  document.querySelectorAll("div.rantlist-tags > a").forEach(el => {
    replaceBadWords(el, randomMode);
  });
})();
