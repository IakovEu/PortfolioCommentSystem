export class TArea {
	//Изменение высоты
	public changeHeight(el: HTMLTextAreaElement): void {
		el.style.height = '62px';
		el.style.height = `${el.scrollHeight}px`;
	}
	// Цвет кнопки
	public btnColor(el?: HTMLTextAreaElement): void {
		if (el) {
			document.querySelector('.comments__insert-send').style =
				'color: #000000; background-color: #ABD873';
		} else {
			document.querySelector('.comments__insert-send').style =
				'color: #00000060; background-color: #A1A1A1';
		}
	}
	// Счетчик символов
	public symbolCounter(el?: HTMLTextAreaElement): void {
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
	public addToLong(el?: HTMLTextAreaElement): void {
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
	private counter: number = 0;
	// Обновление счетчика и сохранение в локал сторейдж
	public saveToLocal(): void {
		const area: HTMLTextAreaElement = document.querySelector('#comment');
		this.updateCounter();
		if (
			area.value.trim() &&
			typeof area.value === 'string' &&
			area.value.length <= 1000
		) {
			this.counter++;
			localStorage.setItem(`com${this.counter}`, area.value.trim());
			localStorage.setItem(
				`name${this.counter}`,
				localStorage.getItem('currentUserName')
			);
			localStorage.setItem(
				`src${this.counter}`,
				localStorage.getItem('currentUserSrc')
			);
		}
	}
	// Обновление счетчика (сделать приватным)
	private updateCounter(): void {
		if (
			this.counter === 0 &&
			Number(localStorage.getItem('commentsAmount')) !== 0
		) {
			this.counter = Number(localStorage.commentsAmount);
		}
		const counterToStr: string = `${this.counter + 1}`;
		localStorage.setItem('commentsAmount', counterToStr);
	}
	// Обновление кол-ва комментариев
	public updateComAmount(): void {
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
	// Текущий человек
	CurrentPerson(): void {
		fetch('https://randomuser.me/api/')
			.then((response): Promise<any>  => {
				return response.json();
			})
			.then((res): void => {
				const firstAndLast = `${res.results[0].name.first} ${res.results[0].name.last}`;
				document.querySelector<HTMLSpanElement>('#currentUser').innerHTML =
					firstAndLast;
				document.querySelector<HTMLImageElement>('#currentPhoto').src =
					res.results[0].picture.thumbnail;
				document.querySelector('#currentPhoto').style =
					'animation: none; border: none;';
				localStorage.setItem('currentUserName', firstAndLast);
				localStorage.setItem(
					'currentUserSrc',
					res.results[0].picture.thumbnail
				);
			});
	}
}
