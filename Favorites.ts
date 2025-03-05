export class Favorites {
	// Добавить / убрать из избранного
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
	// Показать только избранные
	public showOnlyFavs(): void {
		const favs: string = localStorage.getItem('favs');
		const allComs: NodeListOf<Element> =
			document.querySelectorAll('.comment__created');
		const allResps: NodeListOf<Element> =
			document.querySelectorAll('.response__created');
		const comAttr: string[] = [];
		const respAttr: string[] = [];
		const comOnlyFavs: string[] = [];
		const respOnlyFavs: string[] = [];

		if (favs) {
			favs.split(' ').forEach((el: string): void => {
				allComs.forEach((com: Element): void => {
					let num = com.getAttribute('num');
					if (`num="${num}"` === el) {
						comOnlyFavs.push(num);
					}
				});
				allResps.forEach((com: Element): void => {
					let respnum = com.getAttribute('respnum');
					if (`respnum="${respnum}"` === el) {
						respOnlyFavs.push(respnum);
					}
				});
			});
			allComs.forEach((com: Element): void => {
				comAttr.push(com.getAttribute('num'));
			});
			allResps.forEach((com: Element): void => {
				respAttr.push(com.getAttribute('respnum'));
			});

			const comsDelete = comAttr.filter(
				(e: string): boolean => !comOnlyFavs.includes(e)
			);
			const respDelete = respAttr.filter(
				(e: string): boolean => !respOnlyFavs.includes(e)
			);

			comsDelete.forEach((el: string) => {
				document.querySelector<HTMLDivElement>(`[num="${el}"]`).remove();
			});
			respDelete.forEach((el: string) => {
				document.querySelector<HTMLDivElement>(`[respnum="${el}"]`).remove();
			});
		} else {
			allComs.forEach((com: Element): void => {
				com.remove();
			});
			allResps.forEach((com: Element): void => {
				com.remove();
			});
		}
	}
	// Убрать избранные
	public backToComs(): void {
		const allComs: NodeListOf<Element> =
			document.querySelectorAll('.comment__created');
		const allResps: NodeListOf<Element> =
			document.querySelectorAll('.response__created');
		allComs.forEach((el: Element): void => {
			el.remove();
		});
		allResps.forEach((el: Element): void => {
			el.remove();
		});
	}
}
