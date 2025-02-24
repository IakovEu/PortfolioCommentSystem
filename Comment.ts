export class Comment {
	parentBlock: HTMLDivElement = document.querySelector('.comments__insert');
	bottomBtns: string = `<div class="publishCom__bottom">
						<div class="publishCom__bottom-response">
							<button><img src="ImgForCommentSystem/response-arrow.svg" alt="*"><p>Ответить</p></button>
						</div>
						<div class="publishCom__bottom-favorites">
							<button><img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p></button>
						</div>
						<div class="publishCom__bottom-estimate">
							<button>-</button>
							<p>0</p>
							<button>+</button>
						</div>
					</div>`;
	// Создание комментария из локал сторейдж (новые комментарии сверху)
	public publishCom(): void {
		const txt: string = localStorage.getItem(
			`com${localStorage.getItem('commentsAmount')}`
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
			`<div class="comment__created">${top}${textBlock}${this.bottomBtns}</div>`
		);
	}
	// Добавление комментов при перезагрузке/изначально
	public updateCom(): void {
		if (Number(localStorage.getItem('commentsAmount')) > 0) {
			const commentsAmount: number = Number(
				localStorage.getItem('commentsAmount')
			);
			for (let i = 1; i <= commentsAmount; i++) {
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
					`<div class="comment__created">${top}${textBlock}${this.bottomBtns}</div>`
				);
			}
		}
	}
	// Дата и время для отправки комментария (хотелось побольше повзаимодействовать с API, поэтому не через timeStamp)
    // Дата и время текущие, поэтому с другого api, но нужно обязательно подождать, пока они прогрузятсяи не писать новый, чтобы оба сохранились!
	getDate(): void {
		fetch(
			'https://timeapi.io/api/timezone/coordinate?latitude=55.44&longitude=37.36'
		)
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				const currentDate = `${result.currentLocalTime
					.split('-')[2]
					.slice(0, 2)}.${
					result.currentLocalTime.split('-')[1]
				} ${result.currentLocalTime.split('T')[1].slice(0, 5)}`;
				document.querySelector('.publishCom__span').innerHTML = currentDate;
				localStorage.setItem(
					`date${localStorage.getItem('commentsAmount')}`,
					currentDate
				);
			});
	}
}
