// class TArea {
// 	counter = 0;
// 	// Регулировка высоты, цвет кнопки, счетчик символов и добавление надписи (функция вставлена в html, тут вызова не будет)
// 	currentCondition(elem) {
// 		this.changeHeight(elem);
// 		if (elem.value.length > 0 && elem.value.length <= 1000) {
//             this.addToLong(elem);
// 			this.btnColor(elem);
// 			this.symbolCounter(elem);
// 		} else if (elem.value.length > 1000) {
// 			this.addToLong(elem);
// 			this.btnColor();
// 			this.symbolCounter(elem);
// 		} else {
//             this.addToLong(elem);
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
//                 document.querySelector('.comments__insert-span2').style =
// 				'color: #00000060';
// 		}
// 	}
// 	// Сохранение в локал сторейдж
// 	saveToLocal() { 
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
// }

// const tArea = new TArea();

// // Отправка комментария
// document
// 	.querySelector('.comments__insert-send')
// 	.addEventListener('click', function () {
// 		if (
// 			document.querySelector('#comment').value.length > 0 &&
// 			document.querySelector('#comment').value.length <= 1000
// 		) {
// 			tArea.saveToLocal();
// 			document.querySelector('#comment').value = '';
// 			document.querySelector('#comment').style.height = '62px';
// 			document.querySelector('.comments__insert-send').style =
// 				'color: #00000060; background-color: #A1A1A1';
// 			document.querySelector('.comments__insert-span2').innerHTML =
// 				'Макс. 1000 символов';
// 		}
// 	});
