export class Response {
	// Я вызываю эти функции в классе Comment
	// Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
	public renameBtn(ind: number): void {
		const afterClick: HTMLDivElement = document.querySelector(
			'.comments__top-btns'
		)!;
		const response: HTMLButtonElement | null =
			document.querySelector('.response');

		if (response !== null) {
			response.addEventListener('click', () => {
				const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
				const btnSend: HTMLButtonElement = document.querySelector('#send')!;
				const comClicked: number =
					+response.parentElement!.parentElement!.parentElement!.getAttribute(
						'num'
					)!;

				btnSend.innerHTML = `Ответить ${comments[ind].name}`;

				afterClick.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});

				localStorage.setItem('comClicked', `${comClicked}`);
			});
		}
	}
	// Создание ответа на комментарий
	public publishResponse(bot: string): void {
		const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
		const area: HTMLTextAreaElement = document.querySelector('#comment')!;
		const userSrc: string | null = localStorage.getItem('currentUserSrc');
		const userName: string | null = localStorage.getItem('currentUserName');
		const currentDate: string = localStorage.getItem('currentDate')!;
		const comClicked: number = +localStorage.getItem('comClicked')!;
		const who: string = comments[comClicked].name;
		const comForResponse: HTMLDivElement = document.querySelector(
			`[num="${comClicked}"]`
		)!;

		comments.forEach((el, ind) => {
			type y = {
				name: string | null;
				src: string | null;
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
										<p class="pp${comClicked}-${pp}">0</p>
										<button class="publishCom__plus resp-plus">+</button>
									</div>`;
		const changeBot: string = bot.slice(400, 610);
		const delBtn: string = bot.replace(bot.slice(40, 220), '');
		const finalBot = delBtn.replace(changeBot, changeEstimateDiv);

		comForResponse.insertAdjacentHTML(
			'afterend',
			`<div class="response__created" respNum="${comClicked}-${pp}">${top}${textBlock}${finalBot}</div>`
		);

		this.changeRespRating('resp-plus', comClicked, pp, 'rgb(138, 197, 64)');
		this.changeRespRating('resp-minus', comClicked, pp, 'rgb(255, 0, 0)');
	}
	// Добавление ответов при перезагрузке
	public updateResp(ind: number, bot: string): void {
		const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
		const del: string = bot.slice(40, 225);
		const delBtn = bot.replace(del, '');
		const changeBot: string = bot.slice(410, 620);
		const comForResponse: HTMLDivElement = document.querySelector(
			`[num="${ind}"]`
		)!;
		const who = comments[ind].name;
		const responses: any[] = comments[ind].answers;

		if (responses.length !== 0) {
			responses.forEach((el, i) => {
				const respDate: string = el.date;
				const userSrc = el.src;
				const txt: string = el.txt;
				const respName = el.name;
				const getRating = el.rating;

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
												<p class="pp${ind}-${i}">${getRating}</p>
												<button class="publishCom__plus resp-plus">+</button>
											</div>`;
				const finalBot = delBtn.replace(changeBot, changeEstimateDiv);

				comForResponse.insertAdjacentHTML(
					'afterend',
					`<div class="response__created" respnum="${ind}-${i}">${top}${textBlock}${finalBot}</div>`
				);

				const pp = document.querySelector<HTMLParagraphElement>(
					`.pp${ind}-${i}`
				)!;
				if (getRating < 0) {
					pp.style.color = 'rgb(255, 0, 0)';
					const minusWithoutMinus: number = +pp.textContent! * -1;
					pp.innerHTML = `${minusWithoutMinus}`;
				} else {
					pp.style.color = 'rgb(138, 197, 64)';
				}

				this.changeRespRating('resp-plus', ind, i, 'rgb(138, 197, 64)');
				this.changeRespRating('resp-minus', ind, i, 'rgb(255, 0, 0)');
			});
		}
	}
	// Изменение рейтинга комментариев (отрицательный-красный, положительный-зеленый);
	private changeRespRating(
		btn: string,
		ind: number,
		i: number,
		clr: string
	): void {
		const action: HTMLButtonElement = document.querySelector(`.${btn}`)!;

		action.addEventListener('click', (): void => {
			const comments: any[] = JSON.parse(localStorage.getItem('comments')!);
			const answers: any[] = comments[ind].answers;
			const pNum: HTMLParagraphElement = document.querySelector(
				`.pp${ind}-${i}`
			)!;

			let currentRating: number = +pNum.textContent!;
			const initialR: number = answers[i].ratingToCompare;
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
					answers[i].rating = +pNum.textContent! * -1;
				} else {
					answers[i].rating = +pNum.textContent!;
				}
				localStorage.setItem('comments', JSON.stringify(comments));
			}
		});
	}
}
