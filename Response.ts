//(Чтобы не дублировать много строчек кода, я вызываю эти функции в классе Comment)
export class Response {
	respCounter: number = 0;
	// Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
	public renameBtn(ind: number): void {
		const response: HTMLButtonElement = document.querySelector('.response');
		// const area: HTMLTextAreaElement = document.querySelector('#comment');
		response.addEventListener('click', () => {
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
	// Создание ответа на комментарий
	public publishResponse(ind: number, top: string, bot: string): void {
		const comForResponse: HTMLDivElement = document.querySelector(`.cN${ind}`);
		const area: HTMLTextAreaElement = document.querySelector('#comment');
		const textBlock: string = `<div class="publishCom__txt">${area.value.trim()}</div>`;
		const del = bot.slice(40, 220);
		const delBtn = bot.replace(del, '');
		comForResponse.insertAdjacentHTML(
			'afterend',
			`<div class="response__created rN${'задать потом'}">${top}${textBlock}${delBtn}</div>`
		);
	}
	respToLocal() {}
}
