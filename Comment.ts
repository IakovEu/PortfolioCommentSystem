import { Response } from './Response.js';
// Строки с тэгами не выношу в конфиг, чтобы все видеть и не путаться!
export class Comment {
	response = new Response();
	parentBlock: HTMLDivElement = document.querySelector('.comments__insert');
	// Создание комментария / ответа (новые сверху)
	public publishCom(): void {
		let cA: number = +localStorage.getItem('commentsAmount');
		let cUserS: string = localStorage.getItem('currentUserSrc');
		let cUserN: string = localStorage.getItem('currentUserName');
		const btnSend: HTMLButtonElement = document.querySelector('#send');

		const top: string = `<div class="publishCom__top">
                                <div class="comments__insert-photo">
                                    <img src="${cUserS}" alt="*">
                                    <span class="comments__insert-span1">${cUserN}</span>
                                </div>
                                <span class="publishCom__span">Дата и время прогружаются...</span>
                            </div>`;

		const txt: string = localStorage.getItem(`com${cA}`);
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
			// currentRating я использую для сравнения с тем, который будет изменяться
			localStorage.setItem(`currentRating${cA}`, '0');
			this.parentBlock.insertAdjacentHTML(
				'afterend',
				`<div class="comment__created" num="${cA}">${top}${textBlock}${bottomBtns}</div>`
			);
			this.changeRating('publishCom__plus', cA, 'rgb(138, 197, 64)');
			this.changeRating('publishCom__minus', cA, 'rgb(255, 0, 0)');
			this.response.renameBtn(cA);
		} else {
			this.response.publishResponse(bottomBtns);
		}
	}
	// Добавление комментов при перезагрузке
	public updateCom(): void {
		if (Number(localStorage.getItem('commentsAmount')) > 0) {
			const cA: number = +localStorage.getItem('commentsAmount');
			const btnSend: HTMLButtonElement = document.querySelector('#send');

			for (let i: number = 1; i <= cA; i++) {
				let getRating = +localStorage.getItem(`rating${i}`);
				// currentRating я использую для сравнения с тем, который будет изменяться
				localStorage.setItem(`currentRating${i}`, `${getRating}`);
				getRating == null ? (getRating = 0) : getRating;

				const userName: string = localStorage.getItem(`name${i}`);
				const userSrc: string = localStorage.getItem(`src${i}`);
				const userDate: string = localStorage.getItem(`date${i}`);
				const top: string = `<div class="publishCom__top">
									<div class="comments__insert-photo">
										<img src="${userSrc}" alt="*">
										<span class="comments__insert-span1">${userName}</span>
									</div>
									<span class="publishCom__span">${userDate}</span>
								</div>`;

				const txt: string = localStorage.getItem(`com${i}`);
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
				if (getRating < 0 && document.querySelector(`.p${i}`)) {
					document.querySelector<HTMLParagraphElement>(`.p${i}`).style.color =
						'rgb(255, 0, 0)';
					const minusWithoutMinus: number =
						+document.querySelector(`.p${i}`).textContent * -1;
					document.querySelector(`.p${i}`).innerHTML = `${minusWithoutMinus}`;
				} else if (document.querySelector(`.p${i}`)) {
					document.querySelector<HTMLParagraphElement>(`.p${i}`).style.color =
						'rgb(138, 197, 64)';
				}
				this.changeRating('publishCom__plus', i, 'rgb(138, 197, 64)');
				this.changeRating('publishCom__minus', i, 'rgb(255, 0, 0)');
				this.response.renameBtn(i);
				btnSend.innerHTML = 'Отправить';
				this.response.updateResp(i, bottomBtns);
			}
		}
	}
	// Изменение рейтинга (отрицательный-красный, положительный-зеленый);
	private changeRating(btn: string, ind: number, clr: string): void {
		document
			.querySelector<HTMLButtonElement>(`.${btn}`)
			.addEventListener('click', (): void => {
				const pNum: HTMLParagraphElement = document.querySelector(`.p${ind}`);
				let currentRating: number = +pNum.textContent;
				const cR: number = +localStorage.getItem(`currentRating${ind}`);

				if (cR == currentRating || cR == currentRating * -1) {
					if (
						window.getComputedStyle(pNum).color === clr ||
						currentRating == 0
					) {
						pNum.style.color = `${clr}`;
						pNum.innerHTML = `${currentRating + 1}`;
					} else {
						pNum.innerHTML = `${currentRating - 1}`;
					}
					if (window.getComputedStyle(pNum).color === 'rgb(255, 0, 0)') {
						const setRating: number = +pNum.textContent; // Она тут не случайно, с currentRating не работает
						localStorage.setItem(`rating${ind}`, `${setRating * -1}`);
					} else {
						localStorage.setItem(`rating${ind}`, pNum.textContent);
					}
				}
			});
	}
	// Получение текущих даты и времени
	public getDate(): void {
		const months = {
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

		let date = `${new Date()}`.split(' ');
		let currentDate = `${months[date[1]]}.${date[2]} ${date[4].slice(0, 5)}`;
		document.querySelector<HTMLSpanElement>('.publishCom__span').innerHTML =
			currentDate;

		const cA: number = +localStorage.getItem('commentsAmount');
		const rA: number = +localStorage.getItem('respAmount');
		const btnSend: HTMLButtonElement = document.querySelector('#send');

		if (btnSend.textContent == 'Отправить') {
			localStorage.setItem(`date${cA}`, `${currentDate}`);
		} else {
			localStorage.setItem(`respDate${rA}`, `${currentDate}`);
		}
	}
}
