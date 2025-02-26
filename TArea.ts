export class TArea {
	//Изменение высоты
	public changeHeight(el: HTMLTextAreaElement): void {
		el.style.height = '62px';
		el.style.height = `${el.scrollHeight}px`;
	}
	// Цвет кнопки
	public btnColor(el?: HTMLTextAreaElement): void {
		const btn = document.querySelector<HTMLButtonElement>(
			'.comments__insert-send'
		);
		if (el) {
			btn.style.color = '#000000';
			btn.style.backgroundColor = '#ABD873';
		} else {
			btn.style.color = '#00000060; background-color: #A1A1A1';
			btn.style.backgroundColor = '#A1A1A1';
		}
	}
	// Счетчик символов
	public symbolCounter(el?: HTMLTextAreaElement): void {
		const symbols: HTMLSpanElement = document.querySelector(
			'.comments__insert-span2'
		);
		if (el) {
			symbols.innerHTML = `${el.value.length}/1000`;
		} else {
			symbols.innerHTML = 'Макс. 1000 символов';
		}
	}
	// Добавить/убрать 'Слишком длинное сообщение'
	public addToLong(el?: HTMLTextAreaElement): void {
		const additional: HTMLDivElement = document.querySelector(
			'.comments__insert-additional'
		);
		const symbols: HTMLSpanElement = document.querySelector(
			'.comments__insert-span2'
		);
		additional.innerHTML = '';
		if (el.value.length > 1000) {
			additional.insertAdjacentText('beforeend', 'Слишком длинное сообщение');
			symbols.style.color = '#FF0000';
		} else {
			symbols.style.color = '#00000060';
		}
	}
	// Для добавления информации о комментах в локал сторейдж
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
		const amount: HTMLSpanElement = document.querySelector('.comments__amount');
		if (Number(localStorage.getItem('commentsAmount')) !== 0) {
			amount.innerHTML = `(${localStorage.getItem('commentsAmount')})`;
		} else {
			amount.innerHTML = `(${this.counter})`;
		}
	}
	// Текущий человек
	CurrentPerson(): void {
		fetch('https://randomuser.me/api/')
			.then((response): Promise<any> => {
				return response.json();
			})
			.then((res): void => {
				const firstAndLast = `${res.results[0].name.first} ${res.results[0].name.last}`;
				const photo = document.querySelector<HTMLImageElement>('#currentPhoto');
				document.querySelector<HTMLSpanElement>('#currentUser').innerHTML =
					firstAndLast;
				photo.src = res.results[0].picture.thumbnail;
				photo.style.animation = 'none';
				photo.style.border = 'none';
				localStorage.setItem('currentUserName', firstAndLast);
				localStorage.setItem(
					'currentUserSrc',
					res.results[0].picture.thumbnail
				);
			});
	}
}
