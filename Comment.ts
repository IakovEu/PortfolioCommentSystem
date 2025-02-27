import { Response } from './Response.js';

export class Comment {
	response = new Response();
	parentBlock: HTMLDivElement = document.querySelector('.comments__insert');
	// Создание комментария из локал сторейдж (новые комментарии сверху)
	public publishCom(): void {
		const bottomBtns: string = `<div class="publishCom__bottom">
                                        <div class="publishCom__bottom-response">
                                            <button class="response"><img src="ImgForCommentSystem/response-arrow.svg" alt="*"><p>Ответить</p></button>
                                        </div>
                                        <div class="publishCom__bottom-favorites">
                                            <button><img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p></button>
                                        </div>
                                        <div class="publishCom__bottom-estimate">
                                            <button class="publishCom__minus">-</button>
                                            <p class="p${localStorage.getItem(
																							'commentsAmount'
																						)}">0</p>
                                            <button class="publishCom__plus">+</button>
                                        </div>
                                    </div>`;
		const txt: string = localStorage.getItem(
			`com${localStorage.getItem('commentsAmount')}`
		);
		// currentRating я использую для сравнения с тем, который будет изменяться
		localStorage.setItem(
			`currentRating${localStorage.getItem('commentsAmount')}`,
			'0'
		);
		const textBlock: string = `<div class="publishCom__txt">${txt}</div>`;
		const top: string = `<div class="publishCom__top">
                                <div class="comments__insert-photo">
                                    <img src="${localStorage.getItem(
																			'currentUserSrc'
																		)}" alt="*">
                                    <span class="comments__insert-span1">${localStorage.getItem(
																			'currentUserName'
																		)}</span>
                                </div>
                                <span class="publishCom__span">Дата и время прогружаются...</span>
                            </div>`;
		this.parentBlock.insertAdjacentHTML(
			'afterend',
			`<div class="comment__created">${top}${textBlock}${bottomBtns}</div>`
		);
		this.changeRating(
			'publishCom__plus',
			+localStorage.getItem('commentsAmount'),
			'rgb(138, 197, 64)'
		);
		this.changeRating(
			'publishCom__minus',
			+localStorage.getItem('commentsAmount'),
			'rgb(255, 0, 0)'
		);
		this.response.answer(+localStorage.getItem('commentsAmount'));
	}
	// Добавление комментов при перезагрузке/изначально
	public updateCom(): void {
		if (Number(localStorage.getItem('commentsAmount')) > 0) {
			const commentsAmount: number = Number(
				localStorage.getItem('commentsAmount')
			);

			for (let i: number = 1; i <= commentsAmount; i++) {
				let getRating = +localStorage.getItem(`rating${i}`);
				// currentRating я использую для сравнения с тем, который будет изменяться
				localStorage.setItem(`currentRating${i}`, `${getRating}`);
				getRating == null ? (getRating = 0) : getRating;
				const bottomBtns: string = `<div class="publishCom__bottom">
                                                <div class="publishCom__bottom-response">
                                                    <button class="response"><img src="ImgForCommentSystem/response-arrow.svg" alt="*"><p>Ответить</p></button>
                                                </div>
                                                <div class="publishCom__bottom-favorites">
                                                    <button><img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p></button>
                                                </div>
                                                <div class="publishCom__bottom-estimate">
                                                    <button class="publishCom__minus">-</button>
                                                    <p class="p${i}">${getRating}</p>
                                                <button class="publishCom__plus">+</button>
                                                </div>
                                            </div>`;
				const txt: string = localStorage.getItem(`com${i}`);
				const textBlock: string = `<div class="publishCom__txt">${txt}</div>`;
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
				this.parentBlock.insertAdjacentHTML(
					'afterend',
					`<div class="comment__created">${top}${textBlock}${bottomBtns}</div>`
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
				this.response.answer(i);
			}
		}
	}
	//Изменение рейтинга;
	private changeRating(btn: string, ind: number, clr: string): void {
		document
			.querySelector<HTMLButtonElement>(`.${btn}`)
			.addEventListener('click', () => {
				let cR: number = +localStorage.getItem(`currentRating${ind}`);
				const currentRating: number = Number(
					document.querySelector(`.p${ind}`).textContent
				);
				if (cR == currentRating || cR == currentRating * -1) {
					if (
						window.getComputedStyle(document.querySelector(`.p${ind}`))
							.color === clr ||
						currentRating == 0
					) {
						document.querySelector<HTMLParagraphElement>(
							`.p${ind}`
						).style.color = `${clr}`;
						document.querySelector<HTMLParagraphElement>(
							`.p${ind}`
						).innerHTML = `${currentRating + 1}`;
					} else {
						document.querySelector<HTMLParagraphElement>(
							`.p${ind}`
						).innerHTML = `${currentRating - 1}`;
					}
					if (
						window.getComputedStyle(document.querySelector(`.p${ind}`))
							.color === 'rgb(255, 0, 0)'
					) {
						const setRating: number = +document.querySelector(`.p${ind}`)
							.textContent; // Она тут не случайно, с currentRating не работает
						localStorage.setItem(`rating${ind}`, `${setRating * -1}`);
					} else {
						localStorage.setItem(
							`rating${ind}`,
							document.querySelector(`.p${ind}`).textContent
						);
					}
				}
			});
	}
	// Дата и время для отправки комментария (хотелось побольше повзаимодействовать с API, поэтому не через timeStamp)
	// Дата и время текущие, поэтому с другого api, но нужно обязательно подождать, пока они прогрузятсяи не писать новый, чтобы оба сохранились!
	getDate(): void {
		fetch(
			'https://timeapi.io/api/timezone/coordinate?latitude=55.44&longitude=37.36'
		)
			.then((response): Promise<any> => {
				return response.json();
			})
			.then((result): void => {
				const currentDate: string = `${result.currentLocalTime
					.split('-')[2]
					.slice(0, 2)}.${
					result.currentLocalTime.split('-')[1]
				} ${result.currentLocalTime.split('T')[1].slice(0, 5)}`;
				document.querySelector<HTMLSpanElement>('.publishCom__span').innerHTML =
					currentDate;
				localStorage.setItem(
					`date${localStorage.getItem('commentsAmount')}`,
					currentDate
				);
			});
	}
}
