// Чтобы не дублировать много строчек кода, я вызываю эти функции в классе Comment
// Функция которая задает время вызывается позже чем эта, поэтому пришлось немного дублировать
// Toп дублировал тк новые вводные, через slice или splice слишком много менять 
export class Response {
    respCounter = 0;
    // Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
    renameBtn(ind) {
        const response = document.querySelector('.response');
        response.addEventListener('click', () => {
            const comClicked = +response.parentElement.parentElement.parentElement.getAttribute('num');
            let who = localStorage.getItem(`name${ind}`);
            document.querySelector('.comments__insert-send').innerHTML = `Ответить ${who}`;
            document
                .querySelector('.comments__top-btns')
                .scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            localStorage.setItem('comClicked', `${comClicked}`);
            // На каждый комментарий в LS записываются номера ответов на него (не жмите ответить просто так, это идет в LS)
            +localStorage.getItem('respAmount') != 0
                ? (this.respCounter = +localStorage.getItem('respAmount'))
                : this.respCounter;
            this.respCounter++;
            localStorage.setItem('respAmount', `${this.respCounter}`);
            localStorage.setItem(`respSrc${this.respCounter}`, `${localStorage.getItem('currentUserSrc')}`);
            let respNum = localStorage.getItem('respAmount');
            let respIn = localStorage.getItem(`respIn${comClicked}Com`);
            +respIn != 0
                ? localStorage.setItem(`respIn${comClicked}Com`, `${respIn} ${respNum}`)
                : localStorage.setItem(`respIn${comClicked}Com`, `${respNum}`);
        });
    }
    // Создание ответа на комментарий
    publishResponse(bot) {
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
        const num = localStorage.getItem('comClicked');
        const comForResponse = document.querySelector(`[num="${num}"]`);
        const area = document.querySelector('#comment');
        const textBlock = `<div class="publishCom__txt">${area.value.trim()}</div>`;
        const del = bot.slice(40, 220);
        const delBtn = bot.replace(del, '');
        const userSrc = localStorage.getItem('currentUserSrc');
        const who = localStorage.getItem(`name${num}`);
        const respName = localStorage.getItem('currentUserName');
        localStorage.setItem(`respName${this.respCounter}`, respName);
        const top = `<div class="publishCom__top">
						<div class="comments__insert-photo">
							<img src="${userSrc}" alt="*">
							<span class="comments__insert-span1">${respName}</span>
						</div>
						<div class="publishCom__answered">
							<img src="ImgForCommentSystem/response-arrow.svg" alt="*">
							<p>${who}</p>
						</div>
						<span class="publishCom__span">${currentDate}</span>
					</div>`;
        comForResponse.insertAdjacentHTML('afterend', `<div class="response__created">${top}${textBlock}${delBtn}</div>`);
        localStorage.setItem(`resp${this.respCounter}`, `${area.value.trim()}`);
    }
    // Добавление ответов при перезагрузке
    updateResp(ind, bot) {
        const comForResponse = document.querySelector(`[num="${ind}"]`);
        const del = bot.slice(40, 225);
        const delBtn = bot.replace(del, '');
        const respInCom = localStorage.getItem(`respIn${ind}Com`);
        if (+respInCom != 0) {
            respInCom.split(' ').forEach((el) => {
                let respDate = localStorage.getItem(`respDate${el}`);
                let userSrc = localStorage.getItem(`respSrc${el}`);
                let resp = localStorage.getItem(`resp${el}`);
                let textBlock = `<div class="publishCom__txt">${resp}</div>`;
                let respName = localStorage.getItem(`respName${el}`);
                let who = localStorage.getItem(`name${ind}`);
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
                if (resp != null) {
                    comForResponse.insertAdjacentHTML('afterend', `<div class="response__created">${top}${textBlock}${delBtn}</div>`);
                }
            });
        }
    }
}
