import { TArea } from './TArea.js';
import { Comment } from './Comment.js';

const tArea = new TArea();
const comment = new Comment();
const area = document.querySelector('#comment');

// Обновление комментариев и их количества
tArea.updateComAmount();
comment.updateCom();

// // Регулировка высоты, цвет кнопки, счетчик символов и добавление надписи
document.querySelector('#comment').addEventListener('input', function () {
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
document
	.querySelector('.comments__insert-send')
	.addEventListener('click', function () {
		if (area.value.length > 0 && area.value.length <= 1000) {
			tArea.saveToLocal();
			tArea.updateComAmount();
			area.value = '';
			area.style.height = '62px';
			document.querySelector('.comments__insert-send').style =
				'color: #00000060; background-color: #A1A1A1';
			document.querySelector('.comments__insert-span2').innerHTML =
				'Макс. 1000 символов';
			comment.publishCom();
		}
	});
