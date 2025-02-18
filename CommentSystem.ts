// class TArea {
// 	// Я захотел сделать счетчик для комментов в самом локал сторейдж, вместо localStorage.length, чтобы потом вычислить,
// 	// сколько комментов, а сколько ответов на них, тк они все храняться в одном месте
// 	counter = 0;
// 	// Регулировка высоты, цвет кнопки, счетчик символов и добавление надписи (функция вставлена в html, тут вызова не будет)
// 	currentCondition(elem) {
// 		this.changeHeight(elem);
// 		if (elem.value.length > 0 && elem.value.length <= 1000) {
// 			this.addToLong(elem);
// 			this.btnColor(elem);
// 			this.symbolCounter(elem);
// 		} else if (elem.value.length > 1000) {
// 			this.addToLong(elem);
// 			this.btnColor();
// 			this.symbolCounter(elem);
// 		} else {
// 			this.addToLong(elem);
// 			this.btnColor();
// 			this.symbolCounter();
// 		}
// 	}
// 	//Изменение высоты (сделать приватным)
// 	changeHeight(el) {
// 		el.style.height = '62px';
// 		el.style.height = `${el.scrollHeight}px`;
// 	}
// 	// Цвет кнопки (сделать приватным)
// 	btnColor(el) {
// 		if (el) {
// 			document.querySelector('.comments__insert-send').style =
// 				'color: #000000; background-color: #ABD873';
// 		} else {
// 			document.querySelector('.comments__insert-send').style =
// 				'color: #00000060; background-color: #A1A1A1';
// 		}
// 	}
// 	// Счетчик символов (сделать приватным)
// 	symbolCounter(el) {
// 		if (el) {
// 			document.querySelector(
// 				'.comments__insert-span2'
// 			).innerHTML = `${el.value.length}/1000`;
// 		} else {
// 			document.querySelector('.comments__insert-span2').innerHTML =
// 				'Макс. 1000 символов';
// 		}
// 	}
// 	// Добавить/убрать 'Слишком длинное сообщение' (сделать приватным)
// 	addToLong(el) {
// 		document.querySelector('.comments__insert-additional').innerHTML = '';
// 		if (el.value.length > 1000) {
// 			document.querySelector('.comments__insert-additional').style =
// 				'margin-bottom: 19px';
// 			document
// 				.querySelector('.comments__insert-additional')
// 				.insertAdjacentText('beforeend', 'Слишком длинное сообщение');
// 			document.querySelector('.comments__insert-span2').style =
// 				'color: #FF0000';
// 		} else {
// 			document.querySelector('.comments__insert-additional').style =
// 				'margin-bottom: 33px';
// 			document.querySelector('.comments__insert-span2').style =
// 				'color: #00000060';
// 		}
// 	}
// 	// Обновление счетчика и сохранение в локал сторейдж
// 	saveToLocal() {
// 		this.updateCounter();
// 		if (
// 			document.querySelector('#comment').value.trim() &&
// 			typeof document.querySelector('#comment').value === 'string' &&
// 			document.querySelector('#comment').value.length <= 1000
// 		) {
// 			this.counter++;
// 			localStorage.setItem(
// 				`com${this.counter}`,
// 				document.querySelector('#comment').value.trim()
// 			);
// 		}
// 	}
// 	// Обновление счетчика (сделать приватным)
// 	updateCounter() {
// 		if (
// 			this.counter === 0 &&
// 			Number(localStorage.getItem('commentsAmount')) !== 0
// 		) {
// 			this.counter = Number(localStorage.commentsAmount);
// 		}
// 		localStorage.setItem('commentsAmount', this.counter + 1);
// 	}
// 	// Обновление кол-ва комментариев
// 	updateComAmount() {
// 		if (Number(localStorage.getItem('commentsAmount')) !== 0) {
// 			document.querySelector(
// 				'.comments__amount'
// 			).innerHTML = `(${localStorage.getItem('commentsAmount')})`;
// 		} else {
// 			document.querySelector(
// 				'.comments__amount'
// 			).innerHTML = `(${this.counter})`;
// 		}
// 	}
// }
// //-----------------------------------------------------------------------------------------------------------------------------------
// class Comment {
// 	// Создание комментария из локал сторейдж (новые комментарии сверху)
// 	publishCom() {
// 		document
// 			.querySelector('.comments__insert')
// 			.insertAdjacentHTML(
// 				'afterend',
// 				`<div class="comment__created">${localStorage.getItem(
// 					`com${localStorage.getItem('commentsAmount')}`
// 				)}</div>`
// 			);
// 	}
// 	// Добавление комментов при перезагрузке/изначально
// 	updateCom() {
// 		if (Number(localStorage.getItem('commentsAmount')) > 0) {
// 			const commentsAmount = Number(localStorage.getItem('commentsAmount'));
// 			for (let i = 1; i <= commentsAmount; i++) {
// 				document
// 					.querySelector('.comments__insert')
// 					.insertAdjacentHTML(
// 						'afterend',
// 						`<div class="comment__created">${localStorage.getItem(
// 							`com${i}`
// 						)}</div>`
// 					);
// 			}
// 		}
// 	}
// }

// const tArea = new TArea();
// const comment = new Comment();

// // Обновление комментариев и их количества
// tArea.updateComAmount();
// comment.updateCom();
// // Отправка комментария
// document
// 	.querySelector('.comments__insert-send')
// 	.addEventListener('click', function () {
// 		if (
// 			document.querySelector('#comment').value.length > 0 &&
// 			document.querySelector('#comment').value.length <= 1000
// 		) {
// 			tArea.saveToLocal();
// 			tArea.updateComAmount();
// 			document.querySelector('#comment').value = '';
// 			document.querySelector('#comment').style.height = '62px';
// 			document.querySelector('.comments__insert-send').style =
// 				'color: #00000060; background-color: #A1A1A1';
// 			document.querySelector('.comments__insert-span2').innerHTML =
// 				'Макс. 1000 символов';
// 			comment.publishCom();
// 		}
// 	});
