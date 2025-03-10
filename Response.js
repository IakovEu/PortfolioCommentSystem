// Чтобы не дублировать много строчек кода, я вызываю эти функции в классе Comment
// Функция которая задает время вызывается позже чем эта, поэтому пришлось немного дублировать
// Toп дублировал тк новые вводные, через slice или splice слишком много менять
export class Response {
    // Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
    renameBtn(ind) {
        const response = document.querySelector('.response');
        response.addEventListener('click', () => {
            const comments = JSON.parse(localStorage.getItem('comments'));
            const btnSend = document.querySelector('#send');
            const comClicked = +response.parentElement.parentElement.parentElement.getAttribute('num');
            btnSend.innerHTML = `Ответить ${comments[ind].name}`;
            document
                .querySelector('.comments__top-btns')
                .scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            localStorage.setItem('comClicked', `${comClicked}`);
        });
    }
    // Создание ответа на комментарий
    publishResponse(bot) {
        const comments = JSON.parse(localStorage.getItem('comments'));
        const area = document.querySelector('#comment');
        const userSrc = localStorage.getItem('currentUserSrc');
        const userName = localStorage.getItem('currentUserName');
        const currentDate = localStorage.getItem('currentDate');
        const comClicked = +localStorage.getItem('comClicked');
        const who = comments[comClicked].name;
        const comForResponse = document.querySelector(`[num="${comClicked}"]`);
        comments.forEach((el, ind) => {
            const resp = {
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
        const textBlock = `<div class="publishCom__txt">${area.value.trim()}</div>`;
        const changeEstimateDiv = `<div class="publishCom__bottom-estimate">
										<button class="publishCom__minus resp-minus">-</button>
										<p class="pp${0}">0</p>
										<button class="publishCom__plus resp-plus">+</button>
									</div>`;
        const changeBot = bot.slice(400, 610);
        const delBtn = bot.replace(bot.slice(40, 220), '');
        const finalBot = delBtn.replace(changeBot, changeEstimateDiv);
        comForResponse.insertAdjacentHTML('afterend', `<div class="response__created" respNum="${0}">${top}${textBlock}${finalBot}</div>`);
        // this.changeRespRating('resp-plus', this.respCounter, 'rgb(138, 197, 64)');
        // this.changeRespRating('resp-minus', this.respCounter, 'rgb(255, 0, 0)');
    }
    // Добавление ответов при перезагрузке
    updateResp(ind, bot) {
        const comments = JSON.parse(localStorage.getItem('comments'));
        const del = bot.slice(40, 225);
        const delBtn = bot.replace(del, '');
        const changeBot = bot.slice(410, 620);
        const comForResponse = document.querySelector(`[num="${ind}"]`);
        const responses = comments[ind].answers;
        if (responses.length !== 0) {
            responses.forEach((el) => {
                const respDate = el.date;
                const userSrc = el.src;
                const txt = el.txt;
                const respName = el.name;
                const who = comments[ind].name;
                const getRating = 0;
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
                const textBlock = `<div class="publishCom__txt">${txt}</div>`;
                const changeEstimateDiv = `<div class="publishCom__bottom-estimate">
												<button class="publishCom__minus resp-minus">-</button>
												<p class="pp${el}">${getRating}</p>
												<button class="publishCom__plus resp-plus">+</button>
											</div>`;
                const finalBot = delBtn.replace(changeBot, changeEstimateDiv);
                comForResponse.insertAdjacentHTML('afterend', `<div class="response__created" respNum="${el}">${top}${textBlock}${finalBot}</div>`);
                // if (getRating < 0 && document.querySelector(`.pp${el}`)) {
                // 	document.querySelector<HTMLParagraphElement>(`.pp${el}`).style.color =
                // 		'rgb(255, 0, 0)';
                // 	const minusWithoutMinus: number =
                // 		+document.querySelector(`.pp${el}`).textContent * -1;
                // 	document.querySelector(`.pp${el}`).innerHTML = `${minusWithoutMinus}`;
                // } else if (document.querySelector(`.pp${el}`)) {
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
    changeRespRating(btn, ind, clr) {
        document
            .querySelector(`.${btn}`)
            .addEventListener('click', () => {
            const pNum = document.querySelector(`.pp${ind}`);
            const currentRating = +pNum.textContent;
            const cR = +localStorage.getItem(`initialRespRating${ind}`);
            if (cR == currentRating || cR == currentRating * -1) {
                if (window.getComputedStyle(pNum).color === clr ||
                    currentRating == 0) {
                    pNum.style.color = `${clr}`;
                    pNum.innerHTML = `${currentRating + 1}`;
                }
                else {
                    pNum.innerHTML = `${currentRating - 1}`;
                }
                if (window.getComputedStyle(pNum).color === 'rgb(255, 0, 0)') {
                    const setRating = +pNum.textContent; // Она тут не случайно, с currentRating не работает
                    localStorage.setItem(`respRating${ind}`, `${setRating * -1}`);
                }
                else {
                    localStorage.setItem(`respRating${ind}`, pNum.textContent);
                }
            }
        });
    }
}
