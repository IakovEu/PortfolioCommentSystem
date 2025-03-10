export class Response {
	// Я вызываю эти функции в классе Comment
	// Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
	public renameBtn(ind: number): void {
		const response: HTMLButtonElement = document.querySelector('.response');

		response.addEventListener('click', () => {
			const comments: any[] = JSON.parse(localStorage.getItem('comments'));
			const btnSend: HTMLButtonElement = document.querySelector('#send');
			const comClicked: number =
				+response.parentElement.parentElement.parentElement.getAttribute('num');

			btnSend.innerHTML = `Ответить ${comments[ind].name}`;

			document
				.querySelector<HTMLDivElement>('.comments__top-btns')
				.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});

			localStorage.setItem('comClicked', `${comClicked}`);
		});
	}
	// Создание ответа на комментарий
	public publishResponse(bot: string): void {
		const comments: any[] = JSON.parse(localStorage.getItem('comments'));
		const area: HTMLTextAreaElement = document.querySelector('#comment');
		const userSrc: string = localStorage.getItem('currentUserSrc');
		const userName: string = localStorage.getItem('currentUserName');
		const currentDate: string = localStorage.getItem('currentDate');
		const comClicked: number = +localStorage.getItem('comClicked');
		const who: string = comments[comClicked].name;
		const comForResponse: HTMLDivElement = document.querySelector(
			`[num="${comClicked}"]`
		);

		comments.forEach((el, ind) => {
			type y = {
				name: string;
				src: string;
				txt: string;
				date: string;
				rating: number;
				ratingToCompare: number;
			};
			const resp: y = {
				name: userName,
				src: userSrc,
				txt: area.value.trim(),
				date: currentDate,
				rating: 0,
				ratingToCompare: 0,
			};

			if (ind === comClicked) {
				el.answers.push(resp);
				localStorage.setItem('comments', JSON.stringify(comments));
			}
		});

		const top = `<div class="publishCom__top">
						<div class="comments__insert-photo">
							<img src="${userSrc}" alt="*">
							<span class="comments__insert-span1">${userName}</span>
						</div>
						<div class="publishCom__answered">
							<img src="ImgForCommentSystem/response-arrow.svg" alt="*">
							<p>${who}</p>
						</div>
						<span class="publishCom__span">${currentDate}</span>
					</div>`;

		const textBlock: string = `<div class="publishCom__txt">${area.value.trim()}</div>`;

		const pp: number = comments[comClicked].answers.length - 1;
		const changeEstimateDiv = `<div class="publishCom__bottom-estimate">
										<button class="publishCom__minus resp-minus">-</button>
										<p class="pp${pp}">0</p>
										<button class="publishCom__plus resp-plus">+</button>
									</div>`;
		const changeBot: string = bot.slice(400, 610);
		const delBtn: string = bot.replace(bot.slice(40, 220), '');
		const finalBot = delBtn.replace(changeBot, changeEstimateDiv);

		comForResponse.insertAdjacentHTML(
			'afterend',
			`<div class="response__created" respNum="${0}">${top}${textBlock}${finalBot}</div>`
		);

		// this.changeRespRating('resp-plus', this.respCounter, 'rgb(138, 197, 64)');
		// this.changeRespRating('resp-minus', this.respCounter, 'rgb(255, 0, 0)');
	}
	// Добавление ответов при перезагрузке
	public updateResp(ind: number, bot: string): void {
		const comments: any[] = JSON.parse(localStorage.getItem('comments'));
		const del: string = bot.slice(40, 225);
		const delBtn = bot.replace(del, '');
		const changeBot: string = bot.slice(410, 620);
		const comForResponse: HTMLDivElement = document.querySelector(
			`[num="${ind}"]`
		);
		const responses: any[] = comments[ind].answers;

		if (responses.length !== 0) {
			responses.forEach((el): void => {
				const respDate: string = el.date;
				const userSrc = el.src;
				const txt: string = el.txt;
				const respName = el.name;
				const who = comments[ind].name;
				const getRating = comments[ind].rating;

				const top = `<div class="publishCom__top">
									<div class="comments__insert-photo">
										<img src="${userSrc}" alt="*">
										<span class="comments__insert-span1">${respName}</span>
										<div class="publishCom__answered">
											<img src="ImgForCommentSystem/response-arrow.svg" alt="*">
											<p>${who}</p>
										</div>
									</div>
									<span class="publishCom__span">${respDate}</span>
								</div>`;

				const textBlock: string = `<div class="publishCom__txt">${txt}</div>`;

				const changeEstimateDiv = `<div class="publishCom__bottom-estimate">
												<button class="publishCom__minus resp-minus">-</button>
												<p class="pp${0}">${getRating}</p>
												<button class="publishCom__plus resp-plus">+</button>
											</div>`;
				const finalBot = delBtn.replace(changeBot, changeEstimateDiv);

				comForResponse.insertAdjacentHTML(
					'afterend',
					`<div class="response__created" respNum="${el}">${top}${textBlock}${finalBot}</div>`
				);

				// if (getRating < 0 ) {
				// 	document.querySelector<HTMLParagraphElement>(`.pp${el}`).style.color =
				// 		'rgb(255, 0, 0)';
				// 	const minusWithoutMinus: number =
				// 		+document.querySelector(`.pp${el}`).textContent * -1;
				// 	document.querySelector(`.pp${el}`).innerHTML = `${minusWithoutMinus}`;
				// } else {
				// 	document.querySelector<HTMLParagraphElement>(`.pp${el}`).style.color =
				// 		'rgb(138, 197, 64)';
				// }
				// localStorage.setItem(`initialRespRating${el}`, `${getRating}`);
				// this.changeRespRating('resp-plus', +el, 'rgb(138, 197, 64)');
				// this.changeRespRating('resp-minus', +el, 'rgb(255, 0, 0)');
			});
		}
	}
	// Изменение рейтинга комментариев (отрицательный-красный, положительный-зеленый);
	private changeRespRating(btn: string, ind: number, clr: string): void {
		document
			.querySelector<HTMLButtonElement>(`.${btn}`)
			.addEventListener('click', () => {
				const pNum: HTMLParagraphElement = document.querySelector(`.pp${ind}`);
				const currentRating: number = +pNum.textContent;
				const cR: number = +localStorage.getItem(`initialRespRating${ind}`);

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
						localStorage.setItem(`respRating${ind}`, `${setRating * -1}`);
					} else {
						localStorage.setItem(`respRating${ind}`, pNum.textContent);
					}
				}
			});
	}
}
