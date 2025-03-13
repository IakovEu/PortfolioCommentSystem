import { Response } from './Response.js';
// Строки с тэгами не выношу в конфиг, чтобы все видеть и не путаться!
export class Comment {
	response = new Response();
	parentBlock: HTMLDivElement = document.querySelector('.comments__insert')!;

	// Создание комментария / ответа (новые сверху)
	public publishCom(): void {
		const btnSend: HTMLButtonElement = document.querySelector('#send')!;
		const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
		const cA: number = comments.length - 1;
		const userSrc: string | null = localStorage.getItem('currentUserSrc');
		const userName: string | null = localStorage.getItem('currentUserName');
		const userDate: string = comments[cA].date;
		const txt: string = comments[cA].txt;

		const top: string = `<div class="publishCom__top">
                                <div class="comments__insert-photo">
                                    <img src="${userSrc}" alt="*">
                                    <span class="comments__insert-span1">${userName}</span>
                                </div>
                                <span class="publishCom__span">${userDate}</span>
                            </div>`;

		const textBlock: string = `<div class="publishCom__txt">${txt}</div>`;

		const bottomBtns: string = `<div class="publishCom__bottom">
										<div class="publishCom__bottom-response">
											<button class="response"><img src="ImgForCommentSystem/response-arrow.svg" alt="*"><p>Ответить</p></button>
										</div>
										<div class="publishCom__bottom-favorites">
											<button id="favs"><img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p></button>
										</div>
										<div class="publishCom__bottom-estimate">
											<button class="publishCom__minus">-</button>
											<p class="p${cA}">0</p>
											<button class="publishCom__plus">+</button>
										</div>
									</div>`;

		if (btnSend.textContent === 'Отправить') {
			this.parentBlock.insertAdjacentHTML(
				'afterend',
				`<div class="comment__created" num="${cA}">${top}${textBlock}${bottomBtns}</div>`
			);
			this.changeRating('publishCom__plus', cA, 'rgb(138, 197, 64)');
			this.changeRating('publishCom__minus', cA, 'rgb(255, 0, 0)');
		} else {
			this.response.publishResponse(bottomBtns);
		}
		this.response.renameBtn(cA);
	}
	// Добавление комментов при перезагрузке
	public updateCom(): void {
		const btnSend: HTMLButtonElement = document.querySelector('#send')!;
		const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
		const cA: number = comments.length;

		if (cA > 0) {
			for (let i: number = 0; i <= cA - 1; i++) {
				const getRating: number = comments[i].rating;
				const userName: string = comments[i].name;
				const userSrc: string = comments[i].src;
				const userDate: string = comments[i].date;
				const txt: string = comments[i].txt;
				const top: string = `<div class="publishCom__top">
									<div class="comments__insert-photo">
										<img src="${userSrc}" alt="*">
										<span class="comments__insert-span1">${userName}</span>
									</div>
									<span class="publishCom__span">${userDate}</span>
								</div>`;

				const textBlock: string = `<div class="publishCom__txt">${txt}</div>`;

				const bottomBtns: string = `<div class="publishCom__bottom">
											<div class="publishCom__bottom-response">
												<button class="response"><img src="ImgForCommentSystem/response-arrow.svg" alt="*"><p>Ответить</p></button>
											</div>
											<div class="publishCom__bottom-favorites">
												<button id="favs"><img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p></button>
											</div>
											<div class="publishCom__bottom-estimate">
												<button class="publishCom__minus">-</button>
												<p class="p${i}">${getRating}</p>
											<button class="publishCom__plus">+</button>
											</div>
										</div>`;

				this.parentBlock.insertAdjacentHTML(
					'afterend',
					`<div class="comment__created" num="${i}">${top}${textBlock}${bottomBtns}</div>`
				);

				if (getRating < 0) {
					const p: HTMLParagraphElement | null = document.querySelector(
						`.p${i}`
					);
					if (p !== null) {
						p.style.color = 'rgb(255, 0, 0)';
						const x: number = +p.textContent!;
						const minusWithoutMinus: number = x * -1;
						p.innerHTML = `${minusWithoutMinus}`;
					}
				} else {
					const p: HTMLParagraphElement | null = document.querySelector(
						`.p${i}`
					);
					if (p !== null) {
						p.style.color = 'rgb(138, 197, 64)';
					}
				}
				this.changeRating('publishCom__plus', i, 'rgb(138, 197, 64)');
				this.changeRating('publishCom__minus', i, 'rgb(255, 0, 0)');
				this.response.renameBtn(i);
				btnSend.innerHTML = 'Отправить';
				this.response.updateResp(i, bottomBtns);
			}
		}
	}
	// Установка изначального рейтинга для сравнения
	public setInitialRating(): void {
		const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
		if (comments.length > 0) {
			for (let i = 0; i <= comments.length - 1; i++) {
				comments[i].ratingToCompare = comments[i].rating;
				const answ: any[] = comments[i].answers;
				if (answ.length > 0) {
					for (let y = 0; y <= answ.length - 1; y++) {
						answ[y].ratingToCompare = answ[y].rating;
					}
				}
			}
		}
		localStorage.setItem('comments', JSON.stringify(comments));
	}
	// Изменение рейтинга (отрицательный-красный, положительный-зеленый);
	private changeRating(btn: string, ind: number, clr: string): void {
		const button: HTMLButtonElement = document.querySelector(`.${btn}`)!;

		button.addEventListener('click', (): void => {
			const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
			const pNum: HTMLParagraphElement = document.querySelector(`.p${ind}`)!;
			let currentRating: number = +pNum.textContent!;
			const initialR: number = comments[ind].ratingToCompare;

			if (initialR == currentRating || initialR === currentRating * -1) {
				if (
					window.getComputedStyle(pNum).color === clr ||
					currentRating === 0
				) {
					pNum.style.color = `${clr}`;
					pNum.innerHTML = `${currentRating + 1}`;
				} else {
					pNum.innerHTML = `${currentRating - 1}`;
				}

				if (window.getComputedStyle(pNum).color === 'rgb(255, 0, 0)') {
					comments[ind].rating = +pNum.textContent! * -1;
				} else {
					comments[ind].rating = +pNum.textContent!;
				}
				localStorage.setItem('comments', JSON.stringify(comments));
			}
		});
	}
	// Получение текущих даты и времени
	public getDate(): void {
		type z = {
			[key: string]: string;
		};
		const months: z = {
			Jan: '01',
			Feb: '02',
			Mar: '03',
			Apr: '04',
			May: '05',
			Jun: '06',
			Jul: '07',
			Aug: '08',
			Sep: '09',
			Oct: '10',
			Nov: '11',
			Dec: '12',
		};

		const date = `${new Date()}`.split(' ');
		const currentDate = `${months[date[1]]}.${date[2]} ${date[4].slice(0, 5)}`;
		const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
		const cA: number = comments.length - 1;
		const btnSend: HTMLButtonElement = document.querySelector('#send')!;

		if (btnSend.textContent == 'Отправить') {
			comments[cA].date = currentDate;
			localStorage.setItem('comments', JSON.stringify(comments));
		} else {
			localStorage.setItem('currentDate', currentDate);
		}
	}
}
