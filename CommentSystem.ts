// counter = 0;
// // Авто регулировка высоты, цвет кнопки и счетчик символов (функция вставлена в html, тут вызова не будет)
// currentCondition(elem) {
//     elem.style.height = '62px';
//     elem.style.height = `${elem.scrollHeight}px`;
//     if (elem.value.length > 0 && elem.value.length < 1000) {
//         document.querySelector('.comments__insert-send').style =
//             'color: #000000; background-color: #ABD873';
//     } else {
//         document.querySelector('.comments__insert-send').style =
//             'color: #00000060; background-color: #A1A1A1';
//     }
// }
// // Сохранение в локал сторейдж
// saveToLocal() {
//     if (
//         document.querySelector('#comment').value.trim() &&
//         typeof document.querySelector('#comment').value === 'string' &&
//         document.querySelector('#comment').value.length < 1000
//     ) {
//         this.counter++;
//         localStorage.setItem(
//             `com${this.counter}`,
//             document.querySelector('#comment').value.trim()
//         );
//     }
// }
// }

// const tArea = new TArea();

// // Отправка комментария
// document
// .querySelector('.comments__insert-send')
// .addEventListener('click', function () {
//     tArea.saveToLocal();
//     document.querySelector('#comment').value = '';
//     document.querySelector('#comment').style.height = '62px';
//     document.querySelector('.comments__insert-send').style =
//         'color: #00000060; background-color: #A1A1A1';
// });

