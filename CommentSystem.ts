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

const area: HTMLTextAreaElement = document.querySelector('#comment');
const btnSend: HTMLButtonElement = document.querySelector('#send');
const showComs: HTMLButtonElement = document.querySelector('#show-coms');
const showFavs: HTMLButtonElement = document.querySelector('#show-favs');

// Получение данных об авторе, создание массива в LS, обновление комментариев
tArea.createDataArr();
tArea.CurrentPerson();
comment.setInitialRating();
comment.updateCom();
// favorites.addRemoveMark();
// favorites.updateFavs();
// sorting.showList();

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
		comment.getDate();
		comment.publishCom();
		area.value = '';
		area.style.height = '62px';
		btnSend.style.color = ' #00000060';
		btnSend.style.backgroundColor = '#A1A1A1';
		document.querySelector<HTMLSpanElement>(
			'.comments__insert-span2'
		).innerHTML = 'Макс. 1000 символов';
		btnSend.innerHTML = 'Отправить';
	}
	// favorites.addRemoveMark();
});

// Просмотр избранного, изменение кнопки и убрать галочку (с выпадающего списка)
// showFavs.addEventListener('click', (): void => {
// 	favorites.showOnlyFavs();
// 	if (window.getComputedStyle(showComs).fontSize === '20px') {
// 		showFavs.classList.toggle('active-btn');
// 		showFavs.parentElement.classList.toggle('active-block');
// 		showComs.classList.toggle('active-btn');
// 		showComs.parentElement.classList.toggle('active-block');
// 	}
// 	const removeMe: Element = document.querySelector('#remove-span');
// 	document
// 		.querySelector<HTMLButtonElement>('#show-list')
// 		.setAttribute('how', 'idk');
// 	removeMe ? removeMe.remove() : removeMe;
// });

// Просмотр всех комментариев (вернуться после избранного), изменение кнопки и убрать галочку
// showComs.addEventListener('click', (): void => {
// 	favorites.backToComs();
// 	comment.updateCom();
// 	favorites.updateFavs();
// 	favorites.addRemoveMark();
// 	if (window.getComputedStyle(showFavs).fontSize === '20px') {
// 		showFavs.classList.toggle('active-btn');
// 		showFavs.parentElement.classList.toggle('active-block');
// 		showComs.classList.toggle('active-btn');
// 		showComs.parentElement.classList.toggle('active-block');
// 	}
// 	const removeMe: Element = document.querySelector('#remove-span');
// 	document
// 		.querySelector<HTMLButtonElement>('#show-list')
// 		.setAttribute('how', 'idk');
// 	removeMe ? removeMe.remove() : removeMe;
// });

// Сколько места занято в LS (в консоль)
// var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
