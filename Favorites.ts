export class Favorites {
	// Добавить / уборать из избранного
	public addRemoveMark(): void {
		const favs: NodeListOf<Element> = document.querySelectorAll('#favs');
		favs.forEach((el: Element): void => {
			el.addEventListener('click', (): void => {
				const num: string =
					el.parentElement.parentElement.parentElement.getAttribute('num');
				const respNum: string =
					el.parentElement.parentElement.parentElement.getAttribute('respnum');
				let favorites: string = localStorage.getItem('favs');
				let result: string = '';
				num ? (result = `num="${num}"`) : (result = `respnum="${respNum}"`);

				if (el.childNodes[1].textContent === 'В избранное') {
					el.innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
					favorites
						? localStorage.setItem(`favs`, `${favorites} ${result}`)
						: localStorage.setItem(`favs`, `${result}`);
				} else {
					el.innerHTML = `<img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p>`;
					let newFavs: string = favorites
						.split(' ')
						.filter((el) => {
							if (el != result) {
								return el;
							}
						})
						.join(' ');
					localStorage.setItem('favs', newFavs);
				}
			});
		});
	}
	// Избранные при обновлении
	public updateFavs(): void {
		const favs: string = localStorage.getItem('favs');
		if (favs) {
			favs.split(' ').forEach((el: string): void => {
				let parentBlock: HTMLDivElement = document.querySelector(`[${el}]`);
				parentBlock.querySelector(
					'#favs'
				).innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
			});
		}
	}
}
