export class Response {
	// Ответ на комментарий (нажали, написали в обычное поле ввода и ответили)
	answer(ind: number): void {
		document
			.querySelector<HTMLButtonElement>('.response')
			.addEventListener('click', () => {
				let who: string = localStorage.getItem(`name${ind}`);
				document.querySelector<HTMLButtonElement>(
					'.comments__insert-send'
				).innerHTML = `Ответить ${who}`;
				document
					.querySelector<HTMLDivElement>('.comments__top-btns')
					.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});
			});
	}
}
