import { TArea } from './TArea.js';
import { Sorting } from './Sorting.js';
import { Comment } from './Comment.js';
import { Response } from './Response.js';
import { Favorites } from './Favorites.js';

const tArea = new TArea();
const sorting = new Sorting();
const comment = new Comment();
const response = new Response();
const favorites = new Favorites();

const area: HTMLTextAreaElement = document.querySelector('#comment')!;
const btnSend: HTMLButtonElement = document.querySelector('#send')!;
const btnList: HTMLButtonElement = document.querySelector('#show-list')!;
const showComs: HTMLButtonElement = document.querySelector('#show-coms')!;
const comsBlock: HTMLElement = showComs.parentElement!;
const showFavs: HTMLButtonElement = document.querySelector('#show-favs')!;
const favsBlock: HTMLElement = showFavs.parentElement!;
const list: HTMLDivElement = document.querySelector('.comments__list')!;
const maxSymbols: HTMLSpanElement = document.querySelector(
	'.comments__insert-span2'
)!;

// Получение данных об авторе, создание массива в LS, обновление комментариев и их кол-ва, добавление и обновление избранного и выпадающий список
tArea.createDataArr();
tArea.CurrentPerson();
tArea.updateComAmount();
comment.setInitialRating();
comment.updateCom();
favorites.addRemoveMark();
favorites.updateFavs();
sorting.showList();

// Регулировка высоты, цвет кнопки, счетчик символов и добавление надписи
area.addEventListener('input', function (): void {
	tArea.changeHeight(area);
	if (area.value.length > 0 && area.value.length <= 1000) {
		tArea.addToLong(area);
		tArea.btnColor(area);
		tArea.symbolCounter(area);
	} else if (area.value.length > 1000) {
		tArea.addToLong(area);
		tArea.btnColor();
		tArea.symbolCounter(area);
	} else {
		tArea.addToLong(area);
		tArea.btnColor();
		tArea.symbolCounter();
	}
});

// Отправка комментария / ответа на комментарий
btnSend.addEventListener('click', function (): void {
	const x = area.value.trim();
	if (x.length > 0 && x.length <= 1000) {
		tArea.saveToLocal();
		tArea.updateComAmount();
		comment.getDate();
		comment.publishCom();
		favorites.addRemoveMark();
		area.value = '';
		area.style.height = '62px';
		btnSend.style.color = ' #00000060';
		btnSend.style.backgroundColor = '#A1A1A1';
		maxSymbols.innerHTML = 'Макс. 1000 символов';
		btnSend.innerHTML = 'Отправить';
	}
});

// Просмотр избранного, изменение кнопки и убрать галочку (с выпадающего списка)
showFavs.addEventListener('click', (): void => {
	favorites.showOnlyFavs();
	if (window.getComputedStyle(showComs).fontSize === '20px') {
		showFavs.classList.toggle('active-btn');
		favsBlock.classList.toggle('active-block');
		showComs.classList.toggle('active-btn');
		comsBlock.classList.toggle('active-block');
	}
	const removeMe: Element | null = document.querySelector('#remove-span');
	btnList.setAttribute('how', 'idk');
	removeMe ? removeMe.remove() : removeMe;
	list.classList.remove('active');
});

// Просмотр всех комментариев (вернуться после избранного), изменение кнопки и убрать галочку
showComs.addEventListener('click', (): void => {
	favorites.backToComs();
	comment.updateCom();
	favorites.updateFavs();
	favorites.addRemoveMark();
	if (window.getComputedStyle(showFavs).fontSize === '20px') {
		showFavs.classList.toggle('active-btn');
		favsBlock.classList.toggle('active-block');
		showComs.classList.toggle('active-btn');
		comsBlock.classList.toggle('active-block');
	}
	const removeMe: Element | null = document.querySelector('#remove-span');
	btnList.setAttribute('how', 'idk');
	removeMe ? removeMe.remove() : removeMe;
	list.classList.remove('active');
	tArea.updateComAmount();
});

// Сколько места занято в LS (в консоль)
// var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
