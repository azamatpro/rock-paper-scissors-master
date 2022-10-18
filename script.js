"use strict";

///////////////////////////////////////////
////// Selecting Elements
const body = document.body;
const popup = document.querySelector(`.popup`);
const restartEl = document.querySelector(`.restart`);
const btnRestart = document.querySelector(`.restart__btn`);
const playersBox = document.querySelector(`.section-play`);
const playersBoxPrimary = document.querySelector(`.section-play--primary`);
const playersBoxSub = document.querySelector(`.section-play--sub`);
const fakePlayer = document.querySelector(`.fake-player`);
const playMessage = document.querySelector(`.play-message`);
const playMessageText = document.querySelector(`.play-message__text`);
const btnPlayAgain = document.querySelector(`.play-again-btn`);
const elementScore = document.querySelector(`.table-score__data`);
const overlay = document.querySelector(`.overlay`);
const btnClose = document.querySelector(`.popup__close`);
const btnRules = document.querySelector(`.rules-btn`);
const subBox1 = document.querySelector(`.play-box__sub--1`);
const subBox2 = document.querySelector(`.play-box__sub--2`);

///////////////////////////////////////////
////// Functionality

// Variables
let counter = 3;
let score = 12;
let timeOut, timeInterval;
let html, userPicked;

// Rules btn functionality
btnRules.addEventListener(`click`, function (e) {
  e.preventDefault();
  popup.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
});

// Close btn functionality
btnClose.addEventListener(`click`, function () {
  popup.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
});

// Implementing Score
const displayScore = function (a) {
  playMessageText.textContent = `${a === 0 ? `You Lose` : `You Win`}`;
  score = a === 0 ? score - 1 : score + 1;
  elementScore.textContent = score;
};
elementScore.textContent = score;
// displayScore()

playersBox.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.play-box`);
  const selectedOption = +clicked.dataset.option;
  if (!clicked) return;

  playersBoxPrimary.classList.add(`hidden`);
  playersBoxSub.classList.remove(`hidden`);

  const randomCall = Math.trunc(Math.random() * 3) + 1;

  userPicked = `
  <h2 class="play-box__title">You Picked</h2>
  <div class="play-box play-box--${selectedOption} player-scale">
    <img
      class="play-box__img"
      src="/images/icon-${selectedOption}.svg"
      alt="Paper img"
    />
  </div>
  `;

  subBox1.insertAdjacentHTML("afterbegin", userPicked);

  timeInterval = setInterval(() => {
    counter--;
    if (counter === 0) {
      counter = 3;
      clearInterval(timeInterval);
    }
    fakePlayer.textContent = counter;
  }, `1000`);

  timeOut = setTimeout(() => {
    html = `
    <h2 class="play-box__title">The Picked</h2>
    <div class="play-box play-box--${randomCall} player-scale">
    <img
      class="play-box__img"
      src="/images/icon-${randomCall}.svg"
      alt="Player Img"
    />
  </div>
    `;
    fakePlayer.classList.add(`hidden`);
    subBox2.insertAdjacentHTML("afterbegin", html);
    playMessage.classList.remove(`hidden`);

    if (selectedOption === randomCall) {
      playMessageText.textContent = `Draw`;
    } else if (selectedOption === 1 && randomCall === 2) {
      displayScore(0);
    } else if (selectedOption === 1 && randomCall === 3) {
      displayScore(1);
    } else if (selectedOption === 2 && randomCall === 3) {
      displayScore(0);
    } else if (selectedOption === 2 && randomCall === 1) {
      displayScore(1);
    } else if (selectedOption === 3 && randomCall === 1) {
      displayScore(0);
    } else if (selectedOption === 3 && randomCall === 2) {
      displayScore(1);
    }
  }, `3000`);
});

btnPlayAgain.addEventListener(`click`, function () {
  playersBoxSub.classList.add(`hidden`);
  playersBoxPrimary.classList.remove(`hidden`);
  subBox1.innerHTML = ``;
  subBox2.innerHTML = ``;
  fakePlayer.classList.remove(`hidden`);
  playMessage.classList.add(`hidden`);

  if (score === 0) {
    overlay.classList.remove(`hidden`);
    restartEl.classList.remove(`hidden`);
  }
});

btnRestart.addEventListener(`click`, function () {
  overlay.classList.add(`hidden`);
  restartEl.classList.add(`hidden`);
  window.location.reload();
});
