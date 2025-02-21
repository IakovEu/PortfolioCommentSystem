export class TArea {
	//Изменение высоты
	changeHeight(el) {
		el.style.height = '62px';
		el.style.height = `${el.scrollHeight}px`;
	}
	// Цвет кнопки 
	btnColor(el = 0) {
		if (el) {
			document.querySelector('.comments__insert-send').style =
				'color: #000000; background-color: #ABD873';
		} else {
			document.querySelector('.comments__insert-send').style =
				'color: #00000060; background-color: #A1A1A1';
		}
	}
	// Счетчик символов 
	symbolCounter(el = 0) {
		if (el) {
			document.querySelector(
				'.comments__insert-span2'
			).innerHTML = `${el.value.length}/1000`;
		} else {
			document.querySelector('.comments__insert-span2').innerHTML =
				'Макс. 1000 символов';
		}
	}
	// Добавить/убрать 'Слишком длинное сообщение' 
	addToLong(el = 0) {
		document.querySelector('.comments__insert-additional').innerHTML = '';
		if (el.value.length > 1000) {
			document
				.querySelector('.comments__insert-additional')
				.insertAdjacentText('beforeend', 'Слишком длинное сообщение');
			document.querySelector('.comments__insert-span2').style =
				'color: #FF0000';
		} else {
			document.querySelector('.comments__insert-span2').style =
				'color: #00000060';
		}
	}
	// Я захотел сделать счетчик для комментов в самом локал сторейдж, вместо localStorage.length, чтобы потом вычислить,
	// сколько комментов, а сколько ответов на них, тк они все храняться в одном месте
	counter = 0;
	// Обновление счетчика и сохранение в локал сторейдж
	saveToLocal() {
		this.updateCounter();
		if (
			document.querySelector('#comment').value.trim() &&
			typeof document.querySelector('#comment').value === 'string' &&
			document.querySelector('#comment').value.length <= 1000
		) {
			this.counter++;
			localStorage.setItem(
				`com${this.counter}`,
				document.querySelector('#comment').value.trim()
			);
		}
	}
	// Обновление счетчика (сделать приватным)
	updateCounter() {
		if (
			this.counter === 0 &&
			Number(localStorage.getItem('commentsAmount')) !== 0
		) {
			this.counter = Number(localStorage.commentsAmount);
		}
		localStorage.setItem('commentsAmount', this.counter + 1);
	}
	// Обновление кол-ва комментариев
	updateComAmount() {
		if (Number(localStorage.getItem('commentsAmount')) !== 0) {
			document.querySelector(
				'.comments__amount'
			).innerHTML = `(${localStorage.getItem('commentsAmount')})`;
		} else {
			document.querySelector(
				'.comments__amount'
			).innerHTML = `(${this.counter})`;
		}
	}
}
