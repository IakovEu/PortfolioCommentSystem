import { TArea } from "./TArea.js";
import { Comment } from "./Comment.js";
//-----------------------------------------------------------------------------------------------------------------------------------

const tArea = new TArea();
const comment = new Comment();
// Обновление комментариев и их количества
tArea.updateComAmount();
comment.updateCom();
// Ввод комментария
document
	.querySelector('#comment')
	.addEventListener(
		'input',
		tArea.currentCondition(document.querySelector('#comment'))
	);
// Отправка комментария
document
	.querySelector('.comments__insert-send')
	.addEventListener('click', function () {
		if (
			document.querySelector('#comment').value.length > 0 &&
			document.querySelector('#comment').value.length <= 1000
		) {
			tArea.saveToLocal();
			tArea.updateComAmount();
			document.querySelector('#comment').value = '';
			document.querySelector('#comment').style.height = '62px';
			document.querySelector('.comments__insert-send').style =
				'color: #00000060; background-color: #A1A1A1';
			document.querySelector('.comments__insert-span2').innerHTML =
				'Макс. 1000 символов';
			comment.publishCom();
		}
	});
