/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  audio, burgerLink, burgerNav, cardA, CONTAINER, main, playGameInput, rating, soundEffects, startGameBtn,
} from './constants';
import { cards } from './data';
import './style.scss';

// window.onload = () => {
//   mainPageTemplate()
// };

localStorage.setItem('Category', '');
startGameBtn.style.display = 'none';
let error: any = 0;
const nameCategories = [
  'Action (set A)',
  'Action (set B)',
  'Animal (set A)',
  'Animal (set B)',
  'Clothes',
  'Emotion',
  'Adjectiv',
  'Action (set C)'];

function burgerMenu(selector: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const menu: Element = document.querySelector(selector)!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const button: HTMLLinkElement = document.querySelector('.burger-menu_button')!;
  const links = document.querySelectorAll('.burger-menu_link')!;
  const overlay: HTMLDivElement = document.querySelector('.burger-menu_overlay')!;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  links.forEach((e) => e.addEventListener('click', () => toggleMenu()));

  overlay.addEventListener('click', () => toggleMenu());

  function toggleMenu() {
    menu.classList.toggle('burger-menu__active');
  }
}

burgerMenu('.burger-menu');

function removeTooltips(category: any) {
  const pictures = cards[category];
  const container: HTMLDivElement = document.querySelector('.category')!;
  let outStr = '';

  for (let i = 0; i < pictures?.length; i++) {
    outStr += ` <div id=${pictures[i].id} class="card cardA">`;
    outStr += `<div id=${pictures[i].id} class="card cardGame" ><img id=${pictures[i].id} src="${pictures[i].image}"/ ></div>`;
    outStr += '</div>';
  }

  cardA.addEventListener('click', (e: { target: any; }) => {
    const { target } = e;
    const soundd: any = pictures.find(((el: { id: any; }) => el.id === target.id));

    pushPicture(soundd.audioSrc, target.id);
  });

  container.innerHTML = outStr;
}

function removeItem(randItem: number) {
  const savePictures: any = JSON.parse(localStorage.getItem('arrayPictures') as any);

  savePictures.splice(randItem, 1);
  localStorage.setItem('arrayPictures', JSON.stringify(savePictures));
}

function showTranslate(translation: any, target: any) {
  const cards = document.querySelectorAll('.card')!;
  const card: any = Array.from(cards).find((el) => el.id == target);
  const span = document.createElement('span');

  span.classList.add('translationShow');
  span.innerHTML = translation;

  card.appendChild(span);

  card.addEventListener('mouseleave', () => {
    span.innerHTML = '';
    span.classList.remove('translationShow');
  });
}

function changeCategory(category: any) {
  document.querySelector('#tittle')!.textContent = nameCategories[category];

  const mainMenu: HTMLDivElement = document.querySelector('.main')!;
  mainMenu.style.display = 'none';

  const pictures = cards[category];

  localStorage.setItem('Category', category);

  const container: HTMLDivElement = document.querySelector('.category')!;
  container.style.display = 'flex';

  const isPlay: any = document.querySelector('.switch')!;
  isPlay.checked;

  let outStr = '';

  if (isPlay.checked && category != 'null') {
    document.querySelector('.startGame')!.classList.remove('repeat');
    startGameBtn.style.display = 'flex';
    removeTooltips(category);

    return;
  }
  if(category === 11){
    outStr += `<div  class="statisticsContainer">`;
    outStr += `<div class="" >vbnjvhjghj</div>`;
   outStr += `<div  ></div>`;
    outStr += '</div>';
  }

  for (let i = 0; i < pictures?.length; i++) {
    outStr += `<div id=${pictures[i].id} class="card">`;
    outStr += `<div id=${pictures[i].id} class="cardFront" ><img id=${pictures[i].id} src="${pictures[i].image}"/ ><div id=${pictures[i].id} class="wordRus">${pictures[i].word}</div><div class="translationWord">${pictures[i].translation}</div></div>`;
    outStr += `<div class="cardBack"><img id=${pictures[i].id} src="${pictures[i].image}"/ ><div class="translationWord">${pictures[i].translation}</div></div>`;
    outStr += `<div id=${pictures[i].id}  class="rotate"></div>`;
    outStr += '</div>';
  }

  cardA.addEventListener('click', (e: { target: any; }) => {
    const { target } = e;

    if (target.className == 'rotate') {
      const soundd: any = pictures?.find(((el: { id: any }) => el.id == target.id));

      showTranslate(soundd?.translation, target.id);
    } else {
      const soundd: any = pictures?.find(((el: { id: any }) => el.id == target.id));

      pushPicture(soundd?.audioSrc, target.id);
    }
  });

  container.innerHTML = outStr;
}

