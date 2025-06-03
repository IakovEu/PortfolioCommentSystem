export class Response {
    // Я вызываю эти функции в классе Comment
    // Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
    renameBtn(ind) {
        const afterClick = document.querySelector('.comments__top-btns');
        const response = document.querySelector('.response');
        if (response !== null) {
            response.addEventListener('click', () => {
                const comments = JSON.parse(localStorage.getItem('comments'));
                const btnSend = document.querySelector('#send');
                const comClicked = +response.parentElement.parentElement.parentElement.getAttribute('num');
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
        const pp = comments[comClicked].answers.length - 1;
        const changeEstimateDiv = `<div class="publishCom__bottom-estimate">
										<button class="publishCom__minus resp-minus">-</button>
										<p class="pp${comClicked}-${pp}">0</p>
										<button class="publishCom__plus resp-plus">+</button>
									</div>`;
        const changeBot = bot.slice(400, 610);
        const delBtn = bot.replace(bot.slice(40, 220), '');
        const finalBot = delBtn.replace(changeBot, changeEstimateDiv);
        comForResponse.insertAdjacentHTML('afterend', `<div class="response__created" respNum="${comClicked}-${pp}">${top}${textBlock}${finalBot}</div>`);
        this.changeRespRating('resp-plus', comClicked, pp, 'rgb(138, 197, 64)');
        this.changeRespRating('resp-minus', comClicked, pp, 'rgb(255, 0, 0)');
    }
    // Добавление ответов при перезагрузке
    updateResp(ind, bot) {
        const comments = JSON.parse(localStorage.getItem('comments'));
        const del = bot.slice(40, 225);
        const delBtn = bot.replace(del, '');
        const changeBot = bot.slice(410, 620);
        const comForResponse = document.querySelector(`[num="${ind}"]`);
        const who = comments[ind].name;
        const responses = comments[ind].answers;
        if (responses.length !== 0) {
            responses.forEach((el, i) => {
                const respDate = el.date;
                const userSrc = el.src;
                const txt = el.txt;
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
                const textBlock = `<div class="publishCom__txt">${txt}</div>`;
                const changeEstimateDiv = `<div class="publishCom__bottom-estimate">
												<button class="publishCom__minus resp-minus">-</button>
												<p class="pp${ind}-${i}">${getRating}</p>
												<button class="publishCom__plus resp-plus">+</button>
											</div>`;
                const finalBot = delBtn.replace(changeBot, changeEstimateDiv);
                comForResponse.insertAdjacentHTML('afterend', `<div class="response__created" respnum="${ind}-${i}">${top}${textBlock}${finalBot}</div>`);
                const pp = document.querySelector(`.pp${ind}-${i}`);
                if (getRating < 0) {
                    pp.style.color = 'rgb(255, 0, 0)';
                    const minusWithoutMinus = +pp.textContent * -1;
                    pp.innerHTML = `${minusWithoutMinus}`;
                }
                else {
                    pp.style.color = 'rgb(138, 197, 64)';
                }
                this.changeRespRating('resp-plus', ind, i, 'rgb(138, 197, 64)');
                this.changeRespRating('resp-minus', ind, i, 'rgb(255, 0, 0)');
            });
        }
    }
    // Изменение рейтинга комментариев (отрицательный-красный, положительный-зеленый);
    changeRespRating(btn, ind, i, clr) {
        const allResps = document.querySelectorAll('.response__created');
        allResps.forEach((elem) => {
            const respnum = elem.getAttribute('respnum');
            if (respnum === `${ind}-${i}`) {
                elem.querySelector(`.${btn}`).addEventListener('click', () => {
                    const comments = JSON.parse(localStorage.getItem('comments'));
                    const answers = comments[ind].answers;
                    const pNum = document.querySelector(`.pp${ind}-${i}`);
                    let currentRating = +pNum.textContent;
                    const initialR = answers[i].ratingToCompare;
                    if (initialR == currentRating || initialR === currentRating * -1) {
                        if (window.getComputedStyle(pNum).color === clr ||
                            currentRating === 0) {
                            pNum.style.color = `${clr}`;
                            pNum.innerHTML = `${currentRating + 1}`;
                        }
                        else {
                            pNum.innerHTML = `${currentRating - 1}`;
                        }
                        if (window.getComputedStyle(pNum).color === 'rgb(255, 0, 0)') {
                            answers[i].rating = +pNum.textContent * -1;
                        }
                        else {
                            answers[i].rating = +pNum.textContent;
                        }
                        localStorage.setItem('comments', JSON.stringify(comments));
                    }
                });
            }
        });
    }
}
