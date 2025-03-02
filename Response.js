// Чтобы не дублировать много строчек кода, я вызываю эти функции в классе Comment
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
    publishResponse(top, bot) {
        const num = localStorage.getItem('comClicked');
        const comForResponse = document.querySelector(`[num="${num}"]`);
        const area = document.querySelector('#comment');
        const textBlock = `<div class="publishCom__txt">${area.value.trim()}</div>`;
        const del = bot.slice(40, 220);
        const delBtn = bot.replace(del, '');
        comForResponse.insertAdjacentHTML('afterend', `<div class="response__created">${top}${textBlock}${delBtn}</div>`);
        localStorage.setItem(`resp${this.respCounter}`, `${area.value.trim()}`);
    }
    // Добавление ответов при перезагрузке
    updateResp(ind, top, bot) {
        const comForResponse = document.querySelector(`[num="${ind}"]`);
        const del = bot.slice(40, 225);
        const delBtn = bot.replace(del, '');
        const src = top.slice(80, 160);
        let respInCom = localStorage.getItem(`respIn${ind}Com`);
        if (+respInCom != 0) {
            respInCom.split(' ').forEach((el) => {
                let userSrc = localStorage.getItem(`respSrc${el}`);
                let changeSrc = top.replace(src, `<img src="${userSrc}" alt="*">`);
                let resp = localStorage.getItem(`resp${el}`);
                let textBlock = `<div class="publishCom__txt">${resp}</div>`;
                if (resp != null) {
                    comForResponse.insertAdjacentHTML('afterend', `<div class="response__created">${changeSrc}${textBlock}${delBtn}</div>`);
                }
            });
        }
    }
}