function getRandomItem() {
  const pictures: any = JSON.parse(localStorage.getItem('arrayPictures') as any);

  if (pictures.length > 0) {
    const rand = Math.floor(Math.random() * pictures.length);
    const element = pictures[rand];

    localStorage.setItem('soundRepeat', element.audioSrc);
    pictures.splice(rand, 1);
    localStorage.setItem('arrayPictures', JSON.stringify(pictures));
    audio.src = element.audioSrc;
  } else {
    let result = '';

    startGameBtn.style.display = 'none';
    rating.style.display = 'none';
    if (error > 0) {
         const windowInterval: number = window.setInterval(() => {
           result += `<p class = "resultP">У вас ${error} ошибок</p>`;
      result += '<div class="resultGame"><img src="./assets/img/failure.jpg"/ ></div>';
       }, 3000);

      // const windowInterval: number = window.setInterval(() => {
      //   showMainMenu()
      // }, 3000);


      CONTAINER.innerHTML = result;
      audio.src = './assets/audio/failure.mp3';
    } else {
      result += `<p class = "resultP">У вас ${error} ошибок</p>`;
      result += '<div class="resultGame"><img src="./assets/img/success.jpg"/ ></div>';

      CONTAINER.innerHTML = result;
      audio.src = './assets/audio/success.mp3';
    }
  }
}

function pushPicture(sound: any, target: any) {
  // const pictures = JSON.parse(localStorage.getItem('arrayPictures') as any);
  const isPlay = localStorage.getItem('isPlay');
  const isRepeat = document.querySelector('.repeat');

  if (isPlay === 'false' || isRepeat === null) {
    audio.src = sound;
  } else {
    const audioSrc = localStorage.getItem('soundRepeat');

    if (sound === audioSrc) {
      soundEffects.src = './assets/audio/correct.mp3';

      const cards = document.querySelectorAll('.card')!;
      const cardOp: any = Array.from(cards).find((el) => el.id == target);

      cardOp.style.opacity = '0.5';

      getRandomItem();

      const win = document.createElement('div');
      win.classList.add('star-succes');
      rating.appendChild(win);

      return;
    }

    if (sound != audioSrc) {
      soundEffects.src = './assets/audio/error.mp3';
      const win = document.createElement('div');
      win.classList.add('star-error');
      rating.appendChild(win);

      localStorage.setItem('error', error);

      error = localStorage.getItem('error');
      error++;

      localStorage.setItem('error', error);
    }
  }
}

function showMainMenu() {
  localStorage.setItem('Category', '');
  // const mainMenu = document.querySelector('.main');
  main.style.display = 'flex';
  // const container = document.querySelector('.category');
  CONTAINER.style.display = 'none';
  startGameBtn.style.display = 'none';
}

burgerLink.addEventListener('click', () => {
  showMainMenu();
});

burgerNav.addEventListener('click', (e: any) => {
  const targ = e.target;
  const { id } = targ;

  if (id == 12) {
    showMainMenu();
  } else {
    changeCategory(`${id}`);
  }
});

main.addEventListener('click', (e: any) => {
  const targ = e.target;

  const { id } = targ;

  changeCategory(`${id}`);
});

function playGame() {
  const isPlay: any = document.querySelector('.switch')!;
  isPlay.checked;

  localStorage.setItem('isPlay', isPlay.checked);

  const category = localStorage.getItem('Category');

  if (isPlay.checked) {
    burgerNav.classList.add('burger-menu_play');

    const switchFor = document.querySelector('.switch-for')!;
    const mainCard = document.querySelectorAll('.main-card')!;

    switchFor.classList.add('switch-for-play');
    mainCard.forEach((x) => x.classList.add('main-card-play'));

    if (category != 'null') {
      removeTooltips(category);

      startGameBtn.classList.remove('repeat');
      startGameBtn.style.display = 'flex';
    }
  } else {
    burgerNav.classList.remove('burger-menu_play');
    document.querySelectorAll('.main-card').forEach((x) => x.classList.remove('main-card-play'));

    startGameBtn.style.display = 'none';
    // const rating = document.querySelector('.rating');
    rating.innerHTML = '';

    if (category != '') changeCategory(category);
  }
}
playGameInput.addEventListener('click', () => {
  playGame();
});

function startGame() {
  const isRepeat = document.querySelector('.repeat');

  if (isRepeat === null) {
    startGameBtn.classList.add('repeat');
    const category: any = localStorage.getItem('Category');
    const pictures = cards[category];
    const randItem = Math.floor(Math.random() * pictures.length);
    const element = pictures[randItem];

    localStorage.setItem('soundRepeat', element.audioSrc);
    localStorage.setItem('arrayPictures', JSON.stringify(pictures));
    audio.src = element.audioSrc;

    removeItem(randItem);

    return;
  }
  const audioSrc = localStorage.getItem('soundRepeat');

  audio.src = audioSrc;
}

startGameBtn.addEventListener('click', () => {
  startGame();
});
