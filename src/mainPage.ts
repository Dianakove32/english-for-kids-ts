import { audio, burgerLink, burgerNav,  cardA, CONTAINER, main,  playGameInput, rating, rotateBtn, soundEffects,startGameBtn,  tittle, wordRus  } from './constants';
import { cards } from './data';

import './style.scss';

export function mainPageTemplate():void {
  const  mainPageTemplate: any = `
<header class="header">
<div class="wrapper header_wrapper">
    <div class="burger-menu">
        <a href="#" class="burger-menu_button">
            <span class="burger-menu_lines"></span>
        </a>
            <nav class="burger-menu_nav">
            <a id = '12' href="#" class="burger-menu_link">Main menu</a>
            <a id = '0' href="#" class="burger-menu_link">Action (set A)</a>
            <a id = '1' href="#" class="burger-menu_link">Action (set B)</a>
            <a id = '7' href="#" class="burger-menu_link">Action (set C)</a>
            <a id = '6' href="#" class="burger-menu_link">Adjectiv</a>
            <a id = '2' href="#" class="burger-menu_link">Animal (set A)</a>
            <a id = '3' href="#" class="burger-menu_link">Animal (set B)</a>
            <a id = '4' href="#" class="burger-menu_link">Clothes</a>
            <a id = '5' href="#" class="burger-menu_link">Emotion</a>
        </nav>
    <div class="burger-menu_overlay"></div>
    <span id="tittle">Main menu</span>
</div>
    <input  class="switch" id="switch1" type="checkbox">
         <label class="switch-for" for="switch1"></label>
</div>
</header>

<div class="wrapper conteiner main">
    <a id = '0' class="main-card" href="#"><img src="./assets/img/play.jpg" alt="Action (set A)" />Action (set A)</a>
    <a id = '1' class="main-card" href="#"><img src="./assets/img/swim.jpg" alt="Action (set B)" />Action (set B)</a>
    <a id = '7' class="main-card" href="#"><img src="./assets/img/dance.jpg" alt="Action (set C)" />Action (set C)</a>
    <a id = '6' class="main-card" href="#"><img src="./assets/img/brave.jpeg" alt="Adjectiv" />Adjectiv</a>
    <a id = '2' class="main-card" href="#"><img src="./assets/img/bird.jpg" alt="Animal (set A)" />Animal (set A)</a>
    <a id = '3' class="main-card" href="#"><img src="./assets/img/cat.jpg" alt="Animal (set B)" />Animal (set B)</a>
    <a id = '4' class="main-card" href="#"><img src="./assets/img/blouse.jpg" alt="Clothes" />Clothes</a>
    <a id = '5' class="main-card" href="#"><img src="./assets/img/laugh.jpg" alt="Emotion" />Emotion</a>

</div>
<div class="rating"></div>
<div class="category">

</div>
<button class="startGame"  ><p>Start Game</p></button>
<audio class="audio" autoplay="autoplay"></audio>
<audio class="soundEffects" autoplay="autoplay"></audio>
`
const app: any = document.getElementById('app')!;
app.innerHTML = mainPageTemplate




}
