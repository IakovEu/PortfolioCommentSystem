export class Comment {
	top = `<div class="publishCom__top">
                    <div class="comments__insert-photo">
                    	<img src="ImgForCommentSystem/profileExample.jpg" alt="*">
                    	<span class="comments__insert-span1">Взять из API</span>
                	</div>
                	<span class="publishCom__span">Дата из API 01.01.01</span>
			</div>`;
	bottomBtns = `<div class="publishCom__bottom">
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
	publishCom() {
		const txt = localStorage.getItem(
			`com${localStorage.getItem('commentsAmount')}`
		);
		const textBlock = `<div class="publishCom__txt">${txt}</div>`;
		document
			.querySelector('.comments__insert')
			.insertAdjacentHTML(
				'afterend',
				`<div class="comment__created">${this.top}${textBlock}${this.bottomBtns}</div>`
			);
	}
	// Добавление комментов при перезагрузке/изначально
	updateCom() {
		if (Number(localStorage.getItem('commentsAmount')) > 0) {
			const commentsAmount = Number(localStorage.getItem('commentsAmount'));
			for (let i = 1; i <= commentsAmount; i++) {
				const txt = localStorage.getItem(`com${i}`);
				const textBlock = `<div class="publishCom__txt">${txt}</div>`;
				document
					.querySelector('.comments__insert')
					.insertAdjacentHTML(
						'afterend',
						`<div class="comment__created">${this.top}${textBlock}${this.bottomBtns}</div>`
					);
			}
		}
	}
}