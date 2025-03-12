export class TArea {
	//Изменение высоты
	public changeHeight(el: HTMLTextAreaElement): void {
		el.style.height = '62px';
		el.style.height = `${el.scrollHeight}px`;
	}
	// Цвет кнопки
	public btnColor(el?: HTMLTextAreaElement): void {
		const btn: HTMLButtonElement = document.querySelector('#send')!;
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
		)!;
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
		)!;
		additional.innerHTML = '';
		if (el.value.length > 1000) {
			additional.insertAdjacentText('beforeend', 'Слишком длинное сообщение');
			symbols.style.color = '#FF0000';
		} else {
			symbols.style.color = '#00000060';
		}
	}
	// Создание массива для всей инфы
	public createDataArr(): void {
		const comments: string = localStorage.getItem('comments');
		const favorites: string = localStorage.getItem('favorites');
		if (comments === null) {
			localStorage.setItem('comments', JSON.stringify([]));
		} else if (favorites === null) {
			localStorage.setItem('favorites', JSON.stringify([]));
		}
	}
	// Добавление информации о комментах в локал сторейдж
	public saveToLocal(): void {
		const btnSend: HTMLButtonElement = document.querySelector('#send')!;
		const area: HTMLTextAreaElement = document.querySelector('#comment');

		if (
			area.value.trim() &&
			typeof area.value === 'string' &&
			area.value.length <= 1000
		) {
			if (btnSend.textContent === 'Отправить') {
				type x = {
					name: string;
					src: string;
					txt: string;
					date: string;
					rating: number;
					ratingToCompare: number;
					answers: unknown[];
				};
				const com: x = {
					name: localStorage.getItem('currentUserName'),
					src: localStorage.getItem('currentUserSrc'),
					txt: area.value.trim(),
					date: '',
					rating: 0,
					ratingToCompare: 0,
					answers: [],
				};

				const allComs: object[] = JSON.parse(localStorage.getItem('comments'));
				allComs.push(com);

				localStorage.setItem('comments', JSON.stringify(allComs));
			}
		}
	}
	// Обновление кол-ва комментариев
	updateComAmount() {
		const comments: any[] = JSON.parse(localStorage.getItem('comments'));
		const btn: HTMLButtonElement = document.querySelector('#send')!;
		if (btn.textContent === 'Отправить' && comments.length !== 0) {
			const amount = document.querySelector('.comments__amount');
			amount.innerHTML = `(${comments.length})`;
		}
	}
	// Текущий человек
	public CurrentPerson(): void {
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
