import { TArea } from './TArea.js';
import { Comment } from './Comment.js';

const tArea = new TArea();
const comment = new Comment();

const area: HTMLTextAreaElement = document.querySelector('#comment');
const btnSend: HTMLButtonElement = document.querySelector(
	'.comments__insert-send'
);

// Обновление комментариев их количества и автора
tArea.CurrentPerson();
tArea.updateComAmount();
comment.updateCom();

// // Регулировка высоты, цвет кнопки, счетчик символов и добавление надписи
area.addEventListener('input', function () {
	tArea.changeHeight(area);
	if (area.value.length > 0 && area.value.length <= 1000) {
		tArea.addToLong(area);
		tArea.btnColor(area);
		tArea.symbolCounter(area);
	} else if (area.value.length > 1000) {
		tArea.addToLong(area);
		tArea.btnColor();
		tArea.symbolCounter(area);
	} else {
		tArea.addToLong(area);
		tArea.btnColor();
		tArea.symbolCounter();
	}
});

// Отправка комментария
btnSend.addEventListener('click', function (): void {
	if (area.value.length > 0 && area.value.length <= 1000) {
		tArea.saveToLocal();
		tArea.updateComAmount();
		area.value = '';
		area.style.height = '62px';
		btnSend.style.color = ' #00000060';
		btnSend.style.backgroundColor = '#A1A1A1';
		document.querySelector<HTMLSpanElement>(
			'.comments__insert-span2'
		).innerHTML = 'Макс. 1000 символов';
		comment.publishCom();
		comment.getDate();
	}
});
