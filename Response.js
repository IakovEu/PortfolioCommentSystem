//(Чтобы не дублировать много строчек кода, я вызываю эти функции в классе Comment)
export class Response {
    respCounter = 0;
    // Изменение кнопки отправки, перемещение к ней и событие на каждую кнопку ответа (нажали, написали в обычное поле ввода и ответили)
    renameBtn(ind) {
        const response = document.querySelector('.response');
        // const area: HTMLTextAreaElement = document.querySelector('#comment');
        response.addEventListener('click', () => {
            let who = localStorage.getItem(`name${ind}`);
            document.querySelector('.comments__insert-send').innerHTML = `Ответить ${who}`;
            document
                .querySelector('.comments__top-btns')
                .scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    }
    // Создание ответа на комментарий
    publishResponse(ind, top, bot) {
        const comForResponse = document.querySelector(`.cN${ind}`);
        const area = document.querySelector('#comment');
        const textBlock = `<div class="publishCom__txt">${area.value.trim()}</div>`;
        const del = bot.slice(40, 220);
        const delBtn = bot.replace(del, '');
        comForResponse.insertAdjacentHTML('afterend', `<div class="response__created rN${'задать потом'}">${top}${textBlock}${delBtn}</div>`);
    }
    respToLocal() { }
}
