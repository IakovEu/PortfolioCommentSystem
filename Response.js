export class Response {
    // Ответ на комментарий (нажали, написали в обычное поле ввода и ответили)
    answer(ind) {
        document
            .querySelector('.response')
            .addEventListener('click', () => {
            let who = localStorage.getItem(`name${ind}`);
            document.querySelector('.comments__insert-send').innerHTML = `Ответить ${who}`;
            document.querySelector('.comments__top-btns').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    }
}
